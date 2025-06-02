import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState<{ fullname: string } | null>(null);

  useEffect(() => {
    const adminUserStr = localStorage.getItem("adminUser");
    if (adminUserStr) {
      const user = JSON.parse(adminUserStr);
      setAdminUser(user);
    } else {
      setAdminUser(null);
    }
  }, []);

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("adminUser");
  window.location.href = "/admin-login";
};
  
const handleLogout = () => {
  logout();
};


  return (
    <div className="bg-white w-full shadow-md flex p-4 relative z-50">
      <div className="logo w-1/5 font-bold text-xl">Shampoo</div>

      <div className="right-header w-4/5 flex justify-between items-center">
        <form>
          <input
            className="border rounded-md w-[350px] px-2 py-1"
            type="text"
            placeholder="Tìm kiếm"
          />
        </form>

        <div className="flex items-center gap-6">
          {adminUser ? (
            <>
              <ul>
                <li>Xin chào {adminUser.fullname}</li>
              </ul>

              <div
                onClick={handleLogout}
                className="flex items-center space-x-2 cursor-pointer hover:text-gray-900 select-none"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleLogout()}
              >
                <i className="fas fa-sign-out-alt text-[20px]"></i>
                <div className="leading-none">
                  <div>Account</div>
                  <div
                    className="font-semibold text-[13px]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    ĐĂNG XUẤT
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Link to="/admin-login" className="hover:text-gray-900">
              <div className="flex items-center space-x-2 cursor-pointer">
                <i className="fas fa-sign-in-alt text-[20px]"></i>
                <div className="leading-none">
                  <div>Account</div>
                  <div
                    className="font-semibold text-[13px]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    LOGIN
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
