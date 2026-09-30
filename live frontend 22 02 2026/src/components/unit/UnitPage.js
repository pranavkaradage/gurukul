import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { AppData } from "../data";
import PrincipalsDesk from "../components/unit/PrincipalsDesk";
import UnitFeatures from "../components/unit/UnitFeatures";
import UnitResults from "../components/unit/UnitResults";
import UnitAdmissionForm from "../components/unit/UnitAdmissionForm";
import UnitCirculars from "../components/unit/UnitCirculars";
import UnitGallery from "../components/unit/UnitGallery";
import UnitContact from "../components/unit/UnitContact";

const UnitPage = () => {
  const { unitId } = useParams();
  const unitData = AppData.units.find(unit => unit.id === unitId);

  // If the unitId from the URL is not found in our data, redirect to the homepage.
  if (!unitData) {
    return <Navigate to="/" />;
  }

  return (
    <div style={{ paddingTop: '80px' }}> {/* Add padding to avoid content hiding behind the fixed header */}
      <div style={{ textAlign: "center", padding: "2rem 0", background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)" }}>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: "700", color: "#1e293b", margin: 0 }}>
          Welcome to <span className="gradient-text">{unitData.name}</span>
        </h1>
      </div>

      <PrincipalsDesk principal={unitData.principal} />
      <UnitFeatures features={unitData.features} />
      <UnitResults results={unitData.results} />
      <UnitAdmissionForm unitName={unitData.name} contact={AppData.contact} />
      <UnitCirculars circulars={unitData.circulars} />
      <UnitGallery gallery={unitData.gallery} />
      <UnitContact contact={unitData.contact} />
    </div>
  );
};

export default UnitPage;