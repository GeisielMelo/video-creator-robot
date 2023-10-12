import React, { useState, useEffect } from "react";
import Nav from "../../components/index/Nav";
import Hero from "../../components/index/Hero";
import Footer from "../../components/index/Footer";
import { Wrapper } from "../../components/Wrapper";
import { Loading } from "../../components/Loading";
import { DeveloperMode } from "../../components/DeveloperMode";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Wrapper loading={loading.toString()}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <DeveloperMode onChange={() => setIsLoggedIn(!isLoggedIn)} value={isLoggedIn} />
          <Nav isAuthenticated={isLoggedIn} isMobile={isMobile} />
          <Hero />
          <Footer />
        </>
      )}
    </Wrapper>
  );
};

export default Index;
