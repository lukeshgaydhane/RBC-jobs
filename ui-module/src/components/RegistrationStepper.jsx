import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegistrationStep1Account from "./RegistrationStep1Account";
import RegistrationStep2Profile from "./RegistrationStep2Profile";
import RegistrationStep3Resume from "./RegistrationStep3Resume";

const steps = [
  {
    label: "Account",
    Component: RegistrationStep1Account,
  },
  {
    label: "Profile",
    Component: RegistrationStep2Profile,
  },
  {
    label: "Resume",
    Component: RegistrationStep3Resume,
  },
];

const initialValues = {
  email: "",
  password: "",
  confirm: "",
  name: "",
  phone: "",
  location: "",
  skills: [],
  experience: 0,
  resume: null,
  photo: null,
  optInJobAlerts: false,
  optInTerms: false,
  parsed: {},
};

export default function RegistrationStepper() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorSummary, setErrorSummary] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // Validation logic for each step
  const validate = (stepIdx = step) => {
    const errs = {};
    if (stepIdx === 0) {
      if (!values.email) errs.email = "Email is required.";
      else if (!/^\S+@\S+\.\S+$/.test(values.email)) errs.email = "Invalid email format.";
      if (!values.password) errs.password = "Password is required.";
      else if (values.password.length < 8) errs.password = "Password must be at least 8 characters.";
      if (!values.confirm) errs.confirm = "Please confirm your password.";
      else if (values.password !== values.confirm) errs.confirm = "Passwords do not match.";
    } else if (stepIdx === 1) {
      if (!values.name) errs.name = "Name is required.";
      if (!values.phone) errs.phone = "Phone is required.";
      else if (!/^\+?\d{10,15}$/.test(values.phone.replace(/\D/g, ""))) errs.phone = "Invalid phone number.";
      if (!values.location) errs.location = "Location is required.";
    } else if (stepIdx === 2) {
      if (!values.resume) errs.resume = "Resume is required.";
      if (!values.optInTerms) errs.optInTerms = "You must agree to the terms.";
    }
    return errs;
  };

  // Scroll to first error field
  const scrollToFirstError = () => {
    const firstError = Object.keys(errors)[0];
    if (firstError) {
      const el = document.getElementById(firstError);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Handle field change
  const handleChange = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
    setErrorSummary("");
  };

  // Handle next step
  const handleNext = async () => {
    const errs = validate(step);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setErrorSummary("Please fix the errors below.");
      setTimeout(scrollToFirstError, 100);
      return;
    }
    if (step === 0) {
      setLoading(true);
      // Simulate async email check
      await new Promise((res) => setTimeout(res, 800));
      if (values.email === "taken@example.com") {
        setErrors({ email: "Email already in use." });
        setErrorSummary("Email already in use.");
        setLoading(false);
        setTimeout(scrollToFirstError, 100);
        return;
      }
      setLoading(false);
    }
    setStep((s) => s + 1);
    setErrorSummary("");
  };

  // Handle back
  const handleBack = () => {
    setStep((s) => Math.max(0, s - 1));
    setErrorSummary("");
  };

  // Social login placeholder
  const handleSocialLogin = (provider) => {
    alert(`Social login with ${provider} coming soon!`);
  };

  // Save & Continue Later placeholder
  const handleSaveLater = () => {
    alert("Progress saved! (Not implemented)");
  };

  // Handle final submit
  const handleFinalSubmit = async () => {
    const errs = validate(step);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setErrorSummary("Please fix the errors below.");
      setTimeout(scrollToFirstError, 100);
      return;
    }
    setSubmitting(true);
    // Simulate registration API call
    await new Promise((res) => setTimeout(res, 1200));
    // Simulate sign-in and redirect
    navigate("/", { replace: true });
  };

  const StepComponent = steps[step].Component;

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 mb-12">
      {/* Progress Bar & Step Indicator */}
      <div className="flex items-center gap-2 mb-6 px-2">
        {steps.map((s, i) => (
          <React.Fragment key={s.label}>
            <div className={`flex items-center gap-1 ${i <= step ? "text-blue-600" : "text-gray-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 ${i <= step ? "border-blue-600 bg-blue-100" : "border-gray-300 bg-white"}`}>{i + 1}</div>
              <span className="text-xs font-medium">{s.label}</span>
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-1 ${i < step ? "bg-blue-600" : "bg-gray-200"}`}></div>}
          </React.Fragment>
        ))}
      </div>
      {/* Animated Step Transition */}
      <div className="relative min-h-[420px]">
        <div className="transition-all duration-500" key={step}>
          {errorSummary && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-2 text-sm" role="alert">{errorSummary}</div>
          )}
          <StepComponent
            values={values}
            errors={errors}
            onChange={handleChange}
            onNext={step === steps.length - 1 ? handleFinalSubmit : handleNext}
            onBack={step > 0 ? handleBack : undefined}
            loading={loading || submitting}
            onSocialLogin={handleSocialLogin}
            onSaveLater={handleSaveLater}
          />
          {submitting && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-20">
              <div className="flex flex-col items-center gap-2">
                <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-10 h-10 animate-spin"></div>
                <span className="text-blue-700 font-medium">Creating your account...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 