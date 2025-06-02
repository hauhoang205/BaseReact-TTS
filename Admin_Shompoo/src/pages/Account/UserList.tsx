import { Button, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteUserById, getUserList } from "service/user/user.service";
import type { Address, User } from "types/user";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const perPage = 5;

  const fetchUsers = async (pageNum = page) => {
    try {
      const res: any = await getUserList({ _page: pageNum, _limit: perPage, role: "user" });

      setUsers(Array.isArray(res.data.data) ? res.data.data : []);
      setTotal(typeof res.data.result === "number" ? res.data.result : 0);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleDelete = async (id: string) => {
    try {
      await deleteUserById(id);
      fetchUsers();
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
    }
  };

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Quản lý người dùng</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {[
                "STT",
                "Họ tên",
                "Email",
                "Số điện thoại",
                "Vai trò",
                "Trạng thái",
                "Địa chỉ mặc định",
                "Ngày tạo",
                "Thao tác",
              ].map((header) => (
                <th
                  key={header}
                  className="border px-4 py-3 text-left text-gray-700 font-medium select-none"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-6 text-gray-500">
                  Không có người dùng nào
                </td>
              </tr>
            ) : (
              users.map((user, index) => {
                const defaultAddress = user.addresses?.find(
                  (a) => (a as Address).is_default
                );
                return (
                  <tr
                    key={user._id}
                    className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <td className="border px-4 py-2 align-middle">
                      {(page - 1) * perPage + index + 1}
                    </td>
                    <td className="border px-4 py-2 align-middle">{user.fullname}</td>
                    <td className="border px-4 py-2 align-middle">{user.email}</td>
                    <td className="border px-4 py-2 align-middle">{user.phone || "-"}</td>
                    <td className="border px-4 py-2 align-middle capitalize">{user.role}</td>
                    <td className="border px-4 py-2 align-middle">
                      {user.status ? (
                        <span className="text-green-600 font-medium">Hoạt động</span>
                      ) : (
                        <span className="text-red-500 font-medium">Khóa</span>
                      )}
                    </td>
                    <td className="border px-4 py-2 align-middle">
                      {defaultAddress
                        ? `${defaultAddress.address}, ${defaultAddress.city}, ${defaultAddress.country}`
                        : "Không có"}
                    </td>
                    <td className="border px-4 py-2 align-middle text-gray-600 text-sm">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "Không rõ"}
                    </td>
                    <td className="border px-4 py-2 align-middle">
                      <div className="flex gap-3">
                        <Link
                          to={`/admin/user-edit/${user._id}`}
                          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
                        >
                          Sửa
                        </Link>
                        <Popconfirm
                          title="Bạn có chắc muốn xóa?"
                          okText="Có"
                          cancelText="Không"
                          onConfirm={() => handleDelete(user._id)}
                        >
                          <button className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition font-semibold">
                            Xóa
                          </button>
                        </Popconfirm>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded border ${
              page === i + 1
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserList;
