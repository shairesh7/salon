"use client";

import { useEffect, useState } from "react";
import "./WomensPortal.css";

export default function WomensPortal({ onClose }) {
  const [womenData, setWomenData] = useState([]);
  const [currentView, setCurrentView] = useState("LEVEL1");
  const [selectedLevel1, setSelectedLevel1] = useState(null);
  const [selectedLevel2, setSelectedLevel2] = useState(null);

  const [tab, setTab] = useState("Active");
  const [editingId, setEditingId] = useState(null);
  const [priceInput, setPriceInput] = useState("");

  useEffect(() => {
    fetchWomenCategories();
  }, []);

  const fetchWomenCategories = async () => {
    const res = await fetch(
      "https://newsameep-backend.go-kar.net/api/dummy-vendors/693658821e3f2e6ca0af3ac8/categories"
    );
    const json = await res.json();

    const womensStyling = json.categories.children.find(
      (c) => c.name === "Women's Styling"
    );

    setWomenData(womensStyling.children || []);
  };

  const toggleStatus = (service) => {
    const current = service.pricingStatus || "Active";
    const next = current === "Active" ? "Inactive" : "Active";

    const confirmChange = window.confirm(
      `Do you want to make this service ${next}?`
    );

    if (!confirmChange) return;

    service.pricingStatus = next;
    setWomenData([...womenData]);
  };

  const savePrice = (service) => {
    service.price = Number(priceInput);
    setEditingId(null);
  };

  return (
    <div className="women-overlay">
      <div className="women-card">

        {/* HEADER */}
        <div className="services-header">
          <span
            className="back-arrow"
            onClick={() => {
              if (currentView === "SERVICES") setCurrentView("LEVEL2");
              else if (currentView === "LEVEL2") setCurrentView("LEVEL1");
              else onClose();
            }}
          >
            ←
          </span>

          <div>
            <h2>
              {currentView === "LEVEL1" && "Women's Styling"}
              {currentView === "LEVEL2" && selectedLevel1?.name}
              {currentView === "SERVICES" && selectedLevel2?.name}
            </h2>

            <p className="section-path">
              {currentView === "LEVEL1" && "You are viewing: Category"}
              {currentView === "LEVEL2" &&
                `You are viewing: Women's Styling > ${selectedLevel1?.name}`}
              {currentView === "SERVICES" &&
                `You are viewing: Women's Styling > ${selectedLevel1?.name} > ${selectedLevel2?.name}`}
            </p>
          </div>
        </div>

        {/* LEVEL 1 */}
        {currentView === "LEVEL1" &&
          womenData.map((level1) => (
            <div
              key={level1.id}
              className="category-title"
              onClick={() => {
                setSelectedLevel1(level1);
                setCurrentView("LEVEL2");
              }}
            >
              {level1.name}
              <span>›</span>
            </div>
          ))}

        {/* LEVEL 2 */}
        {currentView === "LEVEL2" &&
          selectedLevel1.children.map((level2) => (
            <div
              key={level2.id}
              className="subcategory-title"
              onClick={() => {
                setSelectedLevel2(level2);
                setCurrentView("SERVICES");
              }}
            >
              {level2.name}
              <span>›</span>
            </div>
          ))}

        {/* SERVICES */}
        {currentView === "SERVICES" && (
          <>
            <div className="services-tabs">
              <button
                className={tab === "Active" ? "tab active" : "tab"}
                onClick={() => setTab("Active")}
              >
                Active
              </button>
              <button
                className={tab === "Inactive" ? "tab active" : "tab"}
                onClick={() => setTab("Inactive")}
              >
                Inactive
              </button>
            </div>

            <div className="services-list">

              {/* CASE 1: LEVEL 2 HAS CHILDREN */}
              {selectedLevel2.children.length > 0 &&
                selectedLevel2.children
                  .filter((s) => (s.pricingStatus || "Active") === tab)
                  .map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      tab={tab}
                      editingId={editingId}
                      setEditingId={setEditingId}
                      priceInput={priceInput}
                      setPriceInput={setPriceInput}
                      toggleStatus={toggleStatus}
                      savePrice={savePrice}
                    />
                  ))}

              {/* CASE 2: LEVEL 2 IS ITSELF A SERVICE */}
              {selectedLevel2.children.length === 0 &&
                (selectedLevel2.pricingStatus || "Active") === tab && (
                  <ServiceCard
                    service={selectedLevel2}
                    tab={tab}
                    editingId={editingId}
                    setEditingId={setEditingId}
                    priceInput={priceInput}
                    setPriceInput={setPriceInput}
                    toggleStatus={toggleStatus}
                    savePrice={savePrice}
                  />
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ================= SERVICE CARD ================= */

function ServiceCard({
  service,
  tab,
  editingId,
  setEditingId,
  priceInput,
  setPriceInput,
  toggleStatus,
  savePrice,
}) {
  const [options, setOptions] = useState([
    { id: 1, label: "Short Hair", selected: true },
    { id: 2, label: "Medium Hair", selected: false },
    { id: 3, label: "Long Hair", selected: true },
  ]);

  const isEditing = editingId === service.id;

  const toggleOption = (id) => {
    setOptions((prev) =>
      prev.map((opt) =>
        opt.id === id ? { ...opt, selected: !opt.selected } : opt
      )
    );
  };

  const updateLabel = (id, value) => {
    setOptions((prev) =>
      prev.map((opt) =>
        opt.id === id ? { ...opt, label: value } : opt
      )
    );
  };

  return (
    <div className="service-card">

      {/* TOP */}
      <div className="service-top">
        <img src={service.imageUrl} alt={service.name} />

        <div className="service-info">
          <h4>{service.name}</h4>
        </div>

        <div className="service-right">
          {isEditing ? (
            <>
              <input
                className="price-input"
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
              />
              <button className="save-btn" onClick={() => savePrice(service)}>
                Save
              </button>
            </>
          ) : (
            <>
              <span className="price">₹{service.price}</span>
              {tab === "Active" && (
                <span
                  className="edit"
                  onClick={() => {
                    setEditingId(service.id);
                    setPriceInput(service.price);
                  }}
                >
                  Edit
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {/* OPTIONS */}
      <div className="option-list">
        {options
          .filter((opt) => isEditing || opt.selected)
          .map((opt) => (
            <div key={opt.id} className="option-item">
              {isEditing ? (
                <>
                  <input
                    type="checkbox"
                    checked={opt.selected}
                    onChange={() => toggleOption(opt.id)}
                  />
                  <input
                    className="option-input"
                    value={opt.label}
                    onChange={(e) =>
                      updateLabel(opt.id, e.target.value)
                    }
                  />
                </>
              ) : (
                <span className="option-text">• {opt.label}</span>
              )}
            </div>
          ))}
      </div>

      {/* BOTTOM */}
      <div className="service-bottom">
        <span className="status-text">
          {tab === "Active"
            ? "Make this service inactive"
            : "Make this service active"}
        </span>

        <label className="switch">
          <input
            type="checkbox"
            checked={false}               // ALWAYS OFF
            onChange={() => toggleStatus(service)}
          />
          <span className="slider"></span>
        </label>
      </div>

    </div>
  );
}
