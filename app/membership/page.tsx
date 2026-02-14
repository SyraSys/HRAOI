export default function Membership() {
    return (
        <div className="bg-white min-h-screen container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-[#1a1a5e] mb-8 inline-block relative px-1">
                Membership
                <div className="absolute left-0 -bottom-1 w-1/2 h-1 bg-[#d93025]"></div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-[#242171]">Join HRAI</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Become a part of the largest human rights network in India. Together we can fight against atrocities and ensure justice for all.
                    </p>
                    <div className="bg-[#242171] text-white p-8 rounded-2xl transform transition-transform hover:scale-105 cursor-pointer">
                        <h4 className="text-2xl font-black italic transform -skew-x-12 mb-2">ONLINE MEMBERSHIP</h4>
                        <p className="text-xs opacity-80">Click here to fill the registration form</p>
                    </div>
                </div>
                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                    <h4 className="font-bold mb-4">Membership Benefits</h4>
                    <ul className="space-y-3 text-sm text-gray-700">
                        <li className="flex gap-2"><span>✅</span> Official Identity Card</li>
                        <li className="flex gap-2"><span>✅</span> Participation in NGO Events</li>
                        <li className="flex gap-2"><span>✅</span> Support in Human Rights Issues</li>
                        <li className="flex gap-2"><span>✅</span> Networking with Activists</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
