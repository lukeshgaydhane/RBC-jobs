import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RegistrationStepper from "../components/RegistrationStepper";

function SignInForm({ onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // TODO: Replace with real API call
    await new Promise((res) => setTimeout(res, 700));
    if (email === "user@example.com" && password === "password123") {
      onSignIn && onSignIn({ email });
    } else {
      setError("Invalid email or password.");
    }
    setLoading(false);
  };

  return (
    <form className="flex flex-col gap-4 w-full max-w-md mx-auto p-4" onSubmit={handleSubmit} aria-labelledby="signin-heading">
      <h2 id="signin-heading" className="text-xl font-semibold mb-2">Sign In</h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="signin-email" className="font-medium">Email</label>
        <input
          id="signin-email"
          name="email"
          type="email"
          autoComplete="email"
          className="input input-bordered"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="signin-password" className="font-medium">Password</label>
        <input
          id="signin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          className="input input-bordered"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</button>
    </form>
  );
}

export default function AuthPage() {
  const location = useLocation();
  // If on /register, default to register mode
  const initialMode = location.pathname === "/register" ? "register" : null;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [authMode, setAuthMode] = useState(initialMode); // null, 'signin', 'register'
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  // If the route changes to /register, open registration form
  useEffect(() => {
    if (location.pathname === "/register") {
      setAuthMode("register");
      setDropdownOpen(false);
    }
  }, [location.pathname]);

  const handleAuthClick = () => {
    setDropdownOpen((open) => !open);
  };

  const handleSelect = (mode) => {
    setAuthMode(mode);
    setDropdownOpen(false);
  };

  // Allow switching by clicking Auth again
  const handleReset = () => {
    setAuthMode(null);
    setDropdownOpen(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-auto p-0 md:p-8 flex flex-col items-center">
        {/* Only show Auth button if not in a mode */}
        {!authMode && (
          <div className="relative mt-4 mb-6" ref={dropdownRef}>
            <button
              className="btn btn-outline px-6 py-2 text-lg font-medium focus:outline-none"
              onClick={handleAuthClick}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
              aria-label="Show authentication options"
            >
              Auth
            </button>
            {dropdownOpen && !authMode && (
              <ul
                className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg z-10 animate-fade-in"
                role="listbox"
                tabIndex={-1}
              >
                <li>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-100"
                    onClick={() => handleSelect("signin")}
                    role="option"
                  >
                    Sign In
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-100"
                    onClick={() => handleSelect("register")}
                    role="option"
                  >
                    Register
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
        {/* Show the selected form */}
        <div className="w-full">
          {authMode === "signin" && <SignInForm />}
          {authMode === "register" && <RegistrationStepper />}
        </div>
        {/* If in a mode, allow switching back */}
        {authMode && (
          <button
            className="mt-4 text-blue-600 underline text-sm"
            onClick={handleReset}
            aria-label="Back to Auth options"
          >
            Back to Auth options
          </button>
        )}
      </div>
    </div>
  );
} 