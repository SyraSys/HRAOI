"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Download, FileText, User } from "lucide-react";
import MemberSearch from "@/components/MemberSearch";

import { getNormalizedFileUrl, isImageUrl } from "@/lib/utils";

interface Certificate {
  id: string;
  certificateNumber: string;
  fileUrl: string;
  idCardUrl?: string;
  createdAt: string;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("member");

  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (queryParam) {
      handleSearch(queryParam);
    }
  }, [queryParam]);

  async function handleSearch(id: string) {
    if (!id.trim()) return;

    setLoading(true);
    setError("");
    setSearched(true);
    setCertificates([]);
    setSelectedCert(null);

    try {
      const res = await fetch("/api/membership/search?id=" + encodeURIComponent(id));
      const result = await res.json();

      if (res.ok && result.success) {
        setCertificates(result.data);
        if (result.data.length === 1) {
          setSelectedCert(result.data[0]);
        }
      } else {
        setError(result.error || "No records found, please try again with correct ID");
      }
    } catch {
      setError("Failed to search. Please try again.");
    } finally {
      setLoading(false);
    }
  }


  const handleDownload = async (fileUrl: string, fileName: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName || 'download';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback to direct link
      window.open(fileUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-6 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Sidebar */}
          <aside className="lg:w-1/3 xl:w-1/4">
            <div className="sticky top-4 lg:top-10 space-y-4 lg:space-y-6">
              <MemberSearch
                initialValue={queryParam || ""}
                onSearch={handleSearch}
                className="shadow-md border-0"
              />

              {/* Human Rights Association of India */}
              <div className="bg-background-light-purple p-4 lg:p-6 rounded-xl border border-purple-100">
                <h3 className="text-sm lg:text-lg font-bold mb-3 lg:mb-4 uppercase tracking-tighter text-indigo-950">Human Rights Association of India</h3>
                <div className="space-y-3 lg:space-y-4">
                  {/* Hindi Text Mockup */}
                  <p className="text-xs text-gray-600 leading-relaxed italic">
                    सभी अध्यक्ष अपने अधीनस्थ राज्य/संभाग/जिला में आईकार्ड वितरण कार्यक्रम के माध्यम से सूचित करें।
                  </p>
                  <p className="text-[10px] text-gray-500 italic">
                    All presidents should ensure through icards distribution program in their subordinate state/division/districts
                  </p>
                </div>
              </div>

              {/* Blue Banner Box */}
              <div className="bg-primary text-white p-4 lg:p-6 rounded-xl text-center shadow-lg shadow-primary/20">
                <p className="text-xs leading-relaxed italic">
                  ** Dear all Members of HRAOI, the renewal process is stated please contact your District President for any information Please contact Delhi Office, or you can drop us a mail at www.hraoi.in@gmail.com**
                </p>
              </div>


              {certificates.length > 1 && (
                <div className="bg-white p-4 lg:p-6 rounded-xl border border-blue-50 shadow-sm">
                  <h3 className="text-sm font-bold text-indigo-950 uppercase tracking-wider mb-4">Search Results ({certificates.length})</h3>
                  <div className="space-y-3">
                    {certificates.map((cert) => (
                      <button
                        key={cert.id}
                        onClick={() => setSelectedCert(cert)}
                        className={`w-full text-left p-3 rounded-lg text-xs font-semibold transition-all border ${selectedCert?.id === cert.id
                          ? 'bg-primary/5 border-primary/30 text-primary'
                          : 'bg-gray-50 border-gray-100 text-gray-600 hover:border-primary/20 hover:bg-white'
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span className="truncate">File ID: {cert.certificateNumber}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Main Results Area */}
          <main className="lg:w-2/3 xl:w-3/4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-8 min-h-[400px] lg:min-h-[600px] flex flex-col">
              <div className="flex items-center justify-between mb-6 lg:mb-8 pb-3 lg:pb-4 border-b border-gray-100">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900">Member Info</h2>
                {searched && !loading && (
                  <div className="flex items-center gap-4">
                    <span className="text-xs lg:text-sm font-medium text-gray-400">
                      {certificates.length} {certificates.length === 1 ? 'file' : 'files'} found
                    </span>
                    {selectedCert && (
                      <button
                        onClick={() => handleDownload(selectedCert.fileUrl, `certificate-${selectedCert.certificateNumber}${isImageUrl(selectedCert.fileUrl) ? '.jpg' : '.pdf'}`)}
                        className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg hover:bg-gray-200 transition-all text-xs font-bold cursor-pointer">
                        <Download className="w-4 h-4" />
                        Download {isImageUrl(selectedCert.fileUrl) ? 'Image' : 'PDF'}
                      </button>
                    )}
                  </div>
                )}
              </div>

              {loading && (
                <div className="flex-1 flex flex-col items-center justify-center py-12 lg:py-20 text-center">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <Search className="w-6 h-6 text-primary absolute inset-0 m-auto animate-pulse" />
                  </div>
                  <p className="text-gray-500 mt-6 font-medium">Searching for your files...</p>
                </div>
              )}

              {error && !loading && (
                <div className="flex-1 flex flex-col items-center justify-center py-12 lg:py-20 text-center bg-red-50/30 rounded-2xl border border-red-100/50">
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-bold text-red-900 mb-2">Notice</h3>
                  <p className="text-red-700 max-w-sm mx-auto">{error}</p>
                </div>
              )}

              {!searched && !loading && (
                <div className="flex-1 flex flex-col items-center justify-center py-12 lg:py-20 text-center">
                  <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-10 h-10 text-primary/40" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Ready to search</h3>
                  <p className="text-gray-500 max-w-sm mx-auto">Enter your ID in the sidebar to retrieve and view your documents.</p>
                </div>
              )}

              {searched && !loading && !error && !selectedCert && certificates.length > 0 && (
                <div className="flex-1 flex flex-col items-center justify-center py-12 lg:py-20 text-center">
                  <div className="bg-primary/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-10 h-10 text-primary/60" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Multiple files found</h3>
                  <p className="text-gray-500 max-w-sm mx-auto">Please select a file from the sidebar to view its content.</p>
                </div>
              )}

              {selectedCert && !loading && (
                <div className="flex-1 flex flex-col space-y-6 lg:space-y-8">
                  {/* Certificate Section */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" /> Certificate
                    </h3>
                    <div className="flex-1 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 relative group flex items-center justify-center min-h-[300px] lg:min-h-[500px]">
                      {isImageUrl(selectedCert.fileUrl) ? (
                        <img
                          src={getNormalizedFileUrl(selectedCert.fileUrl)}
                          alt="Certificate"
                          className="max-w-full max-h-[800px] object-contain shadow-2xl"
                        />
                      ) : (
                        <iframe
                          src={`${getNormalizedFileUrl(selectedCert.fileUrl)}#toolbar=0&navpanes=0&scrollbar=0`}
                          className="w-full h-full"
                          title="Certificate PDF Preview"
                        />
                      )}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a
                          href={selectedCert.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/90 backdrop-blur shadow-sm p-2 rounded-lg hover:bg-white transition-all inline-block"
                          title="Open in new tab"
                        >
                          <Search className="w-5 h-5 text-gray-600" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* ID Card Section */}
                  {selectedCert.idCardUrl && (
                    <div className="flex-1 flex flex-col pt-6 lg:pt-8 border-t border-gray-100">
                      <h3 className="text-base lg:text-lg font-bold text-gray-900 mb-3 lg:mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-indigo-600" /> ID Card
                      </h3>
                      <div className="flex-1 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 relative group flex items-center justify-center min-h-[300px] lg:min-h-[500px]">
                        {isImageUrl(selectedCert.idCardUrl) ? (
                          <img
                            src={getNormalizedFileUrl(selectedCert.idCardUrl)}
                            alt="ID Card"
                            className="max-w-full max-h-[800px] object-contain shadow-2xl"
                          />
                        ) : (
                          <iframe
                            src={`${getNormalizedFileUrl(selectedCert.idCardUrl)}#toolbar=0&navpanes=0&scrollbar=0`}
                            className="w-full h-full"
                            title="ID Card PDF Preview"
                          />
                        )}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <a
                            href={selectedCert.idCardUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/90 backdrop-blur shadow-sm p-2 rounded-lg hover:bg-white transition-all inline-block"
                            title="Open in new tab"
                          >
                            <Search className="w-5 h-5 text-gray-600" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 lg:mt-6 flex flex-wrap items-center justify-between p-3 lg:p-4 bg-gray-50 rounded-xl border border-gray-100 gap-3 lg:gap-4">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Currently Viewing</p>
                      <h4 className="text-sm font-bold text-indigo-950 mt-1">ID: {selectedCert.certificateNumber}</h4>
                    </div>
                    <div className="flex gap-2 lg:gap-3">
                      <button
                        onClick={() => handleDownload(selectedCert.fileUrl, `certificate-${selectedCert.certificateNumber}${isImageUrl(selectedCert.fileUrl) ? '.jpg' : '.pdf'}`)}
                        className="bg-primary text-white px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-bold text-xs shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        Download Certificate
                      </button>
                      {selectedCert.idCardUrl && (
                        <button
                          onClick={() => handleDownload(selectedCert.idCardUrl!, `idcard-${selectedCert.certificateNumber}${isImageUrl(selectedCert.idCardUrl!) ? '.jpg' : '.pdf'}`)}
                          className="bg-indigo-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-xl font-bold text-xs shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                          Download ID Card
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div></div>}>
      <SearchContent />
    </Suspense>
  );
}
