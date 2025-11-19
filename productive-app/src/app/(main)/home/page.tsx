import React from "react";
import LandingHero from "@/components/landing/LandingHero";
import LandingFeatures from "@/components/landing/LandingFeatures";

/**COMPONENT */
const LoginForm: React.FC = () => {
  /**VARIABLES */

  /**FUNCTIONS */

  /**TEMPLATE */
  return (
    <main className="min-h-screen flex flex-col">
      <LandingHero />
      <LandingFeatures />
    </main>
  );
};

export default LoginForm;
