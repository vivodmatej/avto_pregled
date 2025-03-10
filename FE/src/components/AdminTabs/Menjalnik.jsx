import React, { Component } from 'react';
import { Table, Button, Modal, Input } from 'antd';


class Menjalnik extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menjalniki: [],
            open: false,
            name: "",
            id: undefined
        }
    }

    getData = () => {
        fetch("/api/api/menjalniki", {})
            .then((res) => res.json())
            .then(menjalniki => {
                const data = menjalniki.map((el, i) => ({ ...el, key: i + 1 }))
                this.setState({ menjalniki: data })
            })
            .catch((error) => console.log(error))
    }


    componentDidMount() {
        this.getData()
    }

    sortName = (a, b) => {
        if (a && b) {
            var textA = a?.vrsta?.toString().toUpperCase() ?? "";
            var textB = b?.vrsta?.toString().toUpperCase() ?? "";
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        }
    }

    showModal = () => {
        this.setState({ open: true })
    };

    handleCancel = () => {
        this.setState({ open: false, name: "", id: undefined })
        this.getData()
    };

    newMenjalnik = () => {
        const { name } = this.state
        fetch("/api/api/menjalniki", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "authToken"
            },
            body: JSON.stringify({ vrsta: name })
        })
            .then(res => {
                this.setState({ name: "", })
            })
            .catch(err => {
                console.error("HTTP error while fetching", err)
                return err
            })
    };

    updateMenjalnik = () => {
        const { name, id } = this.state
        fetch("/api/api/menjalniki", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "authToken"
            },
            body: JSON.stringify({ vrsta: name, idMenjalnik: id })
        })
            .then(res => {
                this.setState({ name: "", id: undefined })
            })
            .catch(err => {
                console.error("HTTP error while fetching", err)
                return err
            })
    };

    deleteMenjalnik = (id) => {
        let result = window.confirm("Želiš izbrisati");
        if (result) {
            fetch("/api/api/menjalniki", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': "authToken"
                },
                body: JSON.stringify({ idMenjalnik: id })
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

    render() {
        const { menjalniki, open, name, id } = this.state

        const columns = [
            {
                title: '#',
                dataIndex: 'key',
                key: 'key',
                width: 50,
                sorter: (a, b) => a?.key - b?.key,
            },
            {
                title: 'Vrsta',
                dataIndex: 'vrsta',
                key: 'vrsta',
                sorter: (a, b) => this.sortName(a, b),
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
                        onClick={() => this.setState({ name: record?.vrsta, id: record?.idMenjalnik }, () => this.showModal())}
                    >
                        urejanje
                    </Button>{"  "}
                    <Button
                        ghost
                        type="primary"
                        onClick={() => this.deleteMenjalnik(record?.idMenjalnik)}
                    >
                        X
                    </Button>
                </div>,
            }
        ];
        return (
            <div>
                <Button type="primary" style={{ float: "right", marginBottom: 5 }} onClick={this.showModal}>
                    Nov menjalnik
                </Button>
                <Table columns={columns} dataSource={menjalniki}
                    pagination={{
                        position: ["bottomCenter"],
                        defaultPageSize: 50,
                        pageSizeOptions: ["20", "30", "50", "100", "150", "200",],
                        showSizeChanger: true,
                        locale: { items_per_page: "" },
                    }}
                />
                <Modal open={open} onOk={id ? () => this.updateMenjalnik() : () => this.newMenjalnik()} onCancel={this.handleCancel} okText="Shrani" cancelText="Zapri">
                    Menjalnik<Input
                        value={name}
                        onChange={(e) => this.setState({ name: e.target.value })}
                    />
                </Modal>
            </div>
        )
    }
}

export default Menjalnik;
