import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import NavBar from "../Components/Admin/navBar";
import ContentPages from "../Components/Admin/content";
import React, { useEffect, useState } from "react";
import AdminAvatar from "../Components/Admin/avatar";
import "../Components/Admin/navbar.css";

const { Header, Content, Sider, Footer } = Layout;

const AdminHomePage = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    } else if (user.role === "user") {
      navigate("/403-error");
    }
  }, []);

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} trigger={null}>
          <NavBar collapsed={collapsed} />
        </Sider>
        <Layout>
          <Header
            style={{
              backgroundColor: "#fff",
              padding: "0 1rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "menu-item",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
            <div>
              <AdminAvatar />
              {user.username}
            </div>
          </Header>
          <Content style={{ margin: "0 1rem" }}>
            {location.pathname === "/admin" && <ContentPages />}
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            ©2023 Created by Đàm Trọng Ngọc Hà - B20DCCN211
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminHomePage;
