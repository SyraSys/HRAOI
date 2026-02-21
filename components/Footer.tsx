export default function Footer() {
    return (
        <footer className="bg-primary text-white py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    <h3 className="text-xl font-bold mb-6 underline decoration-secondary underline-offset-8">About Us</h3>
                    <p className="text-sm text-gray-300 leading-relaxed italic">
                        HRAOI is based on the philosophy of HUMAN RIGHTS. "Vasudhav Kutumbakum" (The whole world is family). All human beings are born equal and free.
                    </p>
                    <a href="/about-us" className="text-xs text-white/70 mt-2 block hover:text-white underline">Read more...</a>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-6 underline decoration-secondary underline-offset-8">Contact Us</h3>
                    <div className="text-sm text-gray-300 space-y-1">
                        <p>Address: Road, I.P. Extention, Delhi - 92</p>
                        <p>Phone: 9330977118, 9334246098, 6207394301</p>
                        <p>Email: hraoi.in@gmail.com</p>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-6 underline decoration-secondary underline-offset-8">Visits</h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20 group">
                                <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20 group">
                                <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg shadow-black/20 group">
                                <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                        </div>
                        <div className="bg-white/10 p-3 rounded-lg text-xs w-fit">
                            Visitor Counter: <span className="font-bold text-secondary">1,234,567</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center text-[10px] text-gray-400">
                Copyright © 2026 HRAOI.IN All Rights Reserved. Powered by <span className="text-secondary font-bold">Mr Javed.</span>
            </div>
        </footer>
    );
}
