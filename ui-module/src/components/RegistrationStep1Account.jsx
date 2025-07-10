import React, { useState } from "react";

const initialState = {
  email: "",
  password: "",
  confirm: "",
};

const initialErrors = {
  email: "",
  password: "",
  confirm: "",
};

export default function RegistrationStep1Account({ values, errors, onChange, onNext, loading, onSocialLogin, onSaveLater }) {
  const [touched, setTouched] = useState({});

  const handleBlur = (field) => setTouched((t) => ({ ...t, [field]: true }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  // Password strength logic
  const getStrength = (pwd) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };
  const strength = getStrength(values.password);
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["bg-red-400", "bg-yellow-400", "bg-blue-400", "bg-green-500"];

  return (
    <form className="flex flex-col gap-6 w-full max-w-md mx-auto p-4" onSubmit={e => { e.preventDefault(); onNext(); }} aria-labelledby="account-details-heading">
      <h2 id="account-details-heading" className="text-xl font-semibold mb-2">Account Details</h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-medium">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={`input input-bordered bg-white border border-gray-300 ${errors.email && touched.email ? "border-red-500" : ""}`}
          value={values.email}
          onChange={handleChange}
          onBlur={() => handleBlur("email")}
          required
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
        />
        {loading && <div className="animate-pulse h-4 w-24 bg-gray-200 rounded" />}
        {errors.email && touched.email && (
          <span id="email-error" className="text-red-500 text-sm">{errors.email}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-medium">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          className={`input input-bordered bg-white border border-gray-300 ${errors.password && touched.password ? "border-red-500" : ""}`}
          value={values.password}
          onChange={handleChange}
          onBlur={() => handleBlur("password")}
          required
          aria-invalid={!!errors.password}
          aria-describedby="password-error"
        />
        <div className="flex items-center gap-2 mt-1">
          <div className={`h-2 w-24 rounded ${strengthColors[strength-1] || "bg-gray-200"}`}></div>
          <span className="text-xs">{values.password && strengthLabels[strength-1]}</span>
        </div>
        {errors.password && touched.password && (
          <span id="password-error" className="text-red-500 text-sm">{errors.password}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="confirm" className="font-medium">Confirm Password</label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          autoComplete="new-password"
          className={`input input-bordered bg-white border border-gray-300 ${errors.confirm && touched.confirm ? "border-red-500" : ""}`}
          value={values.confirm}
          onChange={handleChange}
          onBlur={() => handleBlur("confirm")}
          required
          aria-invalid={!!errors.confirm}
          aria-describedby="confirm-error"
        />
        {errors.confirm && touched.confirm && (
          <span id="confirm-error" className="text-red-500 text-sm">{errors.confirm}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-medium">Or sign up with</span>
        <div className="flex gap-3">
          <button type="button" className="btn btn-outline flex-1" onClick={() => onSocialLogin("google")}>Google</button>
          <button type="button" className="btn btn-outline flex-1" onClick={() => onSocialLogin("linkedin")}>LinkedIn</button>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4 sticky bottom-0 bg-white/80 py-2 z-10">
        <button type="submit" className="btn btn-primary w-full" disabled={loading}>Next</button>
        <button type="button" className="btn btn-link text-sm" onClick={onSaveLater}>Save & Continue Later</button>
      </div>
    </form>
  );
} 