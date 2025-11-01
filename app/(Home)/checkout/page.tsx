"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();

  // Dữ liệu khóa học giả lập (từ giỏ hàng)
  const course = {
    title: "Thành thạo Docker - Kubernetes trong 8 giờ - 2024",
    author: "Bởi Hieu Nguyen",
    imageUrl:
      "https://digitallearning.eletsonline.com/wp-content/uploads/2019/03/Online-courses.jpg",
    newPrice: "419.000 đ",
    oldPrice: "2.129.000 đ",
    discount: "80%",
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">

        {/* --- FORM THANH TOÁN --- */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Thanh toán</h2>

          {/* Quốc gia */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Quốc gia</label>
            <select className="w-full border border-gray-300 rounded-md p-2">
              <option>Việt Nam</option>
              <option>Hoa Kỳ</option>
              <option>Nhật Bản</option>
            </select>
          </div>

          {/* Phương thức thanh toán */}
          <h3 className="font-semibold text-lg mt-6 mb-2">Phương thức thanh toán</h3>

          <div className="space-y-4">
            <div className="flex items-center">
              <input type="radio" name="payment" defaultChecked className="mr-2" />
              <label className="font-medium">Thẻ (Visa / Master / JCB)</label>
            </div>

            {/* Form nhập thẻ */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              <input
                type="text"
                placeholder="Số thẻ"
                className="col-span-2 border p-2 rounded-md"
              />
              <input type="text" placeholder="MM/YY" className="border p-2 rounded-md" />
              <input type="text" placeholder="CVC/CVV" className="border p-2 rounded-md" />
              <input
                type="text"
                placeholder="Tên trên thẻ"
                className="col-span-2 border p-2 rounded-md"
              />
            </div>

            <div className="flex items-center mt-3">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-600">
                Lưu thẻ này cho giao dịch mua hàng sau này của tôi
              </span>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <button className="border p-2 rounded-md hover:bg-gray-100 text-left">
                Google Pay
              </button>
              <button className="border p-2 rounded-md hover:bg-gray-100 text-left">
                PayPal
              </button>
            </div>
          </div>
        </div>

        {/* --- TÓM TẮT ĐƠN HÀNG --- */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-3">Tóm tắt đơn đặt hàng</h3>

          <div className="flex gap-4 items-center mb-4">
            <Image
              src={course.imageUrl}
              alt={course.title}
              width={100}
              height={60}
              className="rounded-md"
            />
            <div>
              <p className="font-semibold">{course.title}</p>
              <p className="text-sm text-gray-500">{course.author}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 my-4"></div>

          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span>Giá gốc</span>
              <span className="line-through">{course.oldPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Chiết khấu (Giảm {course.discount})</span>
              <span>-1.710.000 đ</span>
            </div>
            <div className="border-t border-gray-300 my-2"></div>
            <div className="flex justify-between font-bold text-lg">
              <span>Tổng tiền</span>
              <span>{course.newPrice}</span>
            </div>
          </div>

          <button
            onClick={() => router.push("/success")}
            className="w-full bg-purple-600 text-white py-3 mt-6 rounded-md font-bold hover:bg-purple-700 transition"
          >
            Thanh toán {course.newPrice}
          </button>

          <p className="text-xs text-gray-500 mt-2 text-center">
            Đảm bảo hoàn tiền trong 30 ngày
          </p>
        </div>
      </div>
    </div>
  );
}
