import React from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  FolderOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* ------------------------------------------------------------------------
   * CẤU HÌNH MENU
   *  - key của MỌI mục con chính là đường dẫn cần điều hướng.
   *  - key của mục cấp cha (submenu) chỉ để nhóm, không navigate trực tiếp.
   * ---------------------------------------------------------------------- */
  const items: MenuProps["items"] = [
    {
      key: "/admin/dashboard",
      icon: <MailOutlined />,
      label: "Dashboard",
    },
    {
      key: "products",
      icon: <AppstoreOutlined />,
      label: "Quản lý sản phẩm",
      children: [
        { key: "/admin/product-list", label: "Danh sách sản phẩm" },
        { key: "/admin/product-add", label: "Thêm mới sản phẩm" },
      ],
    },
    {
      key: "categories",
      icon: <FolderOutlined />,
      label: "Quản lý danh mục",
      children: [
        { key: "/admin/category-list", label: "Danh sách danh mục" },
        { key: "/admin/category-add", label: "Thêm mới danh mục" },
      ],
    },
    {
      key: "accounts",
      icon: <UserOutlined />,
      label: "Quản lý tài khoản",
      children: [
        { key: "/admin/user-list", label: "Danh sách người dùng" },
        { key: "/admin/admin-list", label: "Danh sách admin" },
      ],
    },
    {
      key: "/admin/order-manage",
      icon: <SettingOutlined />,
      label: "Quản lý đơn hàng",
    },
    {
      key: "variants",
      icon: <AppstoreOutlined />,
      label: "Quản lý biến thể",
      children: [
        { key: "/admin/variant-list", label: "Danh sách biến thể" },
        { key: "/admin/variant-add", label: "Thêm mới biến thể" },
        { key: "/admin/variant-trash", label: "Biến thể đã xoá" },
      ],
    },
  ];

  /* ------------------------- Handle click điều hướng ------------------------ */
  const handleClick: MenuProps["onClick"] = ({ key }) => {
    // key chính là route
    navigate(key);
  };

  /* -------------- Tự động mở submenu chứa route hiện tại ------------------- */
  const defaultOpen = items
    .filter(
      (it: any) =>
        it?.children?.some((child: any) => child.key === location.pathname)
    )
    .map((it: any) => it.key);

  return (
    <aside className="w-1/5 h-screen bg-white shadow">
      <Menu
        mode="inline"
        style={{ height: "100%", borderRight: 0 }}
        selectedKeys={[location.pathname]}
        defaultOpenKeys={defaultOpen}
        onClick={handleClick}
        items={items}
      />
    </aside>
  );
};

export default AdminSidebar;
