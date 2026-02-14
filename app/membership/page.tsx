"use client";

export default function Membership() {
    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* Page Title */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-[#1a1a5e] inline-block relative px-1">
                        Membership Request
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

                    {/* Membership Form */}
                    <main className="lg:w-3/4">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                {/* Left Column */}
                                <div className="space-y-6">
                                    <input type="text" placeholder="Name" className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] transition-colors" />
                                    <input type="text" placeholder="Address 1" className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] transition-colors" />
                                    <input type="text" placeholder="Recommendation person ID" className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] transition-colors" />
                                    <select className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] bg-white transition-colors text-gray-400">
                                        <option>Select State</option>
                                    </select>
                                    <input type="text" placeholder="PinCode" className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] transition-colors" />
                                    <input type="text" placeholder="DOB: DD.MM.YYYY" className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] transition-colors" />
                                    <input type="text" placeholder="Proposed Post" className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] transition-colors" />
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                    <input type="text" placeholder="Father's Name" className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] transition-colors" />
                                    <input type="text" placeholder="Address 2" className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] transition-colors" />
                                    <input type="text" placeholder="City" className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] transition-colors" />
                                    <select className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] bg-white transition-colors text-gray-400">
                                        <option>Select District</option>
                                    </select>
                                    <input type="text" placeholder="Phone No." className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] transition-colors" />
                                    <input type="text" placeholder="DOJ: DD.MM.YY" className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] transition-colors" />
                                    <input type="text" placeholder="Area" className="w-full px-4 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-[#242171] transition-colors" />
                                </div>
                            </div>

                            {/* Photo Upload Area */}
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
                                <label className="text-sm font-bold text-[#1a1a5e]">Upload Photo in jpg Only</label>
                                <div className="flex-1 max-w-md w-full">
                                    <input
                                        type="file"
                                        className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 cursor-pointer border rounded-md p-1"
                                    />
                                </div>
                            </div>

                            {/* reCAPTCHA Mockup */}
                            <div className="flex justify-start pt-6">
                                <div className="bg-[#f9f9f9] border border-[#d3d3d3] rounded-sm p-3 w-fit flex items-center gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 border-2 border-gray-300 bg-white rounded-sm cursor-pointer"></div>
                                        <span className="text-sm text-[#333]">I'm not a robot</span>
                                    </div>
                                    <div className="flex flex-col items-center ml-4">
                                        <div className="w-8 h-8 relative opacity-70">
                                            <span className="text-[10px] font-bold text-blue-500">reCAP</span>
                                        </div>
                                        <span className="text-[8px] text-gray-400">Privacy - Terms</span>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    className="bg-[#242171] text-white px-20 py-3 rounded font-bold hover:bg-[#1a1a5e] transition-all uppercase tracking-widest text-sm shadow-lg w-full md:w-fit"
                                >
                                    SUBMIT
                                </button>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
}
