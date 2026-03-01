"use client";

import MemberSearch from "@/components/MemberSearch";

export default function ContactUs() {
    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* Page Title */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-primary-dark inline-block relative px-1">
                        Contact Us
                        <div className="absolute left-0 -bottom-1 w-1/2 h-1 bg-secondary border-b"></div>
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="lg:w-1/4 space-y-8">
                        {/* Member Search */}
                        <MemberSearch />

                        {/* Human Rights Association of India */}
                        <div className="bg-[#f8f7ff] p-6 rounded-xl border border-purple-100 shadow-sm">
                            <h3 className="text-lg font-bold mb-4">Human Rights Association of India</h3>
                            <div className="space-y-4">
                                <p className="text-xs text-gray-600 leading-relaxed italic">
                                    सभी अध्यक्ष अपने अधीनस्थ राज्य/संभाग/जिला में आईकार्ड वितरण कार्यक्रम के माध्यम से सूचित करें।
                                </p>
                                <p className="text-[10px] text-gray-500 italic">
                                    All presidents should ensure through icards distribution program in their subordinate state/division/districts
                                </p>
                            </div>
                        </div>

                        {/* Blue Banner Box */}
                        <div className="bg-primary text-white p-6 rounded-xl text-center shadow-md">
                            <p className="text-xs leading-relaxed italic">
                                ** Dear all Members of HRAOI, the renewal process is stated please contact your District President for any information Please contact Delhi Office, or you can drop us a mail at hraoi.in@gmail.com**
                            </p>
                        </div>
                    </aside>

                    {/* Contact Details & Map */}
                    <main className="lg:w-3/4 space-y-12">
                        {/* Office Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Head Office */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-black text-primary-dark uppercase tracking-tight border-l-4 border-secondary pl-3">Head Office:</h3>
                                <div className="text-sm text-gray-700 space-y-2 font-semibold">
                                    <p>Address: Road, I.P. Extention, Delhi - 92</p>
                                    <p>Phone: 9330977118, 9334246098</p>
                                    <p>Mobile: 6207394301</p>
                                    <p>Email: <span className="text-blue-600 cursor-pointer">hraoi.in@gmail.com</span></p>
                                </div>
                            </div>

                            {/* Chairman Camp Office */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-black text-primary-dark uppercase tracking-tight border-l-4 border-secondary pl-3">Chairman Camp Office:</h3>
                                <div className="text-sm text-gray-700 space-y-2 font-semibold">
                                    <p>Address: Road, I.P. Extention, Delhi - 92</p>
                                    <p>Phone: 9330977118, 9334246098, 6207394301</p>
                                    <p>E-Mail: <span className="text-blue-600 cursor-pointer">hraoi.in@gmail.com</span></p>
                                </div>
                            </div>
                        </div>

                        {/* We Are Here Map Section */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-[#1a1a5e] uppercase tracking-tighter">We Are Here</h3>
                            <div className="w-full aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-inner relative border border-gray-200">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    src="https://maps.google.com/maps?q=45%20D%2C%20Amar%20Plaza%2C%20Hasanpur%20Main%20Road%2C%20I.P.%20Extension%2C%20Delhi%20-%2092&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
