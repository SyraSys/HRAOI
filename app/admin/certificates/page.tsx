"use client";

import { useState, useEffect } from "react";
import { Upload, Trash2, FileText } from "lucide-react";

interface Certificate {
  id: string;
  certificateNumber: string;
  fileUrl: string;
  createdAt: string;
}

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Form state
  const [certificateNumber, setCertificateNumber] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await fetch("/api/admin/certificates");
      if (response.ok) {
        const data = await response.json();
        setCertificates(data);
      }
    } catch (error) {
      console.error("Failed to fetch certificates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !certificateNumber.trim()) return;

    setUploading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("certificateNumber", certificateNumber);
    formDataToSend.append("file", file);

    try {
      const response = await fetch("/api/admin/certificates", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Certificate uploaded successfully!");
        setCertificateNumber("");
        setFile(null);
        fetchCertificates();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to upload certificate");
      }
    } catch (error) {
      alert("Failed to upload certificate");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;

    try {
      const response = await fetch("/api/admin/certificates", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        alert("Certificate deleted successfully!");
        fetchCertificates();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to delete certificate");
      }
    } catch (error) {
      alert("Failed to delete certificate");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Manage Certificates</h1>

      {/* Upload Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload New Certificate</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Certificate ID Number *
            </label>
            <input
              type="text"
              required
              value={certificateNumber}
              onChange={(e) => setCertificateNumber(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., CERT-2024-001"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Certificate File (PDF or Image) *
            </label>
            <input
              type="file"
              required
              accept=".pdf, image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 disabled:bg-gray-400 flex items-center gap-2"
          >
            <Upload className="w-5 h-5" />
            {uploading ? "Uploading..." : "Upload Certificate"}
          </button>
        </form>
      </div>

      {/* Certificates List */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">All Certificates</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : certificates.length === 0 ? (
          <p className="text-gray-500">No certificates found.</p>
        ) : (
          <div className="space-y-4">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-start gap-4">
                  <FileText className="w-8 h-8 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">
                      Certificate #{cert.certificateNumber}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Uploaded {new Date(cert.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href={cert.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View
                  </a>
                  <button
                    onClick={() => handleDelete(cert.id)}
                    className="text-red-600 hover:text-red-800 p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
