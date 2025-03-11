import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Button, Layout, Modal, Input, Form } from 'antd';
import './Navbar.css';
import { UserOutlined, } from '@ant-design/icons';

const { Header } = Layout;

const Navbar = () => {
	const location = useLocation();
	const [form] = Form.useForm();
	const [current, setCurrent] = useState('');
	const [error, setError] = useState('');
	const [open, setIsModalOpen] = useState(false);
	const [user, setUser] = useState(undefined);
	const navigate = useNavigate();
	const [items, setItems] = useState([
		{
			label: 'Home',
			key: '',
		}
	]);

	useEffect(() => {
		const find = items.find(el => ("/" + el?.key) === location.pathname)		
		setCurrent(find?.key)
	}, [location]);

	//za nastavljanje menija glede na nato ali je uporabnik admin ali oz ali je prijavljen
	useEffect(() => {
		const body = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : false
		setUser(body)
		if (body) {
			if (body?.admin) {
				setItems([
					{
						label: 'Domov',
						key: '',
					},
					{
						label: 'Moji avti',
						key: 'mojiAvti',
					},
					{
						label: 'Admin',
						key: 'admin',
					},
				])
			} else {
				setItems([
					{
						label: 'Home',
						key: '',
					},
					{
						label: 'Moji avti',
						key: 'mojiAvti',
					},
				])
			}
		} else {
			setItems([
				{
					label: 'Home',
					key: '',
				},
			])
		}
	}, []);

	const onClick = (e) => {;
		setCurrent(e.key);
		navigate("/" + e.key);
	};
	const login = (values) => {
		fetch("/api/login", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'auth-token': "authToken"
			},
			body: JSON.stringify({ ...values })
		}).then(response => response.json())  
			.then(data => {
				handleOk()
				localStorage.setItem('user', JSON.stringify(data?.uporabnik))
				window.location.reload()
			})
			.catch(err => {
				console.error("HTTP error while fetching", err)
				setError("Napačen email ali geslo")
				return err
			})				
		form.resetFields();
	};
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = () => {
		setIsModalOpen(false);
		setError("");
	};
	const handleCancel = () => {
		setIsModalOpen(false);
		setError("");
	};

	const logout = () => {
		localStorage.removeItem("user")
		navigate("/");
		window.location.reload()
	};

	return (<Layout key={user+items}>
		<Header style={{ padding: 0, backgroundColor: '#f0f2f5' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
				<div style={{ flex: 1 }}>
					<Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ borderBottom: 'none', backgroundColor: '#f0f2f5' }} />
				</div>
				{user ? <>
					{user.ime + " " + user.priimek}
					<Button
						type="primary"
						icon={<UserOutlined />}
						style={{ marginRight: 20, marginLeft: 20 }}
						onClick={() => logout()}
					>
						Odjava
					</Button>
				</>
					:
					<Button
						type="primary"
						icon={<UserOutlined />}
						style={{ marginRight: 20 }}
						onClick={() => showModal()}
					>
						Prijava
					</Button>
				}
			</div>
		</Header>
		<Modal destroyOnClose={true} open={open} okButtonProps={{ style: { display: 'none' } }} onOk={handleOk} onCancel={handleCancel} cancelText="Zapri">
			<div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
				<h2>Prijava</h2>
				<Form
					form={form} 
					onFinish={login}
					layout="vertical"
					initialValues={{ remember: true }}
				>

					<Form.Item
						label="Email"
						name="email"
						rules={[
							{ required: true, message: 'Vpišite email' },
							{ type: 'email', message: 'Vpišite veljaven email' },
						]}
					>
						<Input placeholder="Enter your email" />
					</Form.Item>

					<Form.Item
						label="Geslo"
						name="geslo"
						rules={[
							{ required: true, message: 'Vpišite geslo' },
						]}
						hasFeedback
					>
						<Input.Password placeholder="Enter your password" />
					</Form.Item>

					<h4 style={{ color: "red", }}>{error}</h4>

					<Form.Item>
						<Button type="primary" htmlType="submit" block>
							Prijava
						</Button>
					</Form.Item>
				</Form>
			</div>
		</Modal>
	</Layout>)
};

export default Navbar;