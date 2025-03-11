import React, { Component } from 'react';
import { Table, Button, Modal, Input, Select } from 'antd';


class Modeli extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modeli: [],
            znamke: [],
            open: false,
            name: "",
            id: undefined,
            znamkaId: undefined,
            znamka: undefined
        }
    }

    getData = () => {
        fetch("/api/modeli", {})
            .then((res) => res.json())
            .then(data => {
                const _modeli = data?.models
                const _znamke = data?.znamke
                const arr = _modeli.map((el, i) => ({ ...el, key: i + 1 }))
                const arrZ = _znamke.map(el => { return { label: el.ime, value: el.idZnamka } })
                this.setState({ modeli: arr, znamke: arrZ })
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
        this.setState({ open: false, name: "", id: undefined, znamka:undefined  })
        this.getData()
    };
    
    handleChange  = (value, option) => {
        this.setState({ znamkaId: value, znamka:option })
    };

    newModeli = () => {
        const { name, znamkaId } = this.state
        fetch("/api/modeli", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "authToken"
            },
            body: JSON.stringify({ ime: name, znamkaId: znamkaId })
        })
            .then(res => {
                this.setState({ name: "", znamka: undefined })
            })
            .catch(err => {
                console.error("HTTP error while fetching", err)
                return err
            })
    };

    updateModeli = () => {
        const { name, id, znamkaId } = this.state
        fetch("/api/modeli", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "authToken"
            },
            body: JSON.stringify({ ime: name, idModel: id, znamkaId: znamkaId })
        })
            .then(res => {
                this.setState({ name: "", id: undefined, znamka: undefined, znamkaId: undefined  })
            })
            .catch(err => {
                console.error("HTTP error while fetching", err)
                return err
            })
    };

    deleteModeli = (id) => {
        let result = window.confirm("Želiš izbrisati");
        if (result) {
            fetch("/api/modeli", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': "authToken"
                },
                body: JSON.stringify({ idModel: id })
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
        const { modeli, open, name, id, znamka, znamke } = this.state

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
                title: 'Znamka',
                dataIndex: 'znamkaName',
                key: 'znamkaName',
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
                        onClick={() => this.setState({ name: record?.ime, id: record?.idModel, znamka:{label:record?.znamkaName, value:record?.znamkaId}, znamkaId:record?.znamkaId }, () => this.showModal())}
                    >
                        urejanje
                    </Button>{"  "}
                    <Button
                        ghost
                        type="primary"
                        onClick={() => this.deleteModeli(record?.idModel)}
                    >
                        X
                    </Button>
                </div>,
            }
        ];
        return (
            <div>
                <Button type="primary" style={{ float: "right", marginBottom: 5 }} onClick={this.showModal}>
                    Nov model
                </Button>
                <Table columns={columns} dataSource={modeli}
                    pagination={{
                        position: ["bottomCenter"],
                        defaultPageSize: 50,
                        pageSizeOptions: ["20", "30", "50", "100", "150", "200",],
                        showSizeChanger: true,
                        locale: { items_per_page: "" },
                    }}
                />
                <Modal title="Basic Modal" open={open} onOk={id ? () => this.updateModeli() : () => this.newModeli()} onCancel={this.handleCancel} okText="Shrani" cancelText="Zapri">
                    Znamka:<br/><Select
                        value={znamka}
                        style={{
                            width: 120,
                        }}
                        onChange={this.handleChange}
                        options={znamke}
                    /><p/>
                    Model:<Input
                        value={name}
                        onChange={(e) => this.setState({ name: e.target.value })}
                    />
                </Modal>
            </div>
        )
    }
}

export default Modeli;
