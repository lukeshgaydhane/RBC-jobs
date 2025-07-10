import React from "react";
import RegistrationStepper from "../components/RegistrationStepper";
// import RegistrationStep1Account from "../components/RegistrationStep1Account";
// import RegistrationStep2Profile from "../components/RegistrationStep2Profile";
// import RegistrationStep3Resume from "../components/RegistrationStep3Resume";

const RegistrationPage = () => (
  <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
    <RegistrationStepper onSaveLater={() => alert("Progress saved!")}> 
      {/* TODO: Replace with real step components */}
      <div>Step 1: Account Details (Coming soon...)</div>
      <div>Step 2: Profile Info (Coming soon...)</div>
      <div>Step 3: Resume & Extras (Coming soon...)</div>
    </RegistrationStepper>
  </main>
);

export default RegistrationPage; 