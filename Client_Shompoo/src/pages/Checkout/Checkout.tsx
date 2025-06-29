// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { getUserById } from "services/user/user.service";
// import type { ICartItem } from "types/cart";
// import type { IUser } from "types/user";

// function Checkout() {
//     const location = useLocation();

//     const navigate = useNavigate();

//     const selectedItems: ICartItem[] = location.state?.selectedItems || [];

//     const [userForm, setUserForm] = useState<IUser | null>(null);
//     const [loading, setLoading] = useState(true);

//     const [couponCode, setCouponCode] = useState("");
//     const [coupon, setCoupon] = useState<any>(null);
//     const [couponError, setCouponError] = useState<string | null>(null);

//     const [paymentMethod, setPaymentMethod] = useState("cod");

//     const [note, setNote] = useState("");

//     const [createdOrder, setCreatedOrder] = useState<any>(null);   //Ko cần xóa createadOrder vì nó chỉ dùng để tạo dữ liệu id đơn hàng (Mã đơn hàng)


//     const isFromCart: boolean = location.state?.isFromCart || false;

//     const [formErrors, setFormErrors] = useState({
//         full_name: "",
//         phone: "",
//         address: "",
//     });

// useEffect(() => {
//   const fetchUser = async () => {
//     try {
//       const userString = localStorage.getItem("user");
//       if (!userString) {
//         setLoading(false);
//         return;
//       }

//       const userParsed = JSON.parse(userString);
//       const userId = userParsed._id;

//       const user = await getUserById(userId);
// console.log("✅ Dữ liệu user:", user);

//       // ✅ Đảm bảo có ít nhất 1 địa chỉ
//       if (!user.addresses || !user.addresses.length) {
//         user.addresses = [{ address: "", city: "", country: "" }];
//       }

//       setUserForm(user);
//     } catch (error) {
//       console.error("Không thể lấy thông tin người dùng:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchUser();
// }, []);


//   const validateForm = () => {
//   const errors = { full_name: "", phone: "", address: "" };
//   let isValid = true;

//   if (!userForm?.fullname?.trim()) {
//     errors.full_name = "Vui lòng nhập họ tên.";
//     isValid = false;
//   }

//   const phoneRegex = /^(0|\+84)(3[2-9]|5[689]|7[06-9]|8[1-9]|9[0-9])[0-9]{7}$/;
//   if (!userForm?.phone?.trim() || !phoneRegex.test(userForm.phone)) {
//     errors.phone = "Số điện thoại không hợp lệ.";
//     isValid = false;
//   }

//   const address = userForm?.addresses?.[0];
//   if (!address?.address?.trim() || !address?.city?.trim() || !address?.country?.trim()) {
//     errors.address = "Vui lòng nhập đầy đủ địa chỉ, thành phố và quốc gia.";
//     isValid = false;
//   }

//   setFormErrors(errors);
//   return isValid;
// };


//     const deliveryCharges = 32000;

//     // const handleApplyCoupon = async () => {
//     //     try {
//     //         setCouponError(null);
//     //         const result = await validateCouponForUser(couponCode.trim());
//     //         if (result.valid) {
//     //             setCoupon(result.data);
//     //         } else {
//     //             setCoupon(null);
//     //             setCouponError(result.message || "Mã không hợp lệ.");
//     //         }
//     //     } catch (error: any) {
//     //         const errMessage = error?.message || "Không thể áp dụng mã giảm giá.";
//     //         setCoupon(null);
//     //         setCouponError(errMessage);
//     //     }
//     // };


//     const formatVND = (value: number) =>
//         new Intl.NumberFormat("vi-VN", {
//             style: "currency",
//             currency: "VND",
//         }).format(value);

// const calculatePrice = (item: ICartItem) => {
//   const variant = typeof item.variant_id === "object" && item.variant_id !== null ? item.variant_id : null;

//   const discountPrice = variant?.discount_price;
//   const originalPrice = variant?.price || 0;
//   const price = discountPrice && discountPrice < originalPrice ? discountPrice : originalPrice;

//   return { price, originalPrice };
// };

//     const totalAmount = selectedItems.reduce((sum, item) => {
//         const { price } = calculatePrice(item);
//         return sum + price * item.quantity;
//     }, 0);

//     //Tính giá mã có type percent là giảm giá % lấy theo maxDiscount
//     const calculateDiscount = () => {
//         if (!coupon) return 0;

//         if (coupon.discount_type === "percent") {
//             const percentDiscount = Math.floor((totalAmount * coupon.discount_value) / 100);
//             return coupon.max_discount ? Math.min(percentDiscount, coupon.max_discount) : percentDiscount;
//         }

//         return coupon.max_discount
//             ? Math.min(coupon.discount_value, coupon.max_discount)
//             : coupon.discount_value;
//     };


//     const discountAmount = calculateDiscount();
//     const finalTotal = totalAmount + deliveryCharges - discountAmount;

// const handleCheckout = async () => {
//   if (!validateForm()) return;
//   if (!userForm || !userForm._id) return;

//   try {
//     const orderData = {
//       user_id: userForm._id,

//       items: selectedItems.map((item) => {
//         const product = typeof item.product_id === "string" ? null : item.product_id;
//         const variant = typeof item.variant_id === "string" ? null : item.variant_id;
//         const { price } = calculatePrice(item);

//         return {
//           product_id: product?._id,
//           variant_id: variant?._id,
//           quantity: item.quantity,
//           price,
//         };
//       }),

//       payment_method: paymentMethod === "cod" ? "cash_on_delivery" : "online",
//       payment_status: "pending",
//       order_status: "pending",
//       total_amount: finalTotal,

//       shipping_address: {
//         address: userForm.addresses?.[0]?.address || "",
//         city: userForm.addresses?.[0]?.city || "",
//         country: userForm.addresses?.[0]?.country || "",
//       },
//     };

//     console.log("🟢 Gửi đơn hàng:", orderData);

//     // Gọi API thật
//     // const res = await createOrder(orderData);
//     // setCreatedOrder(res.data);
//     // navigate("/user/order", { replace: true });

//   } catch (error) {
//     console.error("Lỗi khi tạo đơn hàng:", error);
//   }
// };


//     if (loading) return <p>Đang tải...</p>;
//     if (selectedItems.length === 0) return <p>Không có sản phẩm nào được chọn.</p>;
//     return (
//         <div>
//             <div className="max-w-6xl mx-auto space-y-6">
//                 <div className="flex flex-col lg:flex-row bg-[#f8f9ff] rounded-md p-6">
//                     <div className="max-w-7xl mx-auto px-4 py-8">
//                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                             {/* Danh sách sản phẩm */}
//                             <div className="space-y-6">
//                                 <h2 className="text-lg font-semibold text-gray-800">Đơn hàng của bạn</h2>
//                                 {selectedItems.map((item, index) => {
//                                     const product = typeof item.product_id === "string" ? null : item.product_id;
//                                     const variant = typeof item.variant_id === "string" ? null : item.variant_id;
//                                     const { price, originalPrice } = calculatePrice(item);
//                                     const image = variant?.image || product?.images?.[0] || "/no-image.png";
//                                     const name = product?.name || "Sản phẩm";
//                                     const color = variant?.color || "Không rõ";
//                                     const size = variant?.size || "Không rõ";

//                                     return (
//                                         <div key={index} className="flex gap-4 bg-white p-4 rounded-xl border shadow-sm hover:shadow-md">
//                                             <img src={image} alt={name} className="w-20 h-20 object-cover rounded-lg border" />
//                                             <div className="flex-1 text-sm">
//                                                 <h3 className="font-medium text-gray-900">{name}</h3>
//                                                 <p className="text-xs text-gray-500">Màu: {color} | Size: {size}</p>
//                                                 <p className="text-xs text-gray-500">Số lượng: {item.quantity}</p>
//                                                 <div className="flex gap-2 pt-1">
//                                                     {price < originalPrice && (
//                                                         <span className="line-through text-xs text-gray-400">{formatVND(originalPrice)}</span>
//                                                     )}
//                                                     <span className="text-sm font-semibold text-gray-900">{formatVND(price)}</span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     );
//                                 })}
//                             </div>

//                             {/* Phiếu thanh toán */}
//                             <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-md space-y-6">
//                                 <h2 className="text-lg font-semibold text-gray-800">Tóm tắt đơn hàng</h2>

//                                 <div className="space-y-3 text-sm text-gray-700">
//                                     <div className="flex justify-between">
//                                         <span>Tạm tính</span>
//                                         <span>{formatVND(totalAmount)}</span>
//                                     </div>
//                                     <div className="flex justify-between">
//                                         <span>Phí vận chuyển</span>
//                                         <span>{formatVND(deliveryCharges)}</span>
//                                     </div>
//                                     {coupon && (
//                                         <div className="flex justify-between text-green-600 font-medium">
//                                             <span>Giảm giá ({coupon.code})</span>
//                                             <span>-{formatVND(discountAmount)}</span>
//                                         </div>
//                                     )}
//                                 </div>

//                                 <div className="border-t pt-4 flex justify-between font-bold text-gray-900 text-base">
//                                     <span>Tổng thanh toán</span>
//                                     <span>{formatVND(finalTotal)}</span>
//                                 </div>

//                                 <button onClick={handleCheckout} className="w-full mt-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition text-sm font-semibold">
//                                     Thanh toán
//                                 </button>-

//                                 {/* <div className="mt-6 space-y-2">
//                                     <span className="text-gray-500 text-sm">Thêm mã khuyến mãi:</span>
//                                     <div className="flex items-center gap-2 mt-2">
//                                         <input
//                                             type="text"
//                                             placeholder="Nhập mã"
//                                             value={couponCode}
//                                             onChange={(e) => setCouponCode(e.target.value)}
//                                             className="border rounded px-3 py-1 w-44 focus:outline-none focus:ring-2 focus:ring-green-500"
//                                         />
//                                         <button
//                                             onClick={handleApplyCoupon}
//                                             className="bg-green-600 text-white text-[11px] px-2 py-1 rounded-sm hover:bg-green-700 transition"
//                                         >
//                                             Áp dụng
//                                         </button>
//                                     </div>
//                                     {coupon && (
//                                         <p className="text-green-600 text-sm">
//                                             Đã áp dụng mã <strong>{coupon.code}</strong>: Giảm {formatVND(calculateDiscount())}
//                                             {coupon.discount_type === "percent" && (
//                                                 <span className="text-gray-500"> ({coupon.discount_value}% tối đa {formatVND(coupon.max_discount)})</span>
//                                             )}
//                                         </p>

//                                     )}
//                                     {couponError && <p className="text-red-500 text-sm">{couponError}</p>}
//                                 </div> */}



//                             </div>
//                         </div>
//                     </div>

//                 <div className="lg:w-1/2 flex justify-center items-center mt-6 lg:mt-0">
//   <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm space-y-3 text-sm text-gray-700">
//     <h2 className="text-lg font-semibold text-gray-800 mb-3">Thông tin người nhận</h2>

//     {userForm ? (
//       <>
//         {/* Họ tên */}
//         <div>
//           <label className="font-medium block mb-1">Họ tên:</label>
//           <input
//             type="text"
//             value={userForm.fullname || ""}
//             onChange={(e) =>
//               setUserForm({ ...userForm, fullname: e.target.value })
//             }
//             className="w-full border border-gray-300 rounded-md px-3 py-2"
//           />
//           {formErrors.full_name && (
//             <p className="text-red-500 text-xs mt-1">{formErrors.full_name}</p>
//           )}
//         </div>

//         {/* Số điện thoại */}
//         <div>
//           <label className="font-medium block mb-1">SĐT:</label>
//           <input
//             type="tel"
//             value={userForm.phone || ""}
//             onChange={(e) =>
//               setUserForm({ ...userForm, phone: e.target.value })
//             }
//             className="w-full border border-gray-300 rounded-md px-3 py-2"
//           />
//           {formErrors.phone && (
//             <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
//           )}
//         </div>

//         {/* Địa chỉ, Thành phố, Quốc gia */}
//         {(() => {
//           const address = userForm.addresses?.[0] || { address: "", city: "", country: "" };
//           return (
//             <>
//               <div className="mb-4">
//                 <label className="font-medium block mb-1">Địa chỉ:</label>
//                 <input
//                   type="text"
//                   value={address.address || ""}
//                   onChange={(e) => {
//                     const updatedAddresses = [...(userForm.addresses || [{}])];
//                     updatedAddresses[0] = {
//                       ...updatedAddresses[0],
//                       address: e.target.value,
//                     };
//                     setUserForm({ ...userForm, addresses: updatedAddresses });
//                   }}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="font-medium block mb-1">Thành phố:</label>
//                 <input
//                   type="text"
//                   value={address.city || ""}
//                   onChange={(e) => {
//                     const updatedAddresses = [...(userForm.addresses || [{}])];
//                     updatedAddresses[0] = {
//                       ...updatedAddresses[0],
//                       city: e.target.value,
//                     };
//                     setUserForm({ ...userForm, addresses: updatedAddresses });
//                   }}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="font-medium block mb-1">Quốc gia:</label>
//                 <input
//                   type="text"
//                   value={address.country || ""}
//                   onChange={(e) => {
//                     const updatedAddresses = [...(userForm.addresses || [{}])];
//                     updatedAddresses[0] = {
//                       ...updatedAddresses[0],
//                       country: e.target.value,
//                     };
//                     setUserForm({ ...userForm, addresses: updatedAddresses });
//                   }}
//                   className="w-full border border-gray-300 rounded-md px-3 py-2"
//                 />
//               </div>
//             </>
//           );
//         })()}
//       </>
//     ) : (
//       <p className="italic text-gray-400">Đang tải thông tin người dùng...</p>
//     )}
//   </div>
// </div>


//                 </div>
//                 {/* Bottom left section */}
//                 <div className="max-w-md space-y-4">
//                     <div className="bg-[#f8f9ff] rounded-md p-4 text-xs text-gray-700">
//                         <h3 className="font-semibold mb-2">
//                             Phương thức thanh toán
//                         </h3>
//                         <p className="mb-1">
//                             Vui lòng chọn phương thức thanh toán ưa thích để sử dụng với đơn hàng này.
//                         </p>
//                         <label className="flex items-center space-x-2 mb-2 cursor-pointer">
//                             <input
//                                 type="radio"
//                                 name="payment"
//                                 value="cod"
//                                 checked={paymentMethod === "cod"}
//                                 onChange={(e) => setPaymentMethod(e.target.value)}
//                                 className="w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500"
//                             />
//                             <span className="text-xs">Tiền mặt khi giao hàng</span>
//                         </label>

//                         <p className="mb-2">
//                             Thêm bình luận về đơn hàng của bạn
//                         </p>
//                         <textarea
//                             className="w-full rounded border border-gray-300 p-2 text-xs resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
//                             placeholder="Comments"
//                             rows={3}
//                             value={note}
//                             onChange={(e) => setNote(e.target.value)}
//                         />
//                         <p className="mt-2 text-[10px] text-gray-400">
//                             Tôi đã đọc và đồng ý với Điều khoản &amp; Điều kiện.
//                         </p>
//                     </div>
//                     <div className="bg-[#f8f9ff] rounded-md p-4 text-xs text-gray-700">
//                         <h3 className="font-semibold mb-2">
//                             Payment Method
//                         </h3>
//                         <div className="flex items-center space-x-3">
//                             <img alt="Visa credit card logo" className="h-6 object-contain" height={24} src="https://storage.googleapis.com/a1aa/image/63719734-9fd4-4a47-b853-7f60ecc22e59.jpg" width={40} />
//                             <img alt="Mastercard credit card logo" className="h-6 object-contain" height={24} src="https://storage.googleapis.com/a1aa/image/aa799d13-9fec-4cfd-e671-11f16f87cd15.jpg" width={40} />
//                             <img alt="Paypal payment logo" className="h-6 object-contain" height={24} src="https://storage.googleapis.com/a1aa/image/d8d82665-6995-4961-fc8e-d118ea9a632e.jpg" width={40} />
//                             <img alt="Skil payment logo" className="h-6 object-contain" height={24} src="https://storage.googleapis.com/a1aa/image/a9ebe714-6bc9-467f-d668-7a7aee61d3e7.jpg" width={40} />
//                             <img alt="Visa credit card logo" className="h-6 object-contain" height={24} src="https://storage.googleapis.com/a1aa/image/63719734-9fd4-4a47-b853-7f60ecc22e59.jpg" width={40} />
//                         </div>
//                     </div>
//                 </div>
//             </div>

        

//         </div>

//     )

// }

// export default Checkout;

