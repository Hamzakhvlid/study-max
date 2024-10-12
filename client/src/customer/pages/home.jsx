import React, { useEffect, useState } from "react";
import HeroSection from "../sections/HeroSection";

import QualitySection from "../sections/QualitySection";
import OurGoal from "../sections/OurGoal";
import FeatureProducts from "../sections/FeatureProducts";
import { BasicTable } from "../imports";

import ProductCategories from "../sections/ProductCategories";
import ServicesSection from "../sections/ServicesSection";
import CoorporationPartners from "../sections/CoorporationPartners";
import WelcomeScreen from "./WelcomeScreen";
import { useSelector } from "react-redux";

const Home = () => {
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const user = useSelector((state) => state.Singleuser);

  useEffect(() => {
    if (user.data !== null) {
      const firstLogin = localStorage.getItem("firstLogin");

      if (!firstLogin) {
        setIsFirstLogin(true); // Show welcome screen
        localStorage.setItem("firstLogin", "true"); // Mark as not first login anymore
      }
    }
  }, []);
  return (
    <>
      {isFirstLogin && <WelcomeScreen username={user.data.username} />}
      <HeroSection />
      <QualitySection />
      <OurGoal />
      <FeatureProducts />
      <ProductCategories />
      {/* <BasicTable /> */}
      <CoorporationPartners />
      <ServicesSection />
    </>
  );
};

export default Home;
