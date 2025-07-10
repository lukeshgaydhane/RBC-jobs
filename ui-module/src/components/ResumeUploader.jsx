import React, { useRef, useState } from "react";

const mockParseResume = async (file) => {
  // Simulate parsing delay
  await new Promise((r) => setTimeout(r, 1000));
  // Mocked parsed data
  return {
    role: "Software Engineer",
    skills: ["JavaScript", "React", "Node.js"],
    education: [
      { degree: "B.Sc. Computer Science", institution: "ABC University", start: "2016", end: "2020" },
      { degree: "M.Sc. AI", institution: "XYZ Institute", start: "2021", end: "" } // missing end date
    ],
    issues: [
      { type: "missing_date", message: "Some education entries are missing end dates.", field: "education" },
      { type: "inconsistent_format", message: "Skill 'Node.js' is not capitalized consistently.", field: "skills" }
    ]
  };
};

const ResumeUploader = () => {
  const fileInputRef = useRef();
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [parsed, setParsed] = useState(null);

  const handleFiles = async (files) => {
    setError("");
    setParsed(null);
    setUploading(true);
    try {
      const file = files[0];
      // TODO: Add real file type/size validation
      const parsedData = await mockParseResume(file);
      setParsed(parsedData);
    } catch (e) {
      setError("Failed to parse resume. Please try a different file.");
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const onPaste = (e) => {
    if (e.clipboardData.files && e.clipboardData.files.length > 0) {
      handleFiles(e.clipboardData.files);
    }
  };

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <label
        htmlFor="resume-upload"
        tabIndex={0}
        aria-label="Upload resume"
        className={`block border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onPaste={onPaste}
        style={{ outline: dragActive ? "2px solid #3b82f6" : "none" }}
      >
        <input
          id="resume-upload"
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.rtf,.txt"
          className="hidden"
          onChange={onFileChange}
        />
        <span className="text-lg font-medium">Drag & drop your resume here, paste, or <span className="text-blue-600 underline" onClick={() => fileInputRef.current.click()}>browse</span></span>
        <div className="mt-2 text-sm text-gray-500">PDF, DOCX, RTF, or TXT. Max 5MB.</div>
        {uploading && <div className="mt-4 text-blue-600 animate-pulse">Parsing resume...</div>}
        {error && <div className="mt-4 text-red-600">{error}</div>}
      </label>
      {parsed && (
        <div className="mt-8 bg-gray-50 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Parsed Resume Fields</h3>
          <div className="mb-2">
            <span className="font-medium">Role:</span> {parsed.role}
          </div>
          <div className="mb-2">
            <span className="font-medium">Skills:</span> {parsed.skills.join(", ")}
            {parsed.issues?.find(i => i.field === "skills") && (
              <span className="ml-2 text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">{parsed.issues.find(i => i.field === "skills").message} <button className="underline ml-1">Fix</button></span>
            )}
          </div>
          <div>
            <span className="font-medium">Education:</span>
            <ul className="ml-4 list-disc">
              {parsed.education.map((edu, idx) => (
                <li key={idx} className="mb-1">
                  {edu.degree} @ {edu.institution} ({edu.start} - {edu.end || <span className="text-red-600">[missing]</span>})
                  {!edu.end && (
                    <span className="ml-2 text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">Missing end date <button className="underline ml-1">Fix</button></span>
                  )}
                </li>
              ))}
            </ul>
            {parsed.issues?.find(i => i.field === "education") && (
              <div className="mt-1 text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded inline-block">{parsed.issues.find(i => i.field === "education").message} <button className="underline ml-1">Fix</button></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUploader; 