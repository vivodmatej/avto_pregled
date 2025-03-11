import React, { Component } from 'react';
import { Table, Button, Modal, Input, Form, Checkbox, message } from 'antd';
import { CheckOutlined, CloseOutlined} from '@ant-design/icons';


class Uporabniki extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            uporabniki: [],
            open: false,
            initialValues: {},
            id: undefined
        }
    }

    getData = () => {
        fetch("/api/uporabniki", {})
            .then((res) => res.json())
            .then(uporabniki => {
                const data = uporabniki.map((el, i) => ({ ...el, key: i + 1 }))
                this.setState({ uporabniki: data })
            })
            .catch((error) => console.log(error))
    }


    componentDidMount() {
        this.getData()
    }

    sortName = (a, b) => {
        if (a && b) {
            var textA = a?.ime?.toString().toUpperCase() ?? "";
            var textB = b?.ime?.toString().toUpperCase() ?? "";
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        }
    }

    showModal = () => {
        this.setState({ open: true })
    };

    handleCancel = () => {
        this.setState({ open: false, initialValues: {}, id: undefined })
        this.formRef.current.resetFields();
        this.getData()
    };


    updateUporabnik = (values) => {
        const { id } = this.state
        fetch("/api/uporabniki", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "authToken"
            },
            body: JSON.stringify({ ...values, idUporabnik: id })
        })
            .then(res => {
                this.formRef.current.resetFields();
                this.setState({ initialValues: {}, id: undefined })
                this.handleCancel()
            })
            .catch(err => {
                console.error("HTTP error while fetching", err)
                return err
            })
    };

    deleteUporabnik = (id) => {
        let result = window.confirm("Želiš izbrisati");
        if (result) {
            fetch("/api/uporabniki", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': "authToken"
                },
                body: JSON.stringify({ idUporabnik: id })
            })
                .then(res => {
                    this.getData()
                })
                .catch(err => {
                    console.error("HTTP error while fetching", err)
                    return err
                })
        }
    };

    onFinish = (values) => {
        fetch("/api/uporabniki", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "authToken"
            },
            body: JSON.stringify({ ...values, admin: values?.admin ?? false })
        })
            .then(res => {
                this.setState({ name: "", })
                this.formRef.current.resetFields();
            })
            .catch(err => {
                console.error("HTTP error while fetching", err)
                return err
            })
        // Here, you could send the form data to an API endpoint to create the user
        message.success('User created successfully!');
    };

    validateConfirmPassword = ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue('geslo') === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error('Gesli se ne ujemata'));
        },
    });

    render() {
        const { uporabniki, open, initialValues, id } = this.state

        const columns = [
            {
                title: '#',
                dataIndex: 'key',
                key: 'key',
                width: 50,
                sorter: (a, b) => a?.key - b?.key,
            },
            {
                title: 'Ime',
                dataIndex: 'ime',
                key: 'ime',
                sorter: (a, b) => this.sortName(a, b),
            },
            {
                title: 'Priimek',
                dataIndex: 'priimek',
                key: 'priimek',
                sorter: (a, b) => this.sortName(a, b),
            },
            {
                title: 'email',
                dataIndex: 'email',
                key: 'email',
                sorter: (a, b) => this.sortName(a, b),
            },
            {
                title: 'Admin',
                dataIndex: 'admin',
                key: 'admin',
                width: 80,
                render: (text, record) => <div>
                   {record?.admin ? <CheckOutlined />: <CloseOutlined /> }
                </div>,
            },
            {
                title: "",
                dataIndex: 'button',
                key: 'button',
                width: 170,
                render: (text, record) => <div>
                    <Button
                        ghost
                        type="primary"
                        onClick={() => this.setState({ initialValues: record, id: record?.idUporabnik }, () => this.showModal())}
                    >
                        urejanje
                    </Button>{"  "}
                    <Button
                        ghost
                        type="primary"
                        onClick={() => this.deleteUporabnik(record?.idUporabnik)}
                    >
                        X
                    </Button>
                </div>,
            }
        ];
        return (
            <div>
                <Button type="primary" style={{ float: "right", marginBottom: 5 }} onClick={this.showModal}>
                    Nov uporabnik
                </Button>
                <Table columns={columns} dataSource={uporabniki}
                    pagination={{
                        position: ["bottomCenter"],
                        defaultPageSize: 50,
                        pageSizeOptions: ["20", "30", "50", "100", "150", "200",],
                        showSizeChanger: true,
                        locale: { items_per_page: "" },
                    }}
                />
                <Modal cancelText="Zapri" destroyOnClose={true} open={open} okButtonProps={{ style: { display: 'none' } }} onOk={id ? () => this.updateUporabnik() : () => this.newUporabnik()} onCancel={this.handleCancel} okText="Shrani">
                    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
                        <h2>{id ? "Posodobi uporabika" : "Ustvari uporabnika"}</h2>
                        <Form
                            ref={this.formRef}
                            onFinish={!id ? this.onFinish : this.updateUporabnik}
                            initialValues={initialValues}
                            layout="vertical"
                        >
                            <Form.Item
                                label="Ime"
                                name="ime"
                                rules={[{ required: true, message: 'Vpišite ime' }]}
                            >
                                <Input placeholder="Vpišite ime" />
                            </Form.Item>
                            <Form.Item
                                label="Priimek"
                                name="priimek"
                                rules={[{ required: true, message: 'Vpišite priimek' }]}
                            >
                                <Input placeholder="Vpišite priimek" />
                            </Form.Item>

                            {!id ? <>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        { required: true, message: 'Vpišite email' },
                                        { type: 'email', message: 'Vpišite veljaven email' },
                                    ]}
                                >
                                    <Input placeholder="Vpišite email" />
                                </Form.Item>

                                <Form.Item
                                    label="Geslo"
                                    name="geslo"
                                    rules={[
                                        { required: true, message: 'Vpišite geslo' },
                                        { min: 6, message: 'Geslo mora biti dolžine 6 znakov' },
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password placeholder="Vpišite geslo" />
                                </Form.Item>

                                <Form.Item
                                    label="Potrdi geslo"
                                    name="potrdiGeslo"
                                    dependencies={['geslo']}
                                    hasFeedback
                                    rules={[
                                        { required: true, message: 'Potrdi geslo' },
                                        this.validateConfirmPassword,
                                    ]}
                                >
                                    <Input.Password placeholder="Potrdi geslo" />
                                </Form.Item></>
                                : <></>}

                            {/* Checkbox Field */}
                            <Form.Item
                                name="admin"
                                valuePropName="checked"
                            >
                                <Checkbox>
                                    Admin
                                </Checkbox>
                            </Form.Item>

                            {/* Submit Button */}
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    {id ? "Posodobi" : "Ustvari uporabnika"}
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Uporabniki;
