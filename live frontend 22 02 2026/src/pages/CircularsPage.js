import React, { useEffect, useState } from "react";
import { publicApi } from "../services/api";
import Circulars from "../components/Circulars";
import MotionBackdrop from "../components/common/MotionBackdrop";

const CircularsPage = () => {
  const [circulars, setCirculars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const response = await publicApi.getAllData();
        if (mounted) {
          setCirculars(response.data.circulars || []);
        }
      } catch (error) {
        console.error("Error fetching circulars:", error);
        if (mounted) {
          setCirculars([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>
    );
  }

  return (
    <>
      <MotionBackdrop />
      <Circulars circulars={circulars || []} />
    </>
  );
};

export default CircularsPage;



