import React, { useEffect, useRef, useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space, Modal, Form, Select } from 'antd';
import Highlighter from 'react-highlight-words';
import Axios from 'axios';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
function OrderAdmin() {
    const [form] = Form.useForm();
    const [orderList, setOrderList] = useState([]);
    useEffect(() => {
        Axios.get('/admin/order').then((data) => {
            setOrderList(data.data);
        });
    }, []);
    const [data, setData] = useState([]);
    const loadData = () => {
        Axios.get('/admin/order').then((data) => {
            setOrderList(data.data);
        });
        let data1 = [];
        orderList.forEach((item, index) => {
            item.product.forEach((pro) => {
                data1.push({
                    idOrder: item._id,
                    userName: item.name,
                    email: item.email,
                    idProduct: pro.id,
                    productName: pro.name,
                    url: pro.url,
                    price: pro.price,
                    quantity: pro.amount,
                    // size: pro.size,
                    address: item.address,
                    phoneNumber: item.phonenumber,
                    note: item.note,
                    // sizeProduct: pro.size,
                    timeOrder: item.createdAt.slice(0, 19),
                    status: item.status,
                });
            });
        });
        setData(data1);
    };
    useEffect(() => {
        let data1 = [];
        if (orderList.length > 0) {
            orderList.forEach((item, index) => {
                item.product.forEach((pro) => {
                    data1.push({
                        idOrder: item._id,
                        userName: item.name,
                        email: item.email,
                        idProduct: pro.id,
                        productName: pro.name,
                        url: pro.url,
                        price: pro.price,
                        quantity: pro.amount,
                        // size: pro.size,
                        address: item.address,
                        phoneNumber: item.phonenumber,
                        note: item.note,
                        // sizeProduct: pro.size,
                        timeOrder: item.createdAt.slice(0, 19),
                        status: item.status,
                    });
                });
            });
        }
        setData(data1);
    }, [orderList]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const columns = [
        {
            title: 'T??n s???n ph???m',
            dataIndex: 'productName',
            key: 'productName',
            ...getColumnSearchProps('productName'),
            onFilter: (value, record) => record.name.indexOf(value) === 0,
        },
        {
            title: 'H??nh ???nh',
            dataIndex: 'url',
            key: 'url',
            render: (url) => {
                return <img style={{ width: '7rem', height: '7rem' }} alt={url} src={url} />;
            },
        },
        {
            title: 'S??? l?????ng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Gi??',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <span>{price ? price.toLocaleString() : ''}??</span>,
        },
        {
            title: 'T??n ng?????i nh???n',
            dataIndex: 'userName',
            key: 'userName',
            sorter: (a, b) => a.userName.length - b.userName.length,
            sortDirections: ['descend'],
        },
        {
            title: '?????a ch???',
            dataIndex: 'address',
            key: 'address',
            width: '10%',
        },
        {
            title: 'S??? ??i???n tho???i',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Ghi ch??',
            dataIndex: 'note',
            key: 'note',
        },
        {
            title: 'Tr???ng th??i',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                return (
                    <span>
                        {status === 'processing' ? '??ang l???y h??ng' : ''}
                        {status === 'completed' ? '???? nh???n h??ng' : ''}
                        {status === 'refunded' ? 'Ho??n tr???' : ''}
                        {status === 'cancelled' ? '???? h???y' : ''}
                    </span>
                );
            },
        },
        ,
        {
            title: 'Th???i gian ?????t',
            dataIndex: 'timeOrder',
            key: 'timeOrder',
        },
        {
            title: 'H??nh ?????ng',
            dataIndex: 'action',
            key: 'action',
            render: (id, row) => {
                return (
                    <React.Fragment>
                        <Button
                            onClick={() => {
                                modalUpdate(row);
                                setIdOrder(row.idOrder);
                                setIdProduct(row.idProduct);
                                setVisible(true);
                            }}
                            type="primary"
                            icon={<EditOutlined />}
                        >
                            S???a
                        </Button>{' '}
                        <Button
                            type="danger"
                            icon={<DeleteOutlined />}
                            onClick={() => {
                                setModalDel(true);
                                setIdDelete(row.idOrder);
                            }}
                        >
                            X??a
                        </Button>
                    </React.Fragment>
                );
            },
        },
    ];
    //Form
    //update
    const [visible, setVisible] = useState(false);
    const modalUpdate = (info) => {
        form.resetFields();
        form.setFieldsValue({
            name: info.productName,
            url: info.url,
            price: info.price,
            email: info.email,
            address: info.address,
            note: info.note,
            phoneNumber: info.phoneNumber,
            quantity: info.quantity,
            // size: info.size,
            status: info.status,
            username: info.userName,
        });
    };
    const handleCancel = () => {
        setMessage('');
        setVisible(false);
    };
    const [idProduct, setIdProduct] = useState('');
    const [idOrder, setIdOrder] = useState('');
    const [message, setMessage] = useState('');
    const onFinish = (values) => {
        Axios.put('/admin/updateorder', {
            idOrder: idOrder,
            idProduct: idProduct,
            name: values.name,
            url: values.url,
            price: values.price,
            email: values.email,
            address: values.address,
            note: values.note,
            phoneNumber: values.phoneNumber,
            quantity: values.quantity,
            // size: values.size,
            status: values.status,
            username: values.username,
        })
            .then((data) => {
                loadData();
                setMessage(data.data.msg);
            })
            .catch((err) => console.log(err));
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onGenderChange = (value) => {
        if (value) {
            form.setFieldsValue({ status: value });
        }
    };

    //Delete Order
    const [messageDelete, setMessageDelete] = useState('');
    const [idDelete, setIdDelete] = useState('');
    const [modalDel, setModalDel] = useState(false);
    const hideModal = () => {
        setModalDel(false);
        setMessageDelete('');
    };
    const deleteOrder = () => {
        Axios.delete('/admin/deleteorder', { data: { id: idDelete } })
            .then((data) => {
                setMessageDelete(data.data.msg);
                loadData();
            })
            .catch((err) => setMessageDelete(err));
    };
    const total = () => {
        let a = 0;
        data.map((item) => {
            if (item.status === 'completed') {
                a += item.price * item.quantity;
            }
            return a;
        });
        return a.toLocaleString();
    };
    return (
        <div className="page_admin">
            {/* Modal delete  */}
            <Modal title="B???n c?? ?????ng ?? x??a ?" visible={modalDel} onCancel={hideModal} footer={null}>
                <p style={{ textAlign: 'center', color: 'green', fontSize: '1.3rem' }}>
                    {messageDelete && messageDelete.length > 0 ? (
                        <span>
                            <i className="far fa-check-circle"></i>
                            {messageDelete}
                        </span>
                    ) : (
                        <>
                            <Button type="primary" style={{ marginRight: '1rem' }} onClick={() => deleteOrder()}>
                                ?????ng ??
                            </Button>
                            <Button type="danger" onClick={hideModal}>
                                H???y b???
                            </Button>
                        </>
                    )}
                </p>
            </Modal>
            {/* End Modal delete */}
            <Modal title="S???a th??ng tin ????n h??ng" visible={visible} onCancel={handleCancel} footer={null}>
                <p
                    style={{
                        textAlign: 'center',
                        color: 'green',
                        fontSize: '1.3rem',
                        fontWeight: 600,
                    }}
                >
                    {message}
                </p>
                <Form form={form} {...layout} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Form.Item
                        label="T??n s???n ph???m"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Th??ng tin kh??ng ???????c ????? tr???ng!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="???????ng d???n ???nh"
                        name="url"
                        rules={[
                            {
                                required: true,
                                message: 'Th??ng tin kh??ng ???????c ????? tr???ng!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Gi?? s???n ph???m"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Th??ng tin kh??ng ???????c ????? tr???ng!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="S??? l?????ng"
                        name="quantity"
                        rules={[
                            {
                                required: true,
                                message: 'Th??ng tin kh??ng ???????c ????? tr???ng!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    {/* <Form.Item label="Size" name="size">
                        <Input />
                    </Form.Item> */}
                    <Form.Item
                        label="H??? t??n"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Th??ng tin kh??ng ???????c ????? tr???ng!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Th??ng tin kh??ng ???????c ????? tr???ng!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="?????a ch???"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Th??ng tin kh??ng ???????c ????? tr???ng!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="S??? ??i???n tho???i"
                        name="phoneNumber"
                        rules={[
                            {
                                required: true,
                                message: 'Th??ng tin kh??ng ???????c ????? tr???ng!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Ghi ch??" name="note">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Tr???ng th??i" name="status">
                        <Select placeholder="Select a option and change input text above" onChange={onGenderChange}>
                            <Select.Option value="processing">??ang l???y h??ng</Select.Option>
                            <Select.Option value="completed">???? nh???n h??ng</Select.Option>
                            <Select.Option value="refunded">Ho??n tr???</Select.Option>
                            <Select.Option value="cancelled">???? h???y</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            X??c nh???n
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <div className="ad_title">
                <span>Th??ng tin v??? ????n h??ng </span>
                <span>S??? ti???n ???? thanh to??n : {total()} vn??</span>
            </div>
            <div className="ad_info">
                <Table rowKey="id" columns={columns} dataSource={data} />
            </div>
        </div>
    );
}

export default OrderAdmin;
