import Link from "next/link";
import MemberSearch from "@/components/MemberSearch";
import { FadeIn, Stagger, StaggerItem, Pressable } from "@/components/Motion";
import { motion } from "framer-motion";

export default function AboutUs() {
    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* Page Title */}


                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <aside className="lg:w-1/4 space-y-8">
                        {/* Member Search */}
                        <MemberSearch />

                        {/* Human Rights Association of India */}
                        <div className="bg-background-light-purple p-6 rounded-xl border border-purple-100">
                            <h3 className="text-lg font-bold mb-4 uppercase tracking-tighter text-indigo-950">Human Rights Association of India</h3>
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
                        <div className="bg-primary text-white p-6 rounded-xl text-center shadow-lg shadow-primary/20">
                            <p className="text-xs leading-relaxed italic">
                                ** Dear all Members of HRAOI, the renewal process is stated please contact your District President for any information Please contact Delhi Office, or you can drop us a mail at www.hraoi.in@gmail.com**
                            </p>
                        </div>

                        {/* Torch/HRAOI Symbol */}
                        <div className="flex flex-col items-center py-4">
                            <div className="w-32 h-64 flex items-center justify-center mb-4">
                                <img src="/images/torch.jpeg" alt="HRAOI Torch" className="w-full h-full object-contain" />
                            </div>

                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:w-2/3">
                        <div className="mb-14">
                            <h2 className="text-3xl font-extrabold text-primary-dark mb-4 tracking-tight">About Us</h2>
                            <p className=" text-gray-700 leading-relaxed font-semibold">
                                HRAOI is based on the philosophy of <span className="text-primary italic">HUMAN RIGHTS</span>.
                                <span className="block mt-2 text-primary-dark">"Vasudhav Kutumbakum" (The whole world is family)</span>
                                <span className="block text-gray-600 font-medium">All human beings are born equal and free.</span>
                            </p>
                        </div>

                        <FadeIn>
                            <div className="mb-14 p-10 bg-blue-100 rounded-2xl shadow-inner">
                                <h2 className="text-2xl font-bold text-primary-dark inline-block relative px-1 mb-8 uppercase tracking-tight">
                                    What We Do
                                </h2>

                                <Stagger interval={0.08}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-3">
                                        {[
                                            "Advocacy for human rights protection",
                                            "Legal aid and assistance",
                                            "Awareness campaigns and education",
                                            "Investigation of rights violations",
                                            "Community development programs",
                                            "Policy recommendations to government",
                                        ].map((text, i) => (
                                            <StaggerItem key={i}>
                                                <div className="flex items-start gap-4 group">
                                                    <div className="mt-1.5 w-2 h-2 rounded-full bg-secondary flex-shrink-0 group-hover:scale-150 transition-transform"></div>
                                                    <span className="text-gray-700 font-medium text-base tracking-tight">{text}</span>
                                                </div>
                                            </StaggerItem>
                                        ))}
                                    </div>
                                </Stagger>
                            </div>
                        </FadeIn>

                        {/* Mission, Vision, Values Section */}
                        <div className="mb-14 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "MISSION",
                                    text: "Protect and promote human rights for all citizens of India regardless of caste, creed, religion, or economic status.",
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8A24D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 3l7 4v5c0 5-3.5 8.5-7 9-3.5-.5-7-4-7-9V7l7-4z" />
                                            <path d="M9 12l2 2 4-4" />
                                        </svg>
                                    ),
                                    bgColor: "bg-[#F8F5EC]"
                                },
                                {
                                    title: "OUR VISION",
                                    text: "A society where every individual enjoys their fundamental rights and lives with dignity and respect.",
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8A24D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    ),
                                    bgColor: "bg-[#F8F5EC]"
                                },
                                {
                                    title: "OUR VALUES",
                                    text: "Justice, Equality, Integrity, Compassion, and Dedication to serving humanity.",
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8A24D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 3v18" />
                                            <path d="M3 7h18" />
                                            <path d="M7 7l-3 5a3 3 0 0 0 6 0l-3-5z" />
                                            <path d="M17 7l-3 5a3 3 0 0 0 6 0l-3-5z" />
                                        </svg>
                                    ),
                                    bgColor: "bg-[#F8F5EC]"
                                }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition-all duration-300">
                                    <div className="flex items-center justify-center gap-3 mb-6">
                                        <div className={`w-10 h-10 ${item.bgColor || 'bg-gray-50'} rounded-[10px] flex items-center justify-center`}>
                                            {item.icon}
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-800 tracking-wide">{item.title}</h3>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Our Leadership Section */}
                        <div className="mb-14">
                            <h2 className="text-2xl font-bold text-primary-dark inline-block relative px-1 mb-10 uppercase tracking-tight">
                                Our Leadership
                                <div className="absolute left-0 -bottom-1 w-full h-1 bg-secondary/80"></div>
                            </h2>

                            <div className="space-y-12">
                                {/* President */}
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-gray-50/30 p-8 rounded-2xl border border-gray-100">
                                    <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-lg border-2 border-primary/20 flex-shrink-0">
                                        <img src="/images/sudhir.png" alt="Mr. Sudhir Kumar" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="text-center md:text-left">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-1">Mr. Sudhir Kumar</h3>
                                        <p className="text-primary font-bold mb-4 uppercase tracking-wider text-sm">National President</p>
                                        <p className="text-gray-600 leading-relaxed italic">
                                            Mr. Sudhir Kumar is a senior human rights activist with over 30 years of dedicated experience in human rights protection and social justice. Under his visionary leadership, HRAOI has strengthened its mission to promote justice, equality, dignity, and humanitarian values.
                                        </p>
                                    </div>
                                </div>

                                {/* Vice President */}
                                <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-8 bg-gray-50/30 p-8 rounded-2xl border border-gray-100">
                                    <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-lg border-2 border-primary/20 flex-shrink-0">
                                        <img src="/images/surajkuman.png" alt="Mr. Suraj Kumar" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="text-center md:text-right">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-1">Mr. Suraj Kumar</h3>
                                        <p className="text-secondary font-bold mb-4 uppercase tracking-wider text-sm">National Vice President</p>
                                        <p className="text-gray-600 leading-relaxed italic">
                                            Mr. Suraj Kumar is a committed human rights leader with years of experience in organizational leadership and grassroots engagement, playing a vital role in strengthening human rights awareness and justice advocacy across the country.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Text Blocks */}
                        {/* <div className="space-y-8 text-gray-700 leading-relaxed text-sm border-b pb-12">
                            <p>
                                <span className="font-bold">A National level Human Rights Organization (NGO)</span> has been set up on <span className="font-bold">10th March 1999</span>, with the object to create mass awareness of Human Rights & Protection from atrocities & torture to Common People under the title <span className="italic">"Bhartiya Manavadhikar Association"</span> (Human Rights Association of India) duly registered under Indian Societies Act 1860 bearing Registration No. <span className="font-bold">S-47264-03</span>. Needless to mention that the concept of Human Rights is very new to the public due to the late enactment of the "Protection of Human Rights Act 1993" by the Government of India. i.e. after a gap of 46 years of its independence. Obviously, it requires deep concern and massive efforts in the matter of the increasing and alarming situation of torture in the country.
                            </p>

                            <p>
                                We, however with the help of a large team of office bearers, delegates & members, are day by day achieving our goal through effective efforts, still, expert knowledge, guidance, and updated techniques are required from the pioneer offices like that of yours in the field of Human Rights Protection.
                            </p>
                        </div> */}

                        {/* Our History Section */}
                        <div className="mt-12 space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-primary-dark inline-block relative px-1 mb-8">
                                    Our History
                                    <div className="absolute left-0 -bottom-1 w-1/2 h-1 bg-secondary"></div>
                                </h2>

                                <div className="space-y-6 text-gray-700 leading-relaxed text-sm">
                                    <p>
                                        The Human Rights Association of India (HRAOI) was founded with a singular purpose: to be the voice of the voiceless and the defender of the defenseless. Over the years, we have grown into one of India's most respected human rights organizations.
                                    </p>

                                    <p>
                                        Our journey began with a small group of dedicated activists who believed in the power of collective action. Today, we have expanded our reach across all 28 states and 8 union territories, with thousands of active members working at the grassroots level.
                                    </p>

                                    <div className="bg-background-blue-muted p-8 rounded-2xl border-l-4 border-primary">
                                        <p className="italic">
                                            Registered under NITI Aayog, HRAOI operates with complete transparency and accountability. We are recognized for our work in addressing human rights violations, providing legal aid, and conducting awareness programs across communities.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Join Our Mission CTA */}
                        <div className="mt-10 bg-background-light-blue p-4 rounded-3xl border border-blue-100 text-center shadow-sm">
                            <h3 className="text-2xl font-bold text-primary-dark mb-4 tracking-tight">Join Our Mission</h3>
                            <p className="text-x text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
                                Become a member and be part of the movement to protect human rights.
                            </p>
                            <Link href="/membership">
                                <button className="bg-secondary text-white px-5 py-3 rounded-full font-bold text-xs hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20 hover:scale-105 active:scale-95">
                                    Become a member
                                </button>
                            </Link>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
