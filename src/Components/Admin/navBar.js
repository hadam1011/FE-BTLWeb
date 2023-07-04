import { Menu } from "antd";
import React, { useState } from "react";
import { BookOutlined, UserOutlined, AppstoreOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const NavBar = ({ collapsed }) => {
  const [current, setCurrent] = useState("book");
  const navigate = useNavigate();

  const items = [
    {
      label: "Book Management",
      key: "book",
      icon: <BookOutlined />,
    },
    {
      label: "Account Management",
      key: "account",
      icon: <UserOutlined />,
    },
    {
      label: "Category Management",
      key: "category",
      icon: <AppstoreOutlined />,
    },
  ];

  const handleClick = (e) => {
    setCurrent(e.key);
    if (e.key === "book") {
      navigate("/admin");
    } else if (e.key === "account") {
      navigate("/admin/accounts");
    }
  };

  return (
    <>
      <div>
        <UserOutlined
          style={{
            fontSize: "2.5rem",
            color: "white",
            margin: "1rem",
          }}
        />
        {!collapsed && (
          <span style={{ color: "white", fontSize: "1.5rem" }}>Manager</span>
        )}
        <div
          style={{
            width: "100%",
            height: "0.1rem",
            backgroundColor: "white",
            margin: "1rem 0",
          }}
        />
      </div>
      <div>
        <Menu
          onClick={handleClick}
          selectedKeys={[current]}
          mode="inline"
          items={items}
          theme="dark"
        />
      </div>
    </>
  );
};

export default NavBar;
