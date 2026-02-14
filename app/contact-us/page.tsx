export default function ContactUs() {
    return (
        <div className="bg-white min-h-screen container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-[#1a1a5e] mb-8 inline-block relative px-1">
                Contact Us
                <div className="absolute left-0 -bottom-1 w-1/2 h-1 bg-[#d93025]"></div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div>
                        <h3 className="text-lg font-bold text-[#242171] mb-4">Head Office</h3>
                        <p className="text-gray-600 space-y-2 text-sm">
                            Address: 45 D, Amar Plaza, Hasanpur Main Road,<br />
                            I.P. Extention, Delhi - 110092<br />
                            Phone: 011- 32405800
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-[#242171] mb-4">Email Directory</h3>
                        <ul className="text-sm text-gray-600 space-y-2 font-mono">
                            <li>president@hrai.co.in</li>
                            <li>info@hrai.co.in</li>
                            <li>hrai_dli@yahoo.com</li>
                        </ul>
                    </div>
                </div>
                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                    <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 font-bold italic">
                        Google Maps Location Placeholder
                    </div>
                </div>
            </div>
        </div>
    );
}
