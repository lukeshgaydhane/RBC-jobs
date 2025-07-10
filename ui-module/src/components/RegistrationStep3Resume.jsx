import React, { useRef, useState } from "react";

const initialState = {
  resume: null,
  photo: null,
  optInJobAlerts: false,
  optInTerms: false,
  parsed: {},
};

export default function RegistrationStep3Resume({ values, errors, onChange, onNext, onBack, loading }) {
  const fileInputRef = useRef();
  const photoInputRef = useRef();
  const [dragActive, setDragActive] = useState(false);

  // Mock parser for demo
  const parseResume = (file) => {
    // In real app, parse file and extract fields
    return { name: "John Doe", email: "john@example.com", phone: "+91-9876543210" };
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange("resume", file);
      onChange("parsed", parseResume(file));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange("photo", file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange("resume", e.dataTransfer.files[0]);
      onChange("parsed", parseResume(e.dataTransfer.files[0]));
    }
  };

  return (
    <form className="flex flex-col gap-6 w-full max-w-md mx-auto p-4" onSubmit={e => { e.preventDefault(); onNext(); }} aria-labelledby="resume-upload-heading">
      <h2 id="resume-upload-heading" className="text-xl font-semibold mb-2">Resume & Extras</h2>
      <div
        className={`border-2 border-dashed rounded p-4 text-center cursor-pointer ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
        onClick={() => fileInputRef.current.click()}
        onDragOver={e => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={e => { e.preventDefault(); setDragActive(false); }}
        onDrop={handleDrop}
        tabIndex={0}
        aria-label="Upload resume"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={handleResumeChange}
        />
        {values.resume ? (
          <div className="text-green-700">{values.resume.name} uploaded</div>
        ) : (
          <div>Drag & drop your resume here, or <span className="text-blue-600 underline">browse</span></div>
        )}
      </div>
      {values.parsed && (
        <div className="bg-gray-50 rounded p-3 mt-2">
          <div className="font-medium mb-1">Parsed Fields</div>
          <div className="flex flex-col gap-1">
            {Object.entries(values.parsed).map(([k, v]) => (
              <div key={k} className="flex items-center gap-2">
                <span className="capitalize w-20">{k}:</span>
                <input
                  type="text"
                  className="input input-sm input-bordered flex-1 bg-white border border-gray-300"
                  value={v}
                  onChange={e => onChange("parsed", { ...values.parsed, [k]: e.target.value })}
                  aria-label={`Edit ${k}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <label className="font-medium">Photo (optional)</label>
        <div className="flex items-center gap-3">
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
          <button type="button" className="btn btn-outline" onClick={() => photoInputRef.current.click()}>Upload Photo</button>
          {values.photo && (
            <img src={URL.createObjectURL(values.photo)} alt="Preview" className="w-12 h-12 rounded-full object-cover border" />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={values.optInJobAlerts}
            onChange={e => onChange("optInJobAlerts", e.target.checked)}
            className="border border-gray-300 bg-white rounded"
          />
          Receive job alerts & updates
        </label>
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={values.optInTerms}
            onChange={e => onChange("optInTerms", e.target.checked)}
            required
            className="border border-gray-300 bg-white rounded"
          />
          I agree to the terms & conditions
        </label>
      </div>
      <div className="flex flex-col gap-2 mt-4 sticky bottom-0 bg-white/80 py-2 z-10">
        <div className="flex gap-2">
          <button type="button" className="btn btn-outline flex-1" onClick={onBack}>Back</button>
          <button type="submit" className="btn btn-primary flex-1" disabled={loading || !values.optInTerms}>Finish</button>
        </div>
      </div>
    </form>
  );
} 