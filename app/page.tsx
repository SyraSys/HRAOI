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
          <div className="bg-background-light-blue p-8 rounded-2xl shadow-sm border border-blue-100">
            <h2 className="text-2xl font-bold mb-2">Member Search</h2>
            <p className="text-sm text-gray-600 mb-6">Member NO.</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Only Numeric no."
                className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary text-white px-6 py-2 rounded font-semibold hover:bg-primary-dark">
                Search
              </button>
            </div>

            <div className="mt-8 flex justify-center">
              <button className="bg-secondary text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-secondary/20 hover:scale-105 transition-transform active:scale-95">
                Become a member
              </button>
            </div>

            <div className="mt-8 bg-background-blue-muted text-primary p-4 rounded-xl text-xs leading-relaxed italic text-center border border-primary/20">
              ** Dear all Members of HRAOI, the renewal process is stated please contact your District President for any information Please contact Delhi Office, or you can drop us a mail at www.hraoi.in@gmail.com**
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-background-light-purple p-8 rounded-2xl shadow-sm border border-purple-100">
            <h2 className="text-2xl font-bold mb-6">HRAOI Announcements</h2>
            <ul className="space-y-4">
              <li className="flex gap-3 border-b border-gray-100 pb-4">
                <span className="text-primary font-bold">•</span>
                <div>
                  <h3 className="font-bold text-sm">Website Information</h3>
                  <p className="text-sm text-gray-600">****** All the Members of HRAOI, Website New look **** *********</p>
                </div>
              </li>
              <li className="text-sm text-gray-600 leading-relaxed italic">
                All presidents should ensure through icards distribution program in their subordinate state/division/districts
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* HRAOI at a Glance Section */}
      <section className="py-12 bg-background-light-violet">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-indigo-950">HRAOI at a Glance</h2>
            <div className="w-16 h-1 bg-secondary mx-auto mt-2 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Active Members', value: '50,000+', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /> },
              { label: 'States Covered', value: '28+', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 012.5 2.5V17m-5 1h3a5 5 0 004.546-2.916A5.986 5.986 0 0110 10a5.986 5.986 0 01-4.546-2.916A5 5 0 003 13h3a5 5 0 005 5z" /> },
              { label: 'Districts', value: '500+', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-7.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /> },
              { label: 'Years of Service', value: '15+', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /> },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-primary/5 hover:border-secondary/20 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {stat.icon}
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-indigo-950 leading-tight">{stat.value}</div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* National President Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 relative flex justify-center">
            {/* Styled Image Container */}
            <div className="relative group p-4">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-[2.5rem] p-1 bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 shadow-2xl overflow-hidden">
                <div className="w-full h-full bg-white rounded-[2.3rem] overflow-hidden">
                  <img src="/images/sudhir.jpeg" alt="Mr. Sudhir Kumar" className="w-full h-full object-cover" />
                </div>
              </div>
              {/* Decorative dots/shapes matching screenshot */}
              <div className="absolute top-0 left-0 w-4 h-4 bg-blue-400 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[2px]"></div>
            </div>
          </div>

          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Mr. Sudhir Kumar</h2>
            <h3 className="text-xl font-semibold text-primary mb-6">National President</h3>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Mr. Sudhir Kumar is a senior human rights activist with over 30 years of dedicated experience in human rights protection and social justice. Under his visionary leadership, HRAOI has strengthened its mission to promote justice, equality, dignity, and humanitarian values.
            </p>
          </div>
        </div>
      </section>


      {/* National Vice President Section */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="md:w-1/2 relative flex justify-center">
            <div className="relative group p-4">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-[2.5rem] p-1 bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 shadow-2xl overflow-hidden">
                <div className="w-full h-full bg-white rounded-[2.3rem] overflow-hidden">
                  <img src="/images/surajKumar.jpeg" alt="Mr. Suraj Kumar" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="absolute top-0 left-0 w-4 h-4 bg-blue-400 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[2px]"></div>
            </div>
          </div>

          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Mr. Suraj Kumar</h2>
            <h3 className="text-xl font-semibold text-primary mb-6">National Vice President</h3>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Mr. Suraj Kumar is a committed human rights leader with years of experience in organizational leadership and grassroots engagement, playing a vital role in strengthening human rights awareness and justice advocacy across the country.
            </p>
          </div>
        </div>
      </section>

      {/* National Vice General Secretary Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 relative flex justify-center">
            <div className="relative group p-4">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-[2.5rem] p-1 bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 shadow-2xl overflow-hidden">
                <div className="w-full h-full bg-white rounded-[2.3rem] overflow-hidden">
                  <img src="/images/Founder1.jpeg" alt="Mr. Ajay Kumar Das" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="absolute top-0 left-0 w-4 h-4 bg-blue-400 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[2px]"></div>
            </div>
          </div>

          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Mr. Ajay Kumar Das</h2>
            <h3 className="text-xl font-semibold text-primary mb-6">National vice general secretary</h3>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed italic">
              "Committed to justice, dignity, and human rights for all."
            </p>
          </div>
        </div>
      </section>

      {/* National General Secretary Section */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="md:w-1/2 relative flex justify-center">
            <div className="relative group p-4">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-[2.5rem] p-1 bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 shadow-2xl overflow-hidden">
                <div className="w-full h-full bg-white rounded-[2.3rem] overflow-hidden">
                  <img src="/images/founder2.jpeg" alt="Mr. Md. Hasrat Shah" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="absolute top-0 left-0 w-4 h-4 bg-blue-400 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[2px]"></div>
            </div>
          </div>

          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Mr. Md. Hasrat Shah</h2>
            <h3 className="text-xl font-semibold text-primary mb-6">National General Secretary</h3>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed italic">
              "Committed to justice, dignity, and human rights for all."
            </p>
          </div>
        </div>
      </section>

      {/* Mini Gallery */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-48 h-32 bg-gray-200 rounded-lg border-2 border-primary/20 flex items-center justify-center text-xs text-gray-400 grayscale hover:grayscale-0 transition-all cursor-pointer">
                Event {i}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Donate Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-3xl p-8 md:p-12 relative overflow-hidden group">
            <div className="absolute left-8 bottom-0 w-48 h-64 bg-white/10 rounded-t-full hidden md:flex items-center justify-center text-white/20 select-none">
              Person
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative z-10 text-center md:text-left">
              <div className="md:ml-56">
                <h3 className="text-2xl md:text-3xl font-normal text-white mb-2">Be part of the change, and donate to a good cause.</h3>
              </div>
              <div className="relative">
                <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center gap-2 group-hover:scale-110 transition-transform">
                  <div className="w-12 h-12 border-2 border-brand-cyan rounded flex items-center justify-center">
                    <div className="w-4 h-4 bg-brand-cyan rounded-sm"></div>
                  </div>
                  <div className="text-[10px] font-bold text-primary tracking-tighter uppercase">Donate</div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-black/10 rounded-full flex items-center justify-center">
                    🖐️
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Mission Section */}
      <section className="relative py-24 text-white overflow-hidden bg-primary/90">
        <div className="absolute inset-0 bg-black/10 z-0"></div>
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h2 className="text-4xl font-bold mb-8">Human Rights Association of India</h2>
          <p className="max-w-4xl mx-auto text-lg leading-relaxed italic">
            HRAOI is based on the philosophy of HUMAN RIGHTS. "Vasudhav Kutumbakum" (The whole world is family) All human beings are born equal and free. The only permissible discrimination amongst the people of the world is for the purpose of geographical identification. Human rights are properly understood and interpreted all over the world. They are foreign to no culture and native to all nations. It is the universality of Human rights that gives them their strength and endorses them with the power to cross any border, climb any wall, defy any force.
          </p>
        </div>
      </section>
    </div>
  );
}
