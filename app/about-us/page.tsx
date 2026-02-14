export default function AboutUs() {
    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* Page Title */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-[#1a1a5e] inline-block relative px-1">
                        From Chairman's Desk
                        <div className="absolute left-0 -bottom-1 w-1/2 h-1 bg-[#d93025]"></div>
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <aside className="lg:w-1/3 space-y-8">
                        {/* Member Search */}
                        <div className="bg-[#f0f9ff] p-6 rounded-xl border border-blue-100">
                            <h3 className="text-lg font-bold mb-4">Member Search</h3>
                            <p className="text-xs text-gray-500 mb-2">Member NO.</p>
                            <div className="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    placeholder="Only Numeric no."
                                    className="flex-1 px-3 py-2 text-sm rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#242171]"
                                />
                                <button className="bg-[#242171] text-white px-4 py-2 rounded text-xs font-semibold">Search</button>
                            </div>
                        </div>

                        {/* Manav Adhikar Garima */}
                        <div className="bg-[#f8f7ff] p-6 rounded-xl border border-purple-100">
                            <h3 className="text-lg font-bold mb-4">Manav Adhikar Garima</h3>
                            <div className="space-y-4">
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
                        <div className="bg-[#242171] text-white p-6 rounded-xl text-center">
                            <p className="text-xs leading-relaxed italic">
                                ** Dear all Members of HRAI, the renewal process is stated please contact your District President for any information Please contact Delhi Office, or you can drop us a mail at hrai_dli@yahoo.com**
                            </p>
                        </div>

                        {/* Torch/HRAI Symbol */}
                        <div className="flex flex-col items-center py-4">
                            <div className="w-16 h-32 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-[10px] text-center mb-4">
                                Torch Logo
                            </div>
                            <div className="text-center font-bold text-[#1a1a5e] text-sm space-y-1">
                                <div className="text-red-600">अपनी हिम्मत को सराहो</div>
                                <div>मेरे हमराह बनो !</div>
                                <div>हमने एक शमां जलाई है</div>
                                <div>हजारों के खिलाफ !</div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:w-2/3">
                        {/* Hexagon Profile Photo Area */}
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
                            <div className="relative group">
                                <div className="w-64 h-64 bg-gray-200 clip-hex shadow-xl flex items-center justify-center border-4 border-[#242171]/10">
                                    <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">Chairman Photo</div>
                                </div>
                                {/* Decorative points from image */}
                                <div className="absolute top-1/2 -left-3 w-3 h-3 bg-[#242171] rounded-full"></div>
                                <div className="absolute -bottom-3 left-1/2 w-3 h-3 bg-[#242171] rounded-full"></div>
                            </div>

                            <div className="text-right md:pt-40 flex-1">
                                <div className="text-sm font-bold text-[#1a1a5e] italic">Thanks,</div>
                                <div className="text-lg font-bold text-[#1a1a5e] uppercase tracking-tight">Anurag Chandravanshi,</div>
                                <div className="text-sm font-bold text-[#1a1a5e]">Chairman</div>
                            </div>
                        </div>

                        {/* Text Blocks */}
                        <div className="space-y-8 text-gray-700 leading-relaxed text-sm">
                            <p>
                                <span className="font-bold">A National level Human Rights Organization (NGO)</span> has been set up on <span className="font-bold">10th March 1999</span>, with the object to create mass awareness of Human Rights & Protection from atrocities & torture to Common People under the title <span className="italic">"Bhartiya Manavadhikar Association"</span> (Human Rights Association of India) duly registered under Indian Societies Act 1860 bearing Registration No. <span className="font-bold">S-47264-03</span>. Needless to mention that the concept of Human Rights is very new to the public due to the late enactment of the "Protection of Human Rights Act 1993" by the Government of India. i.e. after a gap of 46 years of its independence. Obviously, it requires deep concern and massive efforts in the matter of the increasing and alarming situation of torture in the country.
                            </p>

                            <p>
                                We, however with the help of a large team of office bearers, delegates & members, are day by day achieving our goal through effective efforts, still, expert knowledge, guidance, and updated techniques are required from the pioneer offices like that of yours in the field of Human Rights Protection.
                            </p>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
