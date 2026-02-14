export default function Orders() {
    return (
        <div className="bg-white min-h-screen container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-[#1a1a5e] mb-8 inline-block relative px-1">
                Orders
                <div className="absolute left-0 -bottom-1 w-1/2 h-1 bg-[#d93025]"></div>
            </h2>
            <div className="space-y-4">
                <p className="text-gray-600 italic">Latest judicial and organizational orders will be updated here.</p>
                {[1, 2].map(i => (
                    <div key={i} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700">Official Order Ref: {i}/2024</span>
                        <button className="text-[#242171] font-bold text-xs uppercase hover:underline">View Order</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
