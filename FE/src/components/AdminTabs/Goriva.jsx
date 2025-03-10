import React, { Component } from 'react';
import { Table, Button, Modal, Input } from 'antd';


class Goriva extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goriva: [],
            open: false,
            name: "",
            id: undefined
        }
    }

    getData = () => {
        fetch("/api/api/goriva", {})
            .then((res) => res.json())
            .then(goriva => {
                const data = goriva.map((el, i) => ({ ...el, key: i + 1 }))
                this.setState({ goriva: data })
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
        this.setState({ open: false, name: "", id: undefined })
        this.getData()
    };

    newGorivo = () => {
        const { name } = this.state
        fetch("/api/api/goriva", {
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

    updateGorivo = () => {
        const { name, id } = this.state
        fetch("/api/api/goriva", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "authToken"
            },
            body: JSON.stringify({ ime: name, idGorivo: id })
        })
            .then(res => {
                this.setState({ name: "", id: undefined })
            })
            .catch(err => {
                console.error("HTTP error while fetching", err)
                return err
            })
    };

    deleteGorivo = (id) => {
        let result = window.confirm("Želiš izbrisati");
        if (result) {
            fetch("/api/api/goriva", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': "authToken"
                },
                body: JSON.stringify({ idGorivo: id })
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
        const { goriva, open, name, id } = this.state

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
                        onClick={() => this.setState({ name: record?.ime, id: record?.idGorivo }, () => this.showModal())}
                    >
                        urejanje
                    </Button>{"  "}
                    <Button
                        ghost
                        type="primary"
                        onClick={() => this.deleteGorivo(record?.idGorivo)}
                    >
                        X
                    </Button>
                </div>,
            }
        ];
        return (
            <div>
                <Button type="primary" style={{ float: "right", marginBottom: 5 }} onClick={this.showModal}>
                    Novo gorivo
                </Button>
                <Table columns={columns} dataSource={goriva}
                    pagination={{
                        position: ["bottomCenter"],
                        defaultPageSize: 50,
                        pageSizeOptions: ["20", "30", "50", "100", "150", "200",],
                        showSizeChanger: true,
                        locale: { items_per_page: "" },
                    }}
                />
                <Modal open={open} onOk={id ? () => this.updateGorivo() : () => this.newGorivo()} onCancel={this.handleCancel} okText="Shrani" cancelText="Zapri">
                    Gorivo:<Input
                        value={name}
                        onChange={(e) => this.setState({ name: e.target.value })}
                    />
                </Modal>
            </div>
        )
    }
}

export default Goriva;
