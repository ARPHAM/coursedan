"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Trash2, Heart } from "lucide-react";

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
  },
];

const formatCurrency = (value: number) =>
  value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

export default function CartPage() {
  const [cartCourses, setCartCourses] = useState(initialCourses);
  const total = cartCourses.reduce((s, c) => s + c.newPrice, 0);

  const handleRemove = (id: number) => {
    setCartCourses(cartCourses.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-10">Giỏ hàng</h1>

        {cartCourses.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-2xl font-semibold text-gray-600 mb-6">
              Giỏ hàng của bạn đang trống 😢
            </p>
            <Link href="/">
              <button className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-md shadow-md hover:bg-blue-700 transition">
                Tiếp tục mua sắm
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* LEFT SECTION */}
            <div className="lg:w-2/3">
              <h2 className="text-lg font-semibold mb-4">
                {cartCourses.length} khóa học trong giỏ hàng
              </h2>

              <div className="bg-white rounded-xl shadow p-6 divide-y">
                {cartCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex flex-col md:flex-row gap-5 py-6 first:pt-0 last:pb-0"
                  >
                    {/* Image */}
                    <div className="w-full md:w-40 shrink-0">
                      <Image
                        src={course.imageUrl}
                        alt={course.title}
                        width={160}
                        height={90}
                        className="rounded-lg object-cover shadow-sm"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg hover:text-blue-600 transition cursor-pointer">
                        {course.title}
                      </h3>

                      <p className="text-sm text-gray-600">{course.author}</p>

                      <div className="flex items-center gap-1 mt-1 text-sm">
                        <span className="font-semibold text-orange-500">
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

                    {/* Price + Actions */}
                    <div className="flex flex-col items-end gap-3 justify-between">
                      <p className="text-blue-600 font-bold text-lg">
                        {formatCurrency(course.newPrice)}
                      </p>

                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => handleRemove(course.id)}
                          className="text-red-600 text-sm hover:underline flex gap-1 items-center"
                        >
                          <Trash2 size={14} /> Xóa
                        </button>

                        <button className="text-gray-700 text-sm hover:underline flex gap-1 items-center">
                          <Heart size={14} /> Lưu để mua sau
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SECTION – SUMMARY */}
            <div className="lg:w-1/3">
              <div className="p-6 bg-white shadow-lg rounded-xl sticky top-24">
                <p className="text-lg font-medium">Tổng:</p>

                <p className="text-4xl font-bold text-gray-900 mb-3">
                  {formatCurrency(total)}
                </p>

                <p className="text-sm text-gray-500 mb-6">
                  {cartCourses.length} khóa học • Giảm giá siêu ưu đãi
                </p>

                <Link href="/student/checkout/2">
                  <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition shadow-md">
                    Tiến hành thanh toán
                  </button>
                </Link>

                <p className="text-xs text-gray-500 text-center mt-2">
                  Bạn sẽ không bị tính phí ngay bây giờ
                </p>

                <hr className="my-6" />

                <button className="w-full border border-gray-700 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-100 transition">
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
