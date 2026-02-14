export default function Enquiry() {
    return (
        <div className="bg-white min-h-screen container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-[#1a1a5e] mb-8 inline-block relative px-1">
                Enquiry
                <div className="absolute left-0 -bottom-1 w-1/2 h-1 bg-[#d93025]"></div>
            </h2>
            <div className="max-w-2xl bg-gray-50 p-8 rounded-2xl border border-gray-100">
                <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Full Name" className="w-full px-4 py-2 border rounded focus:ring-1 focus:ring-[#242171] outline-none" />
                        <input type="email" placeholder="Email Address" className="w-full px-4 py-2 border rounded focus:ring-1 focus:ring-[#242171] outline-none" />
                    </div>
                    <input type="text" placeholder="Subject" className="w-full px-4 py-2 border rounded focus:ring-1 focus:ring-[#242171] outline-none" />
                    <textarea placeholder="Message" rows={4} className="w-full px-4 py-2 border rounded focus:ring-1 focus:ring-[#242171] outline-none"></textarea>
                    <button className="bg-[#242171] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#1a1a5e] transition-colors">Submit Enquiry</button>
                </form>
            </div>
        </div>
    );
}
