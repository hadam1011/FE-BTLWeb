import { Button, Popconfirm, Table, notification, Modal, Form, Input, DatePicker, Select} from "antd";
import { useEffect, useState } from "react";

const Accounts = () => {
    const [userList, setUserList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [date, setDate] = useState("");
    const [api, contextHolder] = notification.useNotification();
    const [form] = Form.useForm();
    const isLogin = JSON.parse(localStorage.getItem("user")) !== null;
    const dateFormat = 'YYYY/MM/DD';

    const callApi = async () => {
        const response = await fetch('http://localhost:8080/users');
        let data = await response.json();
        setUserList(data);
    }

    useEffect(() => {
        callApi();
    }, []);

    const handleDelete = (record) => {
        var options = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
        };

        const fetchDelete = async () => {
            const response = await fetch(`http://localhost:8080/user/${record.id}`, options);
            await callApi();
            api["success"]({
                message: "Thành công",
                description: "Xóa tài khoản thành công",
            });
        }
        fetchDelete();
    }

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password'
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Date of birth',
            dataIndex: 'dob',
            key: 'dob'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => {
                return (
                    isLogin && 
                    <Popconfirm
                        title="Xóa tài khoản này?"
                        onConfirm={() => handleDelete(record)}
                    >
                        <Button danger type="primary">Delete</Button>
                    </Popconfirm>
                )
            }
        }
    ]

    const handleAddAccount = (value) => {
        const data = {
            username: value.username,
            password: value.password,
            role: value.role,
            email: value.email,
            dob: date
        }

        var options = {
            method: "POST" ,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const fetchCreate = async () => {
            const response = await fetch('http://localhost:8080/user', options);
            api["success"]({
                message: "Thành công",
                description: "Thêm tài khoản thành công",
            });
            await callApi();
        }
        fetchCreate();
    }

    const handleDate = (date, dateString) => {
        setDate(dateString.replace(/\//g, "-"));          
    }

    return (
        <>
            {contextHolder}
            <Button
                type="primary"
                style={{ margin: '1em 0' }}
                onClick={() => setIsOpen(true)}
            >
                Add Account
            </Button>
            <Table
                rowKey={(record) => record.id}
                columns={columns}
                dataSource={userList}
                pagination={{
                    hideOnSinglePage: true
                }}
            />
            <Modal
                open={isOpen}
                title="Thêm mới tài khoản"
                onCancel={() => setIsOpen(false)}
                okText="Save"
                onOk={() => {
                    form.validateFields()
                      .then((value) => {
                        handleAddAccount(value);
                          setIsOpen(false);
                          form.resetFields();
                      });
                  }}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Tài khoản: "
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Không được để trống",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Mật khẩu: "
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Không được để trống",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Email: "
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Không được để trống",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Role: "
                        name="role"
                        rules={[
                            {
                                required: true,
                                message: "Không được để trống",
                            },
                        ]}
                    >
                        <Select
                            options={[
                                {
                                    value: 'user',
                                    label: 'user'
                                },
                                {
                                    value: 'manager',
                                    label: 'manager'
                                }
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Ngày sinh: "
                        name="dob"
                        rules={[
                            {
                                required: true,
                                message: "Không được để trống",
                            },
                        ]}
                    >
                        <DatePicker
                            format={dateFormat}
                            onChange={handleDate}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Accounts;