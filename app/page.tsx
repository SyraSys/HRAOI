export default function Home() {
  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Hero Slider Area */}
      <section className="relative h-[300px] md:h-[450px] bg-gray-300 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-bold text-xl uppercase tracking-widest bg-gradient-to-r from-gray-200 to-gray-400">
          Hero Slider Images (Placeholder)
        </div>
        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${i === 1 ? 'bg-white' : 'bg-white/50'}`} />
          ))}
        </div>
      </section>

      {/* Search & Announcements Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Member Search */}
          <div className="bg-[#f0f9ff] p-8 rounded-2xl shadow-sm border border-blue-100">
            <h2 className="text-2xl font-bold mb-2">Member Search</h2>
            <p className="text-sm text-gray-600 mb-6">Member NO.</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Only Numeric no."
                className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#242171]"
              />
              <button className="bg-[#242171] text-white px-6 py-2 rounded font-semibold hover:bg-[#1a1a5e]">
                Search
              </button>
            </div>

            <div className="mt-8 flex justify-center">
              <div className="relative group cursor-pointer">
                <div className="bg-[#d93025] text-white px-8 py-2 font-black italic transform -skew-x-12 border-2 border-white">
                  ONLINE MEMBERSHIP
                </div>
                <div className="mt-2 text-center text-[10px] text-gray-500 font-mono">
                  ---------- CLICK HERE ----------
                </div>
              </div>
            </div>

            <div className="mt-8 bg-[#242171] text-white p-4 rounded-xl text-xs leading-relaxed italic text-center">
              ** Dear all Members of HRAI, the renewal process is stated please contact your District President for any information Please contact Delhi Office, or you can drop us a mail at hrai_dli@yahoo.com**
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-[#f8f7ff] p-8 rounded-2xl shadow-sm border border-purple-100">
            <h2 className="text-2xl font-bold mb-6">HRAI Announcements</h2>
            <ul className="space-y-4">
              <li className="flex gap-3 border-b border-gray-100 pb-4">
                <span className="text-[#242171] font-bold">•</span>
                <div>
                  <h3 className="font-bold text-sm">Website Information</h3>
                  <p className="text-sm text-gray-600">****** All the Members of HRAI, Website New look **** *********</p>
                </div>
              </li>
              <li className="text-sm text-gray-600 leading-relaxed italic">
                All presidents should ensure through icards distribution program in their subordinate state/division/districts
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 bg-white overflow-hidden border-b">
        <div className="container mx-auto px-4 flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">The Founder</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              All human beings are born equal and free. The only permissible discrimination among the people of the world is for the purpose of geographical identification. This organization was founded on the bedrock of these principles.
            </p>
            <div className="flex gap-4">
              <div className="bg-[#242171] h-1 w-12 rounded mt-3"></div>
              <div className="text-lg font-bold text-[#242171]">Late Shri Jai Prakash Chandel</div>
            </div>
          </div>

          <div className="md:w-1/2 relative flex justify-center">
            <div className="w-80 h-80 bg-gray-100 relative clip-hex shadow-2xl flex items-center justify-center border-4 border-[#242171]/10">
              <span className="text-gray-400">Founder Image</span>
              <div className="absolute -top-4 -left-4 w-4 h-4 bg-[#d93025] rounded-full" />
              <div className="absolute -bottom-4 -right-4 w-4 h-4 bg-[#d93025] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-[#242171] rounded-3xl p-8 md:p-12 relative overflow-hidden group">
            <div className="absolute left-8 bottom-0 w-48 h-64 bg-white/10 rounded-t-full hidden md:flex items-center justify-center text-white/20 select-none">
              Person
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative z-10 text-center md:text-left">
              <div className="md:ml-56">
                <h3 className="text-2xl md:text-3xl font-normal text-white mb-2">Be part of the change, and donate to a good cause.</h3>
              </div>
              <div className="relative">
                <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center gap-2 group-hover:scale-110 transition-transform">
                  <div className="w-12 h-12 border-2 border-cyan-400 rounded flex items-center justify-center">
                    <div className="w-4 h-4 bg-cyan-400 rounded-sm"></div>
                  </div>
                  <div className="text-[10px] font-bold text-[#242171] tracking-tighter uppercase">Donate</div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-black/10 rounded-full flex items-center justify-center">
                    🖐️
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chairman Message */}
      <section className="py-16 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Chairman's Message</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We, with the help of a large team of office bearers, delegates & members, are day by day achieving our goal through effective efforts, still, expert knowledge, guidance, and updated techniques are required from pioneer offices like yours in the field of Human Rights Protection.
            </p>
            <button className="bg-[#242171] text-white px-6 py-2 rounded text-sm font-semibold italic shadow-md hover:bg-[#1a1a5e] transition-colors">
              Read more
            </button>
          </div>

          <div className="md:w-1/2 relative flex justify-center">
            <div className="w-80 h-80 bg-gray-200 relative clip-hex shadow-2xl flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#242171]/20 to-transparent"></div>
              <span className="text-gray-400">Chairman Image</span>
              <div className="absolute -top-4 -right-4 w-4 h-4 bg-[#242171] rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-4 h-4 bg-[#242171] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Mini Gallery */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-48 h-32 bg-gray-200 rounded-lg border-2 border-[#242171]/20 flex items-center justify-center text-xs text-gray-400 grayscale hover:grayscale-0 transition-all cursor-pointer">
                Event {i}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-24 text-white overflow-hidden bg-[#242171]/90">
        <div className="absolute inset-0 bg-black/10 z-0"></div>
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h2 className="text-4xl font-bold mb-8">Humanrights Association of India</h2>
          <p className="max-w-4xl mx-auto text-lg leading-relaxed italic">
            HRAI is based on the philosophy of HUMAN RIGHTS. "Vasudhav Kutumbakum" (The whole world is family) All human beings are born equal and free. The only permissible discrimination amongst the people of the world is for the purpose of geographical identification. Human rights are properly understood and interpreted all over the world. They are foreign to no culture and native to all nations. It is the universality of Human rights that gives them their strength and endorses them with the power to cross any border, climb any wall, defy any force.
          </p>
        </div>
      </section>
    </div>
  );
}
