import React, { Component } from 'react';
import { Table, Button, Modal, Input } from 'antd';


class Znamka extends Component {
    constructor(props) {
        super(props);
        this.state = {
            znamke: [],
            open: false,
            name: "",
            id: undefined
        }
    }

    getData = () => {
        fetch("/api/znamke", {})
            .then((res) => res.json())
            .then(znamke => {
                const data = znamke.map((el, i) => ({ ...el, key: i + 1 }))
                this.setState({ znamke: data })
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
        this.setState({ open: false, name: "", id: undefined  })
        this.getData()
    };

    newZnamka = () => {
        const { name } = this.state
        fetch("/api/znamke", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "authToken"
            },
            body: JSON.stringify({ ime: name })
        })
            .then(res => {
                this.setState({ name: "", })
            })
            .catch(err => {
                console.error("HTTP error while fetching", err)
                return err
            })
    };

    updateZnamka = () => {
        const { name, id } = this.state
        fetch("/api/znamke", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "authToken"
            },
            body: JSON.stringify({ ime: name, idZnamka: id })
        })
            .then(res => {
                this.setState({ name: "", id: undefined })
            })
            .catch(err => {
                console.error("HTTP error while fetching", err)
                return err
            })
    };

    deleteZnamka = (id) => {
        let result = window.confirm("Želiš izbrisati");
        if (result) {
            fetch("/api/znamke", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': "authToken"
                },
                body: JSON.stringify({ idZnamka: id })
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
        const { znamke, open, name, id } = this.state

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
                title: "",
                dataIndex: 'button',
                key: 'button',
                width: 170,
                render: (text, record) => <div>
                    <Button
                        ghost
                        type="primary"
                        onClick={() => this.setState({ name: record?.ime, id: record?.idZnamka }, () => this.showModal())}
                    >
                        urejanje
                    </Button>{"  "}
                    <Button
                        ghost
                        type="primary"
                        onClick={() => this.deleteZnamka(record?.idZnamka)}
                    >
                        X
                    </Button>
                </div>,
            }
        ];
        return (
            <div>
                <Button type="primary" style={{ float: "right", marginBottom: 5 }} onClick={this.showModal}>
                    Nova znamka
                </Button>
                <Table columns={columns} dataSource={znamke}
                    pagination={{
                        position: ["bottomCenter"],
                        defaultPageSize: 50,
                        pageSizeOptions: ["20", "30", "50", "100", "150", "200",],
                        showSizeChanger: true,
                        locale: { items_per_page: "" },
                    }}
                />
                <Modal open={open} onOk={id ? () => this.updateZnamka() : () => this.newZnamka()} onCancel={this.handleCancel} okText="Shrani" cancelText="Zapri">
                    Znamka:<Input
                        value={name}
                        onChange={(e) => this.setState({ name: e.target.value })}
                    />
                </Modal>
            </div>
        )
    }
}

export default Znamka;
