"use client";

export default function ContactUs() {
    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* Page Title */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-[#1a1a5e] inline-block relative px-1">
                        Contact Us
                        <div className="absolute left-0 -bottom-1 w-1/2 h-1 bg-[#d93025]"></div>
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="lg:w-1/4 space-y-8">
                        {/* Member Search */}
                        <div className="bg-[#f0f9ff] p-6 rounded-xl border border-blue-100 shadow-sm">
                            <h3 className="text-lg font-bold mb-4">Member Search</h3>
                            <p className="text-xs text-gray-500 mb-2">Member NO.</p>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Only Numeric no."
                                    className="flex-1 px-3 py-2 text-sm rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#242171]"
                                />
                                <button className="bg-[#242171] text-white px-4 py-2 rounded text-xs font-semibold">Search</button>
                            </div>
                        </div>

                        {/* Manav Adhikar Garima */}
                        <div className="bg-[#f8f7ff] p-6 rounded-xl border border-purple-100 shadow-sm">
                            <h3 className="text-lg font-bold mb-4">Manav Adhikar Garima</h3>
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
                        <div className="bg-[#242171] text-white p-6 rounded-xl text-center shadow-md">
                            <p className="text-xs leading-relaxed italic">
                                ** Dear all Members of HRAI, the renewal process is stated please contact your District President for any information Please contact Delhi Office, or you can drop us a mail at hrai_dli@yahoo.com**
                            </p>
                        </div>
                    </aside>

                    {/* Contact Details & Map */}
                    <main className="lg:w-3/4 space-y-12">
                        {/* Office Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Head Office */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-black text-[#1a1a5e] uppercase tracking-tight border-l-4 border-[#d93025] pl-3">Head Office:</h3>
                                <div className="text-sm text-gray-700 space-y-2 font-semibold">
                                    <p>Address: 45 D, Amar Plaza, Hasanpur Main Road, I.P. Extention, Delhi - 92</p>
                                    <p>Phone: 011- 32405800</p>
                                    <p>Mobile: 09871640670</p>
                                    <p>Email: <span className="text-blue-600 cursor-pointer">president@hrai.co.in</span></p>
                                    <p>Email: <span className="text-blue-600 cursor-pointer">info@hrai.co.in</span></p>
                                </div>
                            </div>

                            {/* Chairman Camp Office */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-black text-[#1a1a5e] uppercase tracking-tight border-l-4 border-[#d93025] pl-3">Chairman Camp Office:</h3>
                                <div className="text-sm text-gray-700 space-y-2 font-semibold">
                                    <p>Address: Jai Mahal, 127/U/350, Nirala Nagar, Kanpur, UP</p>
                                    <p>Phone: 0512-2641995</p>
                                    <p>Mobile: 9415511774</p>
                                    <p>E-Mail: <span className="text-blue-600 cursor-pointer">hrai_dli@yahoo.com</span></p>
                                </div>
                            </div>
                        </div>

                        {/* We Are Here Map Section */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-[#1a1a5e] uppercase tracking-tighter">We Are Here</h3>
                            <div className="w-full aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-inner relative border border-gray-200">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-gray-300 font-bold italic text-xl uppercase tracking-tighter opacity-50">Google Maps View: Amar Plaza, Delhi</div>
                                </div>
                                {/* Map Pin Mockup */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <div className="relative">
                                        <div className="text-red-600 text-3xl">📍</div>
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded shadow-sm text-[10px] font-bold whitespace-nowrap border">Amar Plaza</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
