import React, { Component } from 'react';
import { Table, Button, Modal, InputNumber  } from 'antd';


class Vrata extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vrata: [],
            open: false,
            kolicina: "",
            id: undefined
        }
    }

    getData = () => {
        fetch("/api/api/vrata", {})
            .then((res) => res.json())
            .then(vrata => {
                const data = vrata.map((el, i) => ({ ...el, key: i + 1 }))
                this.setState({ vrata: data })
            })
            .catch((error) => console.log(error))
    }


    componentDidMount() {
        this.getData()
    }    

    showModal = () => {
        this.setState({ open: true })
    };

    handleCancel = () => {
        this.setState({ open: false, kolicina: "", id: undefined  })
        this.getData()
    };

    newVrata = () => {
        const { kolicina } = this.state
        fetch("/api/api/vrata", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "authToken"
            },
            body: JSON.stringify({ kolicina: kolicina })
        })
            .then(res => {
                this.setState({ kolicina: "", })
            })
            .catch(err => {
                console.error("HTTP error while fetching", err)
                return err
            })
    };

    updateVrata = () => {
        const { kolicina, id } = this.state
        fetch("/api/api/vrata", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "authToken"
            },
            body: JSON.stringify({ kolicina: kolicina, idVrata: id })
        })
            .then(res => {
                this.setState({ kolicina: "", id: undefined })
            })
            .catch(err => {
                console.error("HTTP error while fetching", err)
                return err
            })
    };

    deleteVrata = (id) => {
        let result = window.confirm("Želiš izbrisati");
        if (result) {
            fetch("/api/api/vrata", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': "authToken"
                },
                body: JSON.stringify({ idVrata: id })
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
        const { vrata, open, kolicina, id } = this.state

        const columns = [
            {
                title: '#',
                dataIndex: 'key',
                key: 'key',
                width: 50,
                sorter: (a, b) => a?.key - b?.key,
            },
            {
                title: 'Količina',
                dataIndex: 'kolicina',
                key: 'kolicina',
                sorter: (a, b) => a?.kolicina - b?.kolicina,
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
                        onClick={() => this.setState({ kolicina: record?.kolicina, id: record?.idVrata }, () => this.showModal())}
                    >
                        urejanje
                    </Button>{"  "}
                    <Button
                        ghost
                        type="primary"
                        onClick={() => this.deleteVrata(record?.idVrata)}
                    >
                        X
                    </Button>
                </div>,
            }
        ];
        return (
            <div>
                <Button type="primary" style={{ float: "right", marginBottom: 5 }} onClick={this.showModal}>
                    Nova vrata
                </Button>
                <Table columns={columns} dataSource={vrata}
                    pagination={{
                        position: ["bottomCenter"],
                        defaultPageSize: 50,
                        pageSizeOptions: ["20", "30", "50", "100", "150", "200",],
                        showSizeChanger: true,
                        locale: { items_per_page: "" },
                    }}
                />
                <Modal open={open} onOk={id ? () => this.updateVrata() : () => this.newVrata()} onCancel={this.handleCancel} okText="Shrani" cancelText="Zapri">
                    Vrata:<br/><InputNumber 
                        value={kolicina}
                        onChange={(e) => this.setState({ kolicina: e })}
                    />
                </Modal>
            </div>
        )
    }
}

export default Vrata;
