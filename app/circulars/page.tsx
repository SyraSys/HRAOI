export default function Circulars() {
    return (
        <div className="bg-white min-h-screen container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-[#1a1a5e] mb-8 inline-block relative px-1">
                Circulars
                <div className="absolute left-0 -bottom-1 w-1/2 h-1 bg-[#d93025]"></div>
            </h2>
            <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700">Circular No. {2024 + i}/HRAI</span>
                        <button className="text-[#d93025] font-bold text-xs uppercase hover:underline">Download PDF</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
