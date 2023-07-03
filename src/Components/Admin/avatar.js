import { Avatar, Dropdown, Modal, Form } from "antd";
import {
  LoginOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const AdminAvatar = () => {
  const [modal, contextHolder] = Modal.useModal();
  const navigate = useNavigate();
  const isLogin = JSON.parse(localStorage.getItem("user")) !== null;

  const itemsDropdown = [
    {
      key: "2",
      label: isLogin ? "Logout" : "Login",
      icon: isLogin ? <LogoutOutlined /> : <LoginOutlined />,
    },
  ];

  const handleClickDropdownItem = (item) => {
    if (item.key === "2" && isLogin) {
      modal.confirm({
        title: "Đăng xuất",
        content: "Bạn muốn đăng xuất?",
        icon: <ExclamationCircleOutlined />,
        onOk: () => {
          window.localStorage.clear();
          navigate("/admin");
        },
      });
    } else if (item.key === "2" && !isLogin) {
      navigate("/login");
    }
  };

  return (
    <>
      {contextHolder}
      <Dropdown
        menu={{
          items: itemsDropdown,
          selectable: true,
          onClick: handleClickDropdownItem,
        }}
      >
        <Avatar
          size="large"
          style={{
            marginTop: "0.9rem",
          }}
          src={
            isLogin
              ? "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-Facebook.jpg?resize=560%2C560&ssl=1"
              : ""
          }
          icon={!isLogin ? <UserOutlined /> : null}
        />
      </Dropdown>
    </>
  );
};

export default AdminAvatar;
