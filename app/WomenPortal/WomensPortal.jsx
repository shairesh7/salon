"use client";

import { useEffect, useState } from "react";
import "./WomensPortal.css";

/* ================= DEFAULT OPTIONS ================= */
const defaultOptions = () => ([
  { id: 1, label: "Short Hair", selected: true },
  { id: 2, label: "Medium Hair", selected: false },
  { id: 3, label: "Long Hair", selected: true },
]);

/* ================= MAIN ================= */
export default function WomensPortal({ onClose }) {
  const [womenData, setWomenData] = useState([]);
  const [currentView, setCurrentView] = useState("LEVEL1");
  const [selectedLevel1, setSelectedLevel1] = useState(null);
  const [selectedLevel2, setSelectedLevel2] = useState(null);
  const [tab, setTab] = useState("Active");

  // Edit Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [modalPrice, setModalPrice] = useState("");
  const [modalOptions, setModalOptions] = useState([]);

  // Activate Modal
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [pendingService, setPendingService] = useState(null);
  const [activationPrice, setActivationPrice] = useState("");

  useEffect(() => {
    fetchWomenCategories();
  }, []);

  /* ================= FETCH & NORMALIZE ================= */
  const fetchWomenCategories = async () => {
    const res = await fetch(
      "https://newsameep-backend.go-kar.net/api/dummy-vendors/693658821e3f2e6ca0af3ac8/categories"
    );
    const json = await res.json();

    const womensStyling = json.categories.children.find(
      (c) => c.name === "Women's Styling"
    );

    // 🔥 ENSURE EVERY SERVICE HAS OPTIONS
    const normalize = (items) =>
      items.map(item => ({
        ...item,
        options: item.options || defaultOptions(),
        children: item.children ? normalize(item.children) : [],
      }));

    setWomenData(normalize(womensStyling.children || []));
  };

  /* ================= TOGGLE STATUS ================= */
  const toggleStatus = (service) => {
    if (tab === "Inactive") {
      setPendingService(service);
      setActivationPrice(service.price || "");
      setModalOptions(service.options || defaultOptions());
      setShowActivateModal(true);
      return;
    }

    if (!window.confirm("Make this service inactive?")) return;

    service.pricingStatus = "Inactive";
    setWomenData([...womenData]);
  };

 const confirmActivateService = () => {
  pendingService.price = Number(activationPrice);

  // ✅ KEEP ALL OPTIONS
  pendingService.options = modalOptions;

  pendingService.pricingStatus = "Active";
  setWomenData([...womenData]);

  setShowActivateModal(false);
  setPendingService(null);
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

  <div className="header-text">
    <h2>
      {currentView === "LEVEL1" && "Women's Styling"}
      {currentView === "LEVEL2" && selectedLevel1?.name}
      {currentView === "SERVICES" && selectedLevel2?.name}
    </h2>

    {/* ✅ RESTORED BREADCRUMB */}
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
          womenData.map(l1 => (
            <div key={l1.id} className="category-title"
              onClick={() => {
                setSelectedLevel1(l1);
                setCurrentView("LEVEL2");
              }}>
              {l1.name}
            </div>
          ))}

        {/* LEVEL 2 */}
        {currentView === "LEVEL2" &&
          selectedLevel1.children.map(l2 => (
            <div key={l2.id} className="subcategory-title"
              onClick={() => {
                setSelectedLevel2(l2);
                setCurrentView("SERVICES");
              }}>
              {l2.name}
            </div>
          ))}

        {/* SERVICES */}
        {currentView === "SERVICES" && (
          <>
            <div className="services-tabs">
              <button className={tab === "Active" ? "tab active" : "tab"} onClick={() => setTab("Active")}>Active</button>
              <button className={tab === "Inactive" ? "tab active" : "tab"} onClick={() => setTab("Inactive")}>Inactive</button>
            </div>

            <div className="services-list">
              {(selectedLevel2.children.length ? selectedLevel2.children : [selectedLevel2])
                .filter(s => (s.pricingStatus || "Active") === tab)
                .map(service => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    tab={tab}
                    toggleStatus={toggleStatus}
                    onEdit={() => {
                      setEditingService(service);
                      setModalPrice(service.price || "");
                      setModalOptions(service.options || defaultOptions());
                      setShowEditModal(true);
                    }}
                  />
                ))}
            </div>
          </>
        )}
      </div>

      {/* EDIT MODAL */}
      {showEditModal && editingService && (
        <Modal title="Edit Service" onClose={() => setShowEditModal(false)}>
          <label>Price</label>
          <input className="price-input" value={modalPrice} onChange={e => setModalPrice(e.target.value)} />

          <ServiceOptionsEditor options={modalOptions} setOptions={setModalOptions} />

         <button
  className="btn-primary"
  onClick={() => {
    editingService.price = Number(modalPrice);

    // ✅ KEEP ALL OPTIONS
    editingService.options = modalOptions;

    setWomenData([...womenData]);
    setShowEditModal(false);
  }}
>
  Save
</button>

        </Modal>
      )}

      {/* ACTIVATE MODAL */}
     {showActivateModal && pendingService && (
  <Modal title="Activate Service" onClose={() => setShowActivateModal(false)}>

    {/* 🔲 INNER CARD */}
    <div className="activate-inner-card">

      <label className="modal-label">Price</label>
      <input
        className="price-input"
        value={activationPrice}
        onChange={e => setActivationPrice(e.target.value)}
      />

      <ServiceOptionsEditor
        options={modalOptions}
        setOptions={setModalOptions}
      />

    </div>

    <button
      className="btn-primary"
      onClick={confirmActivateService}
    >
      Activate
    </button>

  </Modal>
)}

    </div>
  );
}

/* ================= CARD ================= */
function ServiceCard({ service, tab, toggleStatus, onEdit }) {
  const status = service.pricingStatus || "Active";
  const isActive = status === "Active";

  return (
    <div className="service-card">
      <div className="service-top">
        <img src={service.imageUrl} alt={service.name} />
        <h4>{service.name}</h4>

        <div className="service-right">
          <span className="price">₹{service.price}</span>
          {isActive && <span className="edit" onClick={onEdit}>Edit</span>}
        </div>
      </div>

      {/* OPTIONS */}
      {service.options?.some(o => o.selected) && (
        <div className="option-list">
          {service.options
            .filter(o => o.selected)
            .map(o => (
              <span key={o.id} className="option-text">• {o.label}</span>
            ))}
        </div>
      )}

      {/* ✅ STATUS + BUTTON */}
      <div className="service-bottom">
        {/* STATUS BADGE */}
        <span className={`status-badge ${isActive ? "active" : "inactive"}`}>
          {isActive ? "Active" : "Inactive"}
        </span>

        {/* ACTION BUTTON */}
        <button
          className={`status-btn ${isActive ? "deactivate" : "activate"}`}
          onClick={() => toggleStatus(service)}
        >
          {isActive ? "Deactivate Service" : "Activate Service"}
        </button>
      </div>
    </div>
  );
}


/* ================= OPTIONS EDITOR ================= */
function ServiceOptionsEditor({ options, setOptions }) {
  return (
    <div className="option-list">
      {options.map(o => (
        <label key={o.id} className="option-item">
          <input
            type="checkbox"
            checked={o.selected}
            onChange={() =>
              setOptions(prev =>
                prev.map(x =>
                  x.id === o.id ? { ...x, selected: !x.selected } : x
                )
              )
            }
          />
          <span className="option-text">{o.label}</span>
        </label>
      ))}
    </div>
  );
}

/* ================= MODAL ================= */
function Modal({ title, children, onClose }) {
  return (
    <div className="activate-overlay">
      <div className="activate-modal">
        <h3>{title}</h3>
        {children}
        <button className="btn-secondary" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
