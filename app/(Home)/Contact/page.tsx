"use client";

import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    // Logic form handling sẽ được thêm vào đây
    const handleSubmit = (e) => {
        e.preventDefault();
        // Thay thế alert() bằng modal hoặc toast message trong môi trường thực tế
        alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <main className="max-w-5xl mx-auto px-6 py-16">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
                    Chúng tôi luôn sẵn lòng lắng nghe
                </h1>
                <p className="text-xl text-gray-600 mb-10 border-b pb-4">
                    Vui lòng điền vào biểu mẫu dưới đây hoặc liên hệ trực tiếp qua thông tin.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* Cột 1: Contact Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <h2 className="text-2xl font-bold text-blue-700 mb-4">Thông tin liên hệ</h2>
                        
                        <div className="flex items-start space-x-3 text-gray-700">
                            <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                            <div>
                                <p className="font-semibold">Email Hỗ trợ</p>
                                <p className="text-sm">support@coursedan.vn</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 text-gray-700">
                            <Phone className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                            <div>
                                <p className="font-semibold">Hotline</p>
                                <p className="text-sm">(024) 123 4567</p>
                            </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 text-gray-700">
                            <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                            <div>
                                <p className="font-semibold">Địa chỉ VP</p>
                                <p className="text-sm">Tầng 5, Tòa nhà Innovation Hub, Hà Nội, Việt Nam.</p>
                            </div>
                        </div>
                        
                        <div className="pt-4 border-t border-gray-200">
                            <h3 className="font-semibold text-blue-700 mb-1">Thời gian làm việc</h3>
                            <p className="text-sm text-gray-600">Thứ Hai - Thứ Sáu: 8:30 AM - 5:30 PM (VN)</p>
                        </div>
                    </div>

                    {/* Cột 2: Contact Form */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-2xl border">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Gửi tin nhắn cho chúng tôi</h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Họ và Tên</label>
                                    <input type="text" id="name" required className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" id="email" required className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500" />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                                <input type="text" id="subject" required className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500" />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Nội dung chi tiết</label>
                                <textarea id="message" rows={5} required className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500 resize-none"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-lg">
                                Gửi tin nhắn
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}