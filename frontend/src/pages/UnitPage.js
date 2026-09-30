import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { publicApi } from "../services/api";
import UnitFeatures from "../components/unit/UnitFeatures";
import UnitResults from "../components/unit/UnitResults";
import UnitAdmissionForm from "../components/unit/UnitAdmissionForm";
import UnitGallery from "../components/unit/UnitGallery";
import UnitContact from "../components/unit/UnitContact";

const UnitPage = () => {
  const { unitId } = useParams();
  const [unitData, setUnitData] = useState(null);
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [unitResponse, dataResponse] = await Promise.all([
          publicApi.getUnit(unitId),
          publicApi.getAllData()
        ]);
        setUnitData(unitResponse.data);
        setContact(dataResponse.data.contact);
      } catch (error) {
        console.error("Error fetching unit data:", error);
        // If unit not found (404), set unitData to null to trigger redirect
        if (error.response?.status === 404) {
          console.warn(`Unit with unitId '${unitId}' not found. Redirecting to homepage...`);
          setUnitData(null);
        }
      } finally {
        setLoading(false);
      }
    };
    if (unitId) {
      fetchData();
    } else {
      setLoading(false);
      setUnitData(null);
    }
  }, [unitId]);

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  }

  if (!unitData) {
    return <Navigate to="/" />;
  }

  return (
    <div style={{ paddingTop: '80px' }}>
      <div style={{ textAlign: "center", padding: "2rem 0", background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "700", color: "#1e293b" }}>
          Welcome to <span className="gradient-text">{unitData.name}</span>
        </h1>
      </div>

      <UnitFeatures features={unitData.features || []} />
      <UnitResults results={unitData.results || []} />
      <UnitAdmissionForm unitName={unitData.name} contact={contact} />
      <UnitGallery gallery={unitData.gallery || []} />
      <UnitContact contact={unitData.contact} />
    </div>
  );
};

export default UnitPage;