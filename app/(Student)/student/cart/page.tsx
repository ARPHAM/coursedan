"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Trash2, Heart } from "lucide-react";

// Dữ liệu giả lập ban đầu
const initialCourses = [
  {
    id: 1,
    title: "Thành thạo Docker - Kubernetes trong 8 giờ - 2024",
    author: "Bởi Hieu Nguyen",
    imageUrl:
      "https://digitallearning.eletsonline.com/wp-content/uploads/2019/03/Online-courses.jpg",
    rating: 4.7,
    reviews: 344,
    duration: "11 giờ 30 phút",
    lectures: "94 bài giảng",
    level: "Tất cả trình độ",
    newPrice: 419000,
    oldPrice: 2620000,
    discount: "80%",
  },
  {
    id: 2,
    title: "Lập trình ReactJS từ cơ bản đến nâng cao",
    author: "Bởi Nam Tran",
    imageUrl:
      "https://digitallearning.eletsonline.com/wp-content/uploads/2019/03/Online-courses.jpg",
  
    rating: 4.8,
    reviews: 512,
    duration: "9 giờ 15 phút",
    lectures: "82 bài giảng",
    level: "Cơ bản đến nâng cao",
    newPrice: 359000,
    oldPrice: 1799000,
    discount: "80%",
  },
];

// Hàm định dạng tiền tệ VNĐ
const formatCurrency = (value) =>
  value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

export default function CartPage() {
  const [cartCourses, setCartCourses] = useState(initialCourses);

  // Xử lý xóa khóa học
  const handleRemove = (id) => {
    const updated = cartCourses.filter((course) => course.id !== id);
    setCartCourses(updated);
  };

  // Tổng giá
  const total = cartCourses.reduce((sum, c) => sum + c.newPrice, 0);

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Giỏ hàng</h1>

        {cartCourses.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-2xl font-semibold text-gray-600 mb-4">
              Giỏ hàng của bạn đang trống 😢
            </p>
            <Link href="/">
              <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition">
                Tiếp tục mua sắm
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* === DANH SÁCH KHÓA HỌC === */}
            <div className="lg:w-2/3">
              <h2 className="text-lg font-semibold mb-4">
                {cartCourses.length} khóa học trong giỏ hàng
              </h2>

              {cartCourses.map((course) => (
                <div
                  key={course.id}
                  className="border-b border-gray-200 py-6 flex flex-col sm:flex-row gap-4"
                >
                  {/* Ảnh khóa học */}
                  <div className="w-full sm:w-40 shrink-0">
                    <Image
                      src={course.imageUrl}
                      alt={course.title}
                      width={160}
                      height={90}
                      className="w-full h-auto object-cover rounded-md"
                    />
                  </div>

                  {/* Thông tin khóa học */}
                  <div className="grow">
                    <h3 className="font-bold text-lg">{course.title}</h3>
                    <p className="text-sm text-gray-600">{course.author}</p>

                    <div className="flex items-center gap-1 mt-1 text-sm">
                      <span className="font-bold text-orange-500">
                        {course.rating}
                      </span>
                      <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                      <span className="text-gray-500">
                        ({course.reviews} đánh giá)
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                      {course.duration} • {course.lectures} • {course.level}
                    </p>
                  </div>

                  {/* Giá & nút hành động */}
                  <div className="flex flex-row sm:flex-col items-start sm:items-end justify-between gap-4 sm:gap-3">
                    <p className="text-blue-600 font-bold text-lg">
                      {formatCurrency(course.newPrice)}
                    </p>

                    <div className="flex flex-row sm:flex-col items-end gap-3">
                      <button
                        onClick={() => handleRemove(course.id)}
                        className="text-sm text-red-600 hover:underline flex items-center gap-1"
                      >
                        <Trash2 size={14} /> Xóa
                      </button>
                      <button className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                        <Heart size={14} /> Lưu để mua sau
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* === THANH TOÁN === */}
            <div className="lg:w-1/3">
              <div className="p-6 border border-gray-200 rounded-md shadow-md bg-gray-50 sticky top-24">
                <p className="text-black-600 text-lg">Tổng:</p>
                <p className="text-4xl font-bold text-gray-900 mb-2">
                  {formatCurrency(total)}
                </p>

                <p className="text-gray-500 text-sm">
                  {cartCourses.length} khóa học • Giảm giá siêu ưu đãi
                </p>

                <Link href="/checkout">
                  <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-md mt-4 hover:bg-blue-700 transition-colors">
                    Tiến hành thanh toán
                  </button>
                </Link>

                <p className="text-xs text-gray-500 text-center mt-2">
                  Bạn sẽ không bị tính phí ngay bây giờ
                </p>

                <div className="my-6 border-t border-gray-300"></div>

                <button className="w-full bg-transparent text-gray-800 font-bold py-3 rounded-md border border-gray-800 hover:bg-gray-100 transition-colors">
                  Áp dụng coupon
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
