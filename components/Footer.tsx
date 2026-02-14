export default function Footer() {
    return (
        <footer className="bg-[#242171] text-white py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    <h3 className="text-xl font-bold mb-6 underline decoration-[#d93025] underline-offset-8">About Us</h3>
                    <p className="text-sm text-gray-300 leading-relaxed italic">
                        HRAI is based on the philosophy of HUMAN RIGHTS. "Vasudhav Kutumbakum" (The whole world is family). All human beings are born equal and free.
                    </p>
                    <a href="/about-us" className="text-xs text-white/70 mt-2 block hover:text-white underline">Read more...</a>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-6 underline decoration-[#d93025] underline-offset-8">Contact Us</h3>
                    <div className="text-sm text-gray-300 space-y-1">
                        <p>Address: 45 D, Amar Plaza, Hasanpur Main Road, I.P. Extention, Delhi - 92</p>
                        <p>Phone: 011- 32405800</p>
                        <p>Email: president@hrai.co.in</p>
                        <p>Email: info@hrai.co.in</p>
                        <p>Email: hrai_dli@yahoo.com</p>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-6 underline decoration-[#d93025] underline-offset-8">Visits</h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <div className="bg-red-600 p-2 rounded-full cursor-pointer hover:bg-red-700 transition-colors">Y</div>
                            <div className="bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">f</div>
                            <div className="bg-black p-2 rounded-full cursor-pointer hover:bg-gray-800 transition-colors">X</div>
                        </div>
                        <div className="bg-white/10 p-3 rounded-lg text-xs w-fit">
                            Visitor Counter: <span className="font-bold text-[#d93025]">1,234,567</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center text-[10px] text-gray-400">
                Copyright © 2015 HRAI.CO.IN All Rights Reserved. Powered by <span className="text-[#d93025] font-bold">Hitesh.</span>
            </div>
        </footer>
    );
}
