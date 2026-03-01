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
                            <a href="https://whatsapp.com/channel/0029VbC22xeJkK7AU8LU7z3W" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform group">
                                <img src="/icons/whatsapp.png" alt="WhatsApp" className="w-full h-full object-contain" />
                            </a>
                            <a href="https://youtube.com/@hraoin?si=stSxWXX6XJ-oRlU-" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20 group">
                                <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>
                            <a href="https://www.facebook.com/share/1BnW3kyF73/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20 group">
                                <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/hraoi_n?igsh=MTRuMWV2NzF4ZGlmYw==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors shadow-lg shadow-pink-900/20 group">
                                <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.558.217.957.477 1.376.896.419.419.679.818.896 1.376.163.422.358 1.057.412 2.227.059 1.266.071 1.646.071 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.217.558-.477.957-.896 1.376-.419.419-.818.679-1.376.896-.422.163-1.057.358-2.227.412-1.266.059-1.646.071-4.85.071s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.558-.217-.957-.477-1.376-.896-.419-.419-.679-.818-.896-1.376-.163-.422-.358-1.057-.412-2.227-.059-1.266-.071-1.646-.071-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.217-.558.477-.957.896-1.376.419-.419.818-.679 1.376-.896.422-.163 1.057-.358 2.227-.412 1.266-.059 1.646-.071 4.85-.071M12 0C8.741 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.741 0 12s.012 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126s1.337 1.078 2.126 1.384c.766.296 1.636.499 2.913.558C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384s1.078-1.337 1.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.014-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126s-1.337-1.078-2.126-1.384c-.765-.296-1.636-.499-2.913-.558C15.667.012 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                                </svg>
                            </a>
                        </div>
                        <div className="bg-white/10 p-3 rounded-lg text-xs w-fit">
                            Visitor Counter: <span className="font-bold text-secondary">1,234,567</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto mt-3  pt-3 border-t border-white/10 text-center text-[14px] text-gray-400">
                Copyright © 2015 HRAOI.IN All Rights Reserved. Powered by <span className="text-secondary font-bold">Mr Javed.</span>
            </div>
        </footer>
    );
}
