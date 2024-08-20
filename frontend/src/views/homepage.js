import React from 'react';
import NavigationBar from '../components/nav/nav';
import HeroSection from '../components/homepage/HSection';
import NewsSection from '../components/homepage/NewsSection';
import FeatureSection from '../components/homepage/FeatureSection';

const HomePage = () => {
  return (
    <>
      <NavigationBar />
      <HeroSection />
      <NewsSection />
      <NewsSection />
      <FeatureSection />
    </>
  );
};

export default HomePage;
