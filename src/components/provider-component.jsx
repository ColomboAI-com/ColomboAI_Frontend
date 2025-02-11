"use client";
import { Suspense } from "react";
import Loader from "./Loader";
import App from "../../App";

const ProviderComponent = ({ children }) => {
  return (
    <Suspense fallback={<SplashLogo />}>
      <App>{children}</App>
    </Suspense>
  );
};

export default ProviderComponent;

const SplashLogo = () => (
  <div className="h-[100vh] w-full flex justify-center">
    <img
      src="/images/home/ColomboAI-logo.svg"
      alt="logo-image"
      className="mx-auto w-[174px]"
    />
  </div>
);
