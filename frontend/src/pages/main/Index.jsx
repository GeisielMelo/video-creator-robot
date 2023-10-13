import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Nav from "../../components/index/Nav";
import Hero from "../../components/index/Hero";
import Footer from "../../components/index/Footer";
import { Wrapper } from "../../components/Wrapper";
import { Loading } from "../../components/Loading";

const Index = () => {
  const { authenticated } = useContext(AuthContext);
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
          <Nav isAuthenticated={authenticated} isMobile={isMobile} />
          <Hero />
          <Footer />
        </>
      )}
    </Wrapper>
  );
};

export default Index;
