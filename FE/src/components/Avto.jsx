import React, { Component } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, Form, Checkbox, message, InputNumber, Select, DatePicker } from 'antd';
import dayjs from 'dayjs';

const { TextArea } = Input;

class AvtoForma extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            uporabniki: [],
            open: false,
            initialValues: {},
            id: undefined,
            modeli: [],
            selectedModeli: [],
            znamke: [],
            goriva: [],
            menjalniki: [],
            vrata: []
        }
    }

    getData = () => {
        const { id } = this.props;
        fetch("/api/avto", {})
            .then((res) => res.json())
            .then(data => {
                const _modeli = data?.modeli
                const _znamke = data?.znamke
                const _goriva = data?.goriva
                const _menjalniki = data?.menjalniki
                const _vrata = data?.vrata
                this.setState({
                    modeli: _modeli,
                    znamke: _znamke,
                    goriva: _goriva,
                    menjalniki: _menjalniki,
                    vrata: _vrata,
                }, () => {
                    if (id) {
                        fetch("/api/getAvto?idAvto=" + id, {})
                            .then((res) => res.json())
                            .then(data => {
                                const _avto = data?.avto
                                var d = new Date(_avto.letnik, 0)
                                var year = dayjs(d)
                                const fModeli = _modeli.filter(f => f?.znamkaId === _avto?.model_znamka_idZnamka)                               
                                const initialValues = {
                                    znamka: _avto.model_znamka_idZnamka,
                                    model: _avto.model_idModel,
                                    gorivo: _avto.gorivo_idGorivo,
                                    menjalnik: _avto.menjalnik_idMenjalnik,
                                    vrata: _avto.vrata_idVrata,
                                    letnik: year,
                                    kilometri: _avto.kilometri,
                                    pogon4: _avto.pogon4,
                                    cena: _avto.cena,
                                    opis: _avto.opis,
                                };
                                this.setState({
                                    initialValues: initialValues,
                                    id,
                                    selectedModeli: fModeli
                                })
                            })
                            .catch((error) => console.log(error))
                    }

                })
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


    updateAvto = (values) => {
        const { id } = this.state;
        const datum = new Date(values?.letnik)
        const year = datum.getFullYear()
        const body = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : false
        const idUporabnik = body?.idUporabnik
        // console.log('Received values:', { ...values, pogon4: values?.pogon4 ?? false, letnik: year, idUporabnika: idUporabnik });
        fetch("/api/avto", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "authToken"
            },
            body: JSON.stringify({ ...values, pogon4: values?.pogon4 ?? false, letnik: year, idUporabnika: idUporabnik, idAvto: id })
        })
            .then(res => {
                this.setState({ name: "", })
                this.formRef.current.resetFields();
                this.props.navigate('/mojiAvti');
            })
            .catch(err => {
                console.error("HTTP error while fetching", err)
                return err
            })
        // Here, you could send the form data to an API endpoint to create the user
        message.success('User created successfully!');
    };

    onFinish = (values) => {
        const datum = new Date(values?.letnik)
        const year = datum.getFullYear()
        const body = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : false
        const id = body?.idUporabnik
        // console.log('Received values:', { ...values, pogon4: values?.pogon4 ?? false, letnik: year, idUporabnika: id });
        fetch("/api/avto", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': "authToken"
            },
            body: JSON.stringify({ ...values, pogon4: values?.pogon4 ?? false, letnik: year, idUporabnika: id })
        })
            .then(res => {
                this.setState({ name: "", })
                this.formRef.current.resetFields();
                this.props.navigate('/mojiAvti');
            })
            .catch(err => {
                console.error("HTTP error while fetching", err)
                return err
            })
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
    //pridobivanje podatkov modelov glede na izbrano znamko
    onChange = (value) => {
        const { modeli, initialValues } = this.state
        const fModeli = modeli.filter(f => f?.znamkaId === value)
        this.setState({ selectedModeli: fModeli, initialValues: { ...initialValues, znamka: value } })
    };

    render() {
        const { selectedModeli, initialValues, id, znamke, goriva, menjalniki, vrata } = this.state
        return (
            <div key={Math.random(1000)} style={{ maxWidth: '800px', padding: '0px 20px 20px 20px' }}>
                <h2>{id ? "Posodobi avto" : "Objavi avto"}</h2>
                <Form
                    ref={this.formRef}
                    onFinish={!id ? this.onFinish : this.updateAvto}
                    initialValues={{ ...initialValues }}
                    layout="vertical"
                >
                    <Form.Item
                        label="Znamka"
                        name="znamka"
                        rules={[{ required: true, message: 'Izberite znamko' }]}
                    >
                        <Select showSearch optionFilterProp="label" placeholder="Znamka" options={znamke} onChange={this.onChange} />
                    </Form.Item>
                    <Form.Item
                        label="Model"
                        name="model"
                        rules={[{ required: true, message: 'Izberite model' }]}
                    >
                        <Select showSearch optionFilterProp="label" placeholder="Model" options={selectedModeli} />
                    </Form.Item>
                    <Form.Item
                        label="Gorivo"
                        name="gorivo"
                        rules={[{ required: true, message: 'Izberite gorivo' }]}
                    >
                        <Select showSearch optionFilterProp="label" placeholder="Gorivo" options={goriva} />
                    </Form.Item>
                    <Form.Item
                        label="Menjalnik"
                        name="menjalnik"
                        rules={[{ required: true, message: 'Izberite menjalnik' }]}
                    >
                        <Select showSearch optionFilterProp="label" placeholder="Menjalniki" options={menjalniki} />
                    </Form.Item>
                    <Form.Item
                        label="Vrata"
                        name="vrata"
                        rules={[{ required: true, message: 'Izberite vrata' }]}
                    >
                        <Select showSearch optionFilterProp="label" placeholder="Vrata" options={vrata} />
                    </Form.Item>

                    <Form.Item
                        label="Letnik"
                        name="letnik"
                        rules={[{ required: true, message: 'Izberite letnik' }]}
                    >
                        <DatePicker placeholder="Letnik" picker="year" />
                    </Form.Item>

                    <Form.Item
                        label="Kilometri"
                        name="kilometri"
                        rules={[{ required: true, message: 'Vpišite kilometre' }]}
                    >
                        <InputNumber placeholder="Kilometri" min={0} />
                    </Form.Item>

                    <Form.Item
                        name="pogon4"
                        valuePropName="checked"
                    >
                        <Checkbox>
                            4x4
                        </Checkbox>
                    </Form.Item>

                    <Form.Item
                        label="Cena"
                        name="cena"
                        rules={[{ required: true, message: 'Vpišite ceno' }]}
                    >
                        <InputNumber placeholder="Cena" addonAfter={"€"} step="0.01" decimalSeparator="," min={0} />
                    </Form.Item>

                    <Form.Item
                        label="Opis"
                        name="opis"
                        rules={[{ required: true, message: 'Vpišite opis' }]}
                    >
                        <TextArea showCount rows={4} placeholder="Vpišite opis" maxLength={1000} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            {id ? "Posodobi" : "Objavi"}
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        )
    }
}


const Avto = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const id = new URLSearchParams(location.search).get("id");
    return <AvtoForma id={id} navigate={navigate} />;
};

export default Avto;
