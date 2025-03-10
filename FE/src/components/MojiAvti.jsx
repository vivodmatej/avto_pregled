import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Checkbox, Card, Col, Row, Pagination, Select } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { setFilters, filterData, sortingAsc, sortingDesc } from "./filterFunction"

class MojiAvti extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            record: undefined,
            znamkaId: undefined,
            znamka: undefined,
            modeli: [],
            selectedModeli: [],
            znamke: [],
            goriva: [],
            menjalniki: [],
            vrata: [],
            avti: [],
            _avti: [],
            currentPage: 1,
            cardsPerPage: 3,
            _filters: [],
            admin: false,
            checked: false
        }
    }

    getData = () => {
        const body = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : false
        const id = body?.idUporabnik
        const admin = body?.admin
        if (admin) {
            fetch("/api/api/avti", {})
                .then((res) => res.json())
                .then(data => {
                    const _modeli = data?.modeli
                    const _znamke = data?.znamke
                    const _goriva = data?.goriva
                    const _menjalniki = data?.menjalniki
                    const _vrata = data?.vrata
                    const _avti = data?.avti
                    this.setState({
                        modeli: _modeli,
                        znamke: _znamke,
                        goriva: _goriva,
                        menjalniki: _menjalniki,
                        vrata: _vrata,
                        avti: _avti,
                        _avti: _avti,
                        admin
                    })
                })
                .catch((error) => console.log(error))
        } else {
            fetch("/api/api/mojiAvti1?idUporabnik=" + id, {})
                .then((res) => res.json())
                .then(data => {
                    const _modeli = data?.modeli
                    const _znamke = data?.znamke
                    const _goriva = data?.goriva
                    const _menjalniki = data?.menjalniki
                    const _vrata = data?.vrata
                    const _avti = data?.avti
                    this.setState({
                        modeli: _modeli,
                        znamke: _znamke,
                        goriva: _goriva,
                        menjalniki: _menjalniki,
                        vrata: _vrata,
                        avti: _avti,
                        _avti: _avti,
                    })
                })
                .catch((error) => console.log(error))
        }
    }


    componentDidMount() {
        this.getData()
    }

    showModal = () => {
        this.setState({ open: true })
    };

    handleCancel = () => {
        this.setState({ open: false })
        this.getData()
    };

    //preusmeritev na formo za dodajanje avta
    onClick = (e) => {
        this.props.navigate('/avtoForma');
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    handlePageSizeChange = (current, size) => {
        this.setState({ cardsPerPage: size });
    };

    dateFormatter = (number) => {
        let day = (new Date(number).getDate()).toString()
        let month = (new Date(number).getMonth() + 1).toString()
        let year = new Date(number).getFullYear().toString()
        return (day + "." + month + "." + year)
    };

    //pridobivanje podatkov modelov glede na izbrano znamko
    getModels = (value) => {
        const { modeli, } = this.state
        const fModeli = modeli.filter(f => f?.znamkaId === value)
        this.setState({ selectedModeli: fModeli })
    };

    //funkcija za filtriranje podatkov
    onChange = (e) => {
        const { _filters, _avti } = this.state
        const f = setFilters(e, _filters)
        this.setState({ _filters: f })
        const data = filterData(f, _avti)
        this.setState({ avti: data })
    }

    //sortiranje podatkov
    sortiranje = (e) => {
        const data = this.getSort(e)
        this.setState({ avti: data })
    }

    //pridobivanje podatkov glede na izbrano sortiranje
    getSort = (e) => {
        const { avti } = this.state
        switch (e?.value) {
            case 1: return sortingAsc(avti, "letnik");
            case 2: return sortingDesc(avti, "letnik");
            case 3: return sortingAsc(avti, "cena");
            case 4: return sortingDesc(avti, "cena");
            case 5: return sortingAsc(avti, "znamkaName");
            case 6: return sortingDesc(avti, "znamkaName");
            default: return "";
        }
    }

    deleteAvto = (id) => {
        let result = window.confirm("Želiš izbrisati");
        if (result) {
            fetch("/api/api/avto", {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': "authToken"
                },
                body: JSON.stringify({ idAvto: id })
            })
                .then(res => {
                    this.getData()
                })
                .catch(err => {
                    console.error("HTTP error while fetching", err)
                    return err
                })
        }
    }

    //funkcija za pridobitev podatkov, če je uporabnik admin glede na to ali želi vse avte ali pa samo tiste, ki jih je on ustvaril
    onCheck = (e) => {
        const body = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : false
        const id = body?.idUporabnik
        const checked = e.target.checked
        if (!checked) {
            fetch("/api/api/avti", {})
                .then((res) => res.json())
                .then(data => {
                    const _modeli = data?.modeli
                    const _znamke = data?.znamke
                    const _goriva = data?.goriva
                    const _menjalniki = data?.menjalniki
                    const _vrata = data?.vrata
                    const _avti = data?.avti
                    this.setState({
                        modeli: _modeli,
                        znamke: _znamke,
                        goriva: _goriva,
                        menjalniki: _menjalniki,
                        vrata: _vrata,
                        avti: _avti,
                        _avti: _avti,
                    })
                })
                .catch((error) => console.log(error))
        } else {
            fetch("/api/api/mojiAvti?idUporabnik=" + id, {})
                .then((res) => res.json())
                .then(data => {
                    const _modeli = data?.modeli
                    const _znamke = data?.znamke
                    const _goriva = data?.goriva
                    const _menjalniki = data?.menjalniki
                    const _vrata = data?.vrata
                    const _avti = data?.avti
                    this.setState({
                        modeli: _modeli,
                        znamke: _znamke,
                        goriva: _goriva,
                        menjalniki: _menjalniki,
                        vrata: _vrata,
                        avti: _avti,
                        _avti: _avti,
                    })
                })
                .catch((error) => console.log(error))
        }
    };

    onClickEdit = (e) => {
        this.props.navigate('/avtoForma?id=' + e);
    };

    render() {
        const { admin, open, avti, selectedModeli, znamke, currentPage, cardsPerPage, goriva, menjalniki, record } = this.state
        const cene = [
            { value: "1", label: "0-1000", min: 0, max: 1000 },
            { value: "2", label: "1000-5000", min: 1000.01, max: 5000 },
            { value: "3", label: "5000-10000", min: 5000.01, max: 10000 },
            { value: "4", label: "10000-20000", min: 10000.01, max: 20000 },
            { value: "5", label: "20000-50000", min: 20000.01, max: 50000 },
            { value: "6", label: "50000+", min: 50000.01, max: 100000000 },
        ]
        const sort = [
            { value: 1, label: "letnik+" },
            { value: 2, label: "letnik-" },
            { value: 3, label: "cena+" },
            { value: 4, label: "cena-" },
            { value: 5, label: "znamka+" },
            { value: 6, label: "znamka-" }
        ]
        const indexOfLastCard = currentPage * cardsPerPage;
        const indexOfFirstCard = indexOfLastCard - cardsPerPage;
        const currentCards = avti.slice(indexOfFirstCard, indexOfLastCard);

        const styleLeft = { fontWeight: "bold", padding: 0, fontSize: 16 }
        const styleRight = { padding: 0, fontSize: 16 }
        return (
            <div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {admin ? <Checkbox onChange={this.onCheck} defaultChecked={false} style={{ alignItems: "center" }}>Moji</Checkbox> : <></>}
                    <Select allowClear showSearch placeholder={"Znamka"}
                        style={{ width: 205, marginRight: 5, marginBottom: 5 }} options={znamke}
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        onChange={(e, i) => {
                            this.getModels(e)
                            this.onChange({ type: "znamkaId", value: i })
                        }} />
                    <Select allowClear showSearch placeholder={"Model"}
                        style={{ width: 205, marginRight: 5, marginBottom: 5 }} options={selectedModeli}
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        onChange={(e, i) => this.onChange({ type: "modelId", value: i })} />
                    <Select allowClear showSearch placeholder={"Gorivo"}
                        style={{ width: 205, marginRight: 5, marginBottom: 5 }} options={goriva}
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        onChange={(e, i) => this.onChange({ type: "gorivoId", value: i })} />
                    <Select allowClear showSearch placeholder={"Menjalnik"}
                        style={{ width: 205, marginRight: 5, marginBottom: 5 }} options={menjalniki}
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        onChange={(e, i) => this.onChange({ type: "menjalnikId", value: i })} />
                    <Select allowClear showSearch placeholder={"Cena"}
                        style={{ width: 205, marginRight: 5, marginBottom: 5 }} options={cene}
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        onChange={(e, i) => this.onChange({ type: "cena", value: i })} />
                    <div style={{ marginLeft: 'auto' }}>
                        <Select allowClear showSearch placeholder={"Sortiranje"}
                            style={{ width: 205, marginRight: 5, marginBottom: 5 }} options={sort}
                            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                            onChange={(e, i) => this.sortiranje(i)} />
                        <Button type="primary" onClick={() => this.onClick()}>
                            Dodaj avto
                        </Button>
                    </div>
                </div>
                <div>
                    {currentCards.map((el) => (
                        <Row key={el.idAvto + Math.random(1000)} gutter={16} style={{ marginBottom: '16px' }}>
                            {/* Full width of row for the card */}
                            <Col xs={24} sm={24} md={24} lg={24}>
                                <Card hoverable style={{ padding: 0 }} onClick={() => this.setState({ open: true, record: el })}     >
                                    <div>
                                        <span style={{ fontWeight: "bold", fontSize: 20 }}>{el?.znamkaName + " " + el?.modelName}</span>
                                        <div style={{ float: 'right' }}>
                                            <Button
                                                ghost
                                                type="primary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    this.onClickEdit(el?.idAvto);
                                                }}
                                            >
                                                urejanje
                                            </Button>{"  "}
                                            <Button
                                                ghost
                                                type="primary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    this.deleteAvto(el?.idAvto);
                                                }}
                                            >
                                                Izbriši
                                            </Button>
                                        </div>
                                    </div>
                                    <Row gutter={16} style={{ marginTop: '16px' }}>
                                        <Col xs={24} sm={9} md={9} lg={9} style={{ padding: 0, }}>
                                            <Row>
                                                <Col md={8} style={{ ...styleLeft }}><span style={{ float: "right" }}>{"Kilometri"}:</span></Col>
                                                <Col md={16} style={{ ...styleRight }}><span>{'\xa0'}{el && el.kilometri}</span></Col>
                                            </Row>
                                            <Row>
                                                <Col md={8} style={{ ...styleLeft }}><span style={{ float: "right" }}>{"Letnik"}:</span></Col>
                                                <Col md={16} style={{ ...styleRight }}><span>{'\xa0'}{el && el.letnik}</span></Col>
                                            </Row>
                                            <Row>
                                                <Col md={8} style={{ ...styleLeft }}><span style={{ float: "right" }}>{"Menjalnik"}:</span></Col>
                                                <Col md={16} style={{ ...styleRight }}><span>{'\xa0'}{el && el.menjalnikName}</span></Col>
                                            </Row>
                                            <Row>
                                                <Col md={8} style={{ ...styleLeft }}><span style={{ float: "right" }}>{"Gorivo"}:</span></Col>
                                                <Col md={16} style={{ ...styleRight }}><span>{'\xa0'}{el && el.gorivoName}</span></Col>
                                            </Row>

                                        </Col>
                                        <Col xs={24} sm={9} md={9} lg={9} style={{ padding: 0 }}>
                                            <Row>
                                                <Col md={8} style={{ ...styleLeft }}><span style={{ float: "right" }}>{"pogon4"}:</span></Col>
                                                <Col md={16} style={{ ...styleRight }}><span>{'\xa0'}{el && el.pogon4 ? <CheckOutlined /> : <CloseOutlined />}</span></Col>
                                            </Row>
                                            <Row>
                                                <Col md={8} style={{ ...styleLeft }}><span style={{ float: "right" }}>{"Vrata"}:</span></Col>
                                                <Col md={16} style={{ ...styleRight }}><span>{'\xa0'}{el && el.vrataName}</span></Col>
                                            </Row>
                                            <Row>
                                                <Col md={8} style={{ ...styleLeft }}><span style={{ float: "right" }}>{"Datum objave"}:</span></Col>
                                                <Col md={16} style={{ ...styleRight }}><span>{'\xa0'}{el && this.dateFormatter(el.datumObjave * 1000)}</span></Col>
                                            </Row>
                                        </Col>
                                        <Col xs={24} sm={6} md={6} lg={6} style={{ ...styleRight }}>
                                            <Row>
                                                <Col md={24} style={{ ...styleLeft }}><span style={{ textAlign: "center" }}><h3 style={{ margin: 0 }}>{"Cena"}</h3></span></Col>
                                            </Row>
                                            <Row>
                                                <Col md={24} style={{ ...styleRight }}><span style={{ textAlign: "center" }}><h2 style={{ margin: 0 }}>{el && el.cena}€</h2></span></Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    ))}
                </div>
                <Pagination
                    current={currentPage}
                    pageSize={cardsPerPage}
                    total={avti.length}
                    pageSizeOptions={["5", "10", "20", "30", "50",]}
                    onChange={this.handlePageChange}
                    onShowSizeChange={this.handlePageSizeChange}
                    showSizeChanger={true}  // Disable size changer to keep the page size constant
                    style={{ textAlign: 'center', marginTop: '20px' }}
                />
                <Modal destroyOnClose={true} open={open} okButtonProps={{ style: { display: 'none' } }} onCancel={this.handleCancel} cancelText="Zapri">
                    <Row>
                        <Col md={24} style={{ ...styleRight }}><span style={{ textAlign: "center" }}><h3 style={{ margin: 0 }}>{"Cena"}</h3></span></Col>
                    </Row>
                    <Row>
                        <Col md={24} style={{ ...styleRight }}><span style={{ textAlign: "center" }}><h2 style={{ margin: 0 }}>{record && record.cena}€</h2></span></Col>
                    </Row>
                    <Row>
                        <Col md={8} style={{ ...styleRight }}><span style={{ float: "right" }}>{"Kilometri"}:</span></Col>
                        <Col md={16} style={{ ...styleRight }}><span>{'\xa0'}{record && record.kilometri}</span></Col>
                    </Row>
                    <Row>
                        <Col md={8} style={{ ...styleRight }}><span style={{ float: "right" }}>{"Letnik"}:</span></Col>
                        <Col md={16} style={{ ...styleRight }}><span>{'\xa0'}{record && record.letnik}</span></Col>
                    </Row>
                    <Row>
                        <Col md={8} style={{ ...styleRight }}><span style={{ float: "right" }}>{"Menjalnik"}:</span></Col>
                        <Col md={16} style={{ ...styleRight }}><span>{'\xa0'}{record && record.menjalnikName}</span></Col>
                    </Row>
                    <Row>
                        <Col md={8} style={{ ...styleRight }}><span style={{ float: "right" }}>{"Gorivo"}:</span></Col>
                        <Col md={16} style={{ ...styleRight }}><span>{'\xa0'}{record && record.gorivoName}</span></Col>

                    </Row>
                    <Row>
                        <Col md={8} style={{ ...styleRight }}><span style={{ float: "right" }}>{"pogon4"}:</span></Col>
                        <Col md={16} style={{ ...styleRight }}><span>{'\xa0'}{record && record.pogon4 ? <CheckOutlined /> : <CloseOutlined />}</span></Col>
                    </Row>
                    <Row>
                        <Col md={8} style={{ ...styleRight }}><span style={{ float: "right" }}>{"Vrata"}:</span></Col>
                        <Col md={16} style={{ ...styleRight }}><span>{'\xa0'}{record && record.vrataName}</span></Col>
                    </Row>
                    <Row>
                        <Col md={8} style={{ ...styleRight }}><span style={{ float: "right" }}>{"Datum objave"}:</span></Col>
                        <Col md={16} style={{ ...styleRight }}><span>{'\xa0'}{record && this.dateFormatter(record.datumObjave * 1000)}</span></Col>
                    </Row>
                    <Row>
                        <Col md={8} style={{ ...styleRight }}><span style={{ float: "right" }}>{"Objavil"}:</span></Col>
                        <Col md={16} style={{ ...styleRight }}><span>{'\xa0'}{record && (record.upIme + " " + record.upPriimek)}</span></Col>
                    </Row>
                    <Row>
                        <Col md={8} style={{ ...styleRight }}><span style={{ float: "right" }}>{"Email"}:</span></Col>
                        <Col md={16} style={{ ...styleRight }}><span>{'\xa0'}{record && (record.upMail)}</span></Col>
                    </Row>
                    <Row>
                        <Col md={8} style={{ ...styleRight }}><span style={{ float: "right" }}>{"Opis"}:</span></Col>
                        <Col md={16} style={{ ...styleRight }}><span>{'\xa0'}{record && record.opis}</span></Col>
                    </Row>

                </Modal>

            </div>
        )
    }
}



const Avti = () => {
    const navigate = useNavigate();
    return <MojiAvti navigate={navigate} />;
};

export default Avti;
