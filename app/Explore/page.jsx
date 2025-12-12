"use client";

import { useEffect, useState, useMemo } from "react";
import "./Explore.css";

const API_URL =
  "https://newsameep-backend.go-kar.net/api/dummy-vendors/691bed36531f54c7d983b43a/categories";

const inr = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

// --------------------------------------------------
// CHIP
// --------------------------------------------------
function Chip({ active, onClick, children }) {
  return (
    <button className={`chip ${active ? "active" : ""}`} onClick={onClick}>
      {children}
    </button>
  );
}
function ServiceCard({ data }) {
  const [selectedMain, setSelectedMain] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);

  // Auto-select cheapest on initial load
  useEffect(() => {
    setSelectedMain(data.defaultMain || null);
    setSelectedSub(data.defaultSub || null);
  }, [data.defaultMain, data.defaultSub]);

  // When MAIN option changes, auto-select cheapest SUB option
  useEffect(() => {
    if (!selectedMain) return;

    const main = data.options.find((o) => o.label === selectedMain);
    if (!main) return;

    if (main.subOptions?.length > 0) {
      // Find cheapest sub option
      const cheapestSub = main.subOptions.reduce((min, current) =>
        current.price < min.price ? current : min
      );

      setSelectedSub(cheapestSub.label);
    } else {
      setSelectedSub(null);
    }
  }, [selectedMain, data.options]);

  // Calculate total
  const total = useMemo(() => {
    let sum = 0;

    const main = data.options.find((o) => o.label === selectedMain);
    if (main) sum += main.price || 0;

    const sub = main?.subOptions?.find((s) => s.label === selectedSub);
    if (sub) sum += sub.price || 0;

    return sum || data.base;
  }, [data, selectedMain, selectedSub]);

  // Image handler
  const dynamicImg = (() => {
    const main = data.options.find((m) => m.label === selectedMain);

    if (selectedSub && main?.imageMap[selectedSub]) {
      return main.imageMap[selectedSub];
    }
    if (selectedMain && data.imageMap[selectedMain]) {
      return data.imageMap[selectedMain];
    }
    return data.img;
  })();

  return (
    <div className="ws-card">
      <h3 className="ws-title">{data.title}</h3>

      <div className="ws-media">
        <img src={dynamicImg} alt={data.title} />
      </div>

      <div className="ws-price">{inr(total)}</div>

      <div className="ws-subhead">Select Service</div>

      {/* MAIN OPTIONS */}
      <div className="ws-chips">
        {data.options.map((opt) => (
          <Chip
            key={opt.label}
            active={selectedMain === opt.label}
            onClick={() => {
              if (selectedMain === opt.label) {
                // remove selection on second click
                setSelectedMain(null);
                setSelectedSub(null);
              } else {
                setSelectedMain(opt.label);
              }
            }}
          >
            {opt.label}
          </Chip>
        ))}
      </div>

      {/* SUB OPTIONS */}
      {selectedMain &&
        data.options.find((o) => o.label === selectedMain)?.subOptions
          ?.length > 0 && (
          <div className="ws-subsection">
            <div className="ws-subhead small">Choose {selectedMain} Type</div>
            <div className="ws-chips">
              {data.options
                .find((o) => o.label === selectedMain)
                .subOptions.map((s) => (
                  <Chip
                    key={s.label}
                    active={selectedSub === s.label}
                    onClick={() =>
                      setSelectedSub(s.label === selectedSub ? null : s.label)
                    }
                  >
                    {s.label}
                  </Chip>
                ))}
            </div>
          </div>
        )}

      <div className="ws-actions">
        <button className="btn-primary">Enroll Now</button>
      </div>
    </div>
  );
}

// --------------------------------------------------
// API → UI Converter with min price detection
// --------------------------------------------------
function convertCategory(category) {
  if (!category?.children) return [];

  return category.children.map((subCat) => {
    const options = [];
    const imageMap = {};

    // track lowest price + option names
    let minObject = { label: null, subLabel: null, price: Infinity };

    const scanPrices = (service) => {
      // direct price
      if (service.price !== null && service.price !== undefined) {
        if (service.price < minObject.price) {
          minObject = {
            label: service.name.trim(),
            subLabel: null,
            price: service.price,
          };
        }
      }

      // children prices
      if (service.children?.length > 0) {
        service.children.forEach((child) => {
          if (child.price !== null && child.price !== undefined) {
            if (child.price < minObject.price) {
              minObject = {
                label: service.name.trim(),
                subLabel: child.name.trim(),
                price: child.price,
              };
            }
          }

          // deep scan
          if (child.children?.length > 0) {
            scanPrices(child);
          }
        });
      }
    };

    subCat.children?.forEach((service) => scanPrices(service));

    // Build UI options
    subCat.children?.forEach((service) => {
      if (service.children?.length > 0) {
        options.push({
          label: service.name.trim(),
          price: service.price || 0,
          imageMap: Object.fromEntries(
            service.children.map((x) => [x.name.trim(), x.imageUrl])
          ),
          subOptions: service.children.map((x) => ({
            label: x.name.trim(),
            price: x.price || 0,
          })),
        });

        imageMap[service.name.trim()] = service.imageUrl;
      } else {
        options.push({
          label: service.name.trim(),
          price: service.price || 0,
          imageMap: {},
          subOptions: [],
        });

        imageMap[service.name.trim()] = service.imageUrl;
      }
    });

    return {
      title: subCat.name,
      img: subCat.imageUrl,
      imageMap,
      options,

      base: minObject.price || 0,
      defaultMain: minObject.label,
      defaultSub: minObject.subLabel,
    };
  });
}

// --------------------------------------------------
// MAIN Explore Page
// --------------------------------------------------
export default function Page() {
  const [finalCategories, setFinalCategories] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(API_URL, { cache: "no-store" });
        const data = await res.json();

        const converted = data.categories.children.map((cat) => ({
          sectionName: cat.name,
          cards: convertCategory(cat),
        }));

        setFinalCategories(converted);
      } catch (e) {
        console.error("API Error:", e);
      }
    }

    load();
  }, []);

  return (
    <section className="women-styling">
      {finalCategories.map((section) => (
        <div key={section.sectionName}>
          <h2 className="ws-heading">{section.sectionName}</h2>
          <div className="ws-grid">
            {section.cards.map((c) => (
              <ServiceCard key={c.title} data={c} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
