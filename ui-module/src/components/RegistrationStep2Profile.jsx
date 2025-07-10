import React, { useState } from "react";

const initialState = {
  name: "",
  phone: "",
  location: "",
  skills: [],
  experience: 0,
};

export default function RegistrationStep2Profile({ values, errors, onChange, onNext, onBack, loading }) {
  const [skillInput, setSkillInput] = useState("");
  const [touched, setTouched] = useState({});
  const skillSuggestions = ["JavaScript", "Java", "React", "Spring", "SQL", "Python", "AWS", "Docker"];

  const handleBlur = (field) => setTouched((t) => ({ ...t, [field]: true }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const handleSkillInput = (e) => {
    setSkillInput(e.target.value);
  };

  const addSkill = (skill) => {
    if (!values.skills.includes(skill)) {
      onChange("skills", [...values.skills, skill]);
    }
    setSkillInput("");
  };

  const removeSkill = (skill) => {
    onChange("skills", values.skills.filter((s) => s !== skill));
  };

  const filteredSuggestions = skillSuggestions.filter(
    (s) => s.toLowerCase().includes(skillInput.toLowerCase()) && !values.skills.includes(s)
  );

  return (
    <form className="flex flex-col gap-6 w-full max-w-md mx-auto p-4" onSubmit={e => { e.preventDefault(); onNext(); }} aria-labelledby="profile-info-heading">
      <h2 id="profile-info-heading" className="text-xl font-semibold mb-2">Profile Information</h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-medium">Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          className={`input input-bordered bg-white border border-gray-300 ${errors.name && touched.name ? "border-red-500" : ""}`}
          value={values.name}
          onChange={handleInputChange}
          onBlur={() => handleBlur("name")}
          required
          aria-invalid={!!errors.name}
          aria-describedby="name-error"
        />
        {errors.name && touched.name && (
          <span id="name-error" className="text-red-500 text-sm">{errors.name}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="font-medium">Phone</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className={`input input-bordered bg-white border border-gray-300 ${errors.phone && touched.phone ? "border-red-500" : ""}`}
          value={values.phone}
          onChange={handleInputChange}
          onBlur={() => handleBlur("phone")}
          required
          aria-invalid={!!errors.phone}
          aria-describedby="phone-error"
        />
        {errors.phone && touched.phone && (
          <span id="phone-error" className="text-red-500 text-sm">{errors.phone}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="location" className="font-medium">Location</label>
        <input
          id="location"
          name="location"
          type="text"
          autoComplete="address-level2"
          className={`input input-bordered bg-white border border-gray-300 ${errors.location && touched.location ? "border-red-500" : ""}`}
          value={values.location}
          onChange={handleInputChange}
          onBlur={() => handleBlur("location")}
          required
          aria-invalid={!!errors.location}
          aria-describedby="location-error"
        />
        {errors.location && touched.location && (
          <span id="location-error" className="text-red-500 text-sm">{errors.location}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="skills" className="font-medium">Skills</label>
        <div className="flex flex-wrap gap-2 mb-1">
          {values.skills.map((skill) => (
            <span key={skill} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1">
              {skill}
              <button type="button" className="ml-1 text-xs" aria-label={`Remove ${skill}`} onClick={() => removeSkill(skill)}>&times;</button>
            </span>
          ))}
        </div>
        <input
          id="skills"
          name="skills"
          type="text"
          className="input input-bordered bg-white border border-gray-300"
          value={skillInput}
          onChange={handleSkillInput}
          onKeyDown={e => {
            if (e.key === "Enter" && skillInput.trim()) {
              e.preventDefault();
              addSkill(skillInput.trim());
            }
          }}
          placeholder="Type a skill and press Enter"
          aria-autocomplete="list"
          aria-controls="skills-suggestions"
        />
        {skillInput && filteredSuggestions.length > 0 && (
          <ul id="skills-suggestions" className="bg-white border rounded shadow mt-1 max-h-32 overflow-auto">
            {filteredSuggestions.map((s) => (
              <li key={s}>
                <button type="button" className="w-full text-left px-2 py-1 hover:bg-blue-50" onClick={() => addSkill(s)}>{s}</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="experience" className="font-medium">Experience (years)</label>
        <input
          id="experience"
          name="experience"
          type="range"
          min="0"
          max="30"
          value={values.experience}
          onChange={handleInputChange}
          className="w-full"
          aria-valuenow={values.experience}
          aria-valuemin={0}
          aria-valuemax={30}
        />
        <div className="text-sm text-gray-600">{values.experience} years</div>
      </div>
      <div className="flex flex-col gap-2 mt-4 sticky bottom-0 bg-white/80 py-2 z-10">
        <div className="flex gap-2">
          <button type="button" className="btn btn-outline flex-1" onClick={onBack}>Back</button>
          <button type="submit" className="btn btn-primary flex-1" disabled={loading}>Next</button>
        </div>
      </div>
    </form>
  );
} 