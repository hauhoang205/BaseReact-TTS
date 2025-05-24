import { MailOutlined, AppstoreOutlined, SettingOutlined, UserOutlined, FolderOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';

import React from 'react'
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  type MenuItem = Required<MenuProps>['items'][number];
  const navigate = useNavigate()
  const items: MenuItem[] = [
    {
      key: 'sub1',
      label: 'Dashboard',
      icon: <MailOutlined />
    },
    {
      key: 'sub2',
      label: 'Quản lý sản phẩm',
      icon: <AppstoreOutlined />,
      children: [
        { key: 'productlist', label: 'Danh sách sản phẩm' },
        { key: 'addproduct', label: 'Thêm mới sản phẩm' },
      ],
    },
    {
      key: 'sub3',
      label: 'Quản lý danh mục',
      icon: <FolderOutlined />,
      children: [
        { key: 'categorylist', label: 'Danh sách danh mục' },
        { key: 'addcategory', label: 'Thêm mới danh mục' },
      ],
    },
    {
      key: 'sub5',
      label: 'Quản lý tài khoản',
      icon: <UserOutlined />,
      children: [
        { key: 'userlist', label: 'Danh sách người dùng' },
        { key: 'adminList', label: 'Danh sách admin' },
      ],
    },
    {
      type: 'divider',
    },
    {
  key: 'sub4',
  label: 'Quản lý đơn hàng',
  icon: <SettingOutlined />,
}
  ];

  const onClick: MenuProps['onClick'] = ({key}) => {
      switch(key)
      {
        case "addproduct":
          navigate("/product-add")
          break;
        case "productlist":
          navigate("/product-list") 
          break;

        case "categorylist":
          navigate("/category-list")
          break;
        case "addcategory":
          navigate("/category-add")
          break;

        case "userlist":
          navigate("/user-list")
          break;
        case "adminList":
          navigate("/admin-list")
          break;
        case "sub4": 
          navigate("/order-manage")
          break;
        default:
          navigate("") 
          break;
      }
  };

  return (
    <div className='w-1/5 h-screen bg-white'>
      <Menu
        onClick={onClick}
        style={{ width: '100%' }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
      />
    </div>
  )
}

export default AdminSidebar
