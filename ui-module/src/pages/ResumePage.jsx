import React from "react";
import ResumeUploader from "../components/ResumeUploader";

const ResumePage = () => (
  <main className="min-h-screen bg-white py-8 px-4">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Resume Uploader & Editor</h1>
      <p className="mb-6 text-gray-600">Upload your resume to instantly preview parsed fields and get inline suggestions to improve your CV.</p>
      <ResumeUploader />
    </div>
  </main>
);

export default ResumePage; 