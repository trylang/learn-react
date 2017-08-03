import React from 'react';
import {
	Router,
	Route,
	Link,
	BrowserHistory
} from 'react-router';

import {
	Row,
	Col
} from 'antd';
import {
	Menu,
	Icon,
	Tabs,
	message,
	Form,
	Input,
	Button,
	CheckBox,
	Modal
} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class PCHeader extends React.Component {
	constructor() {
		super();
		this.state = {
			current: 'top',
			modalVisible: false,
			action: 'login',
			hasLogined: false,
			userNickName: '',
			userId: 0
		};
	}


	//错误提示：Uncaught (in promise) Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in. Check the render method of `PCHeader`.
	//原因就是没有写这个函数
	componentWillMount() {
		// if (localStorage.userid != '') {
		// 	this.setState({
		// 		hasLogined: true
		// 	});
		// 	this.setState({
		// 		userNickName: localStorage.userNickName,
		// 		userid: localStorage.userid
		// 	})
		// }
	}

	setModalVisible(value) {
		this.setState({
			modalVisible: value
		});
	}

	callback(key) {
		if (key == 1) {
			this.setState({
				action: 'login'
			});
		} else if (key == 2) {
			this.setState({
				action: 'register'
			});
		}
	}

	handleClick(e) {
		if (e.key == 'register') {
			this.setState({
				current: 'register'
			});
			this.state.modalVisible = true;
		} else {
			this.setState({
				current: e.key
			});
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		var myFetchOptions = {
			method: 'GET'
		};
		var formData = this.props.form.getFieldsValue();
		console.log(formData);
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action +
				"&username=" + formData.userName + "&password=" + formData.password +
				"&r_userName=" + formData.r_userName + "&r_password=" + formData.r_password +
				"&r_confirmPassword" + formData.r_confirmPassword, myFetchOptions)
			.then(response => response.json())
			.then(json => {
				console.log(json);
				this.setState({
					userNickName: json.NickUserName,
					userid: json.UserId
				});
				localStorage.userNickName = json.NickUserName;
				localStorage.userid = json.UserId;
			});

		if (this.state.action == 'login') {
			this.setState({
				hasLogined: true
			});
		}
		message.success("请求成功");
		this.setModalVisible(false);
	}

	logout() {
		localStorage.userNickName = '';
		localStorage.userid = '';
		this.setState({
			hasLogined: false
		});
	}

	render() {
		const {
			getFieldDecorator,
			getFieldsError,
			getFieldError,
			isFieldTouched
		} = this.props.form;
		// Only show error after a field is touched.
		const userNameError = isFieldTouched('userName') && getFieldError('userName');
		const passwordError = isFieldTouched('password') && getFieldError('password');

		const userShow = this.state.hasLogined ?
			<Menu.Item key="logout" class="register">
    				<Button type="primary" htmlType="button">{this.state.userNickName}</Button>
    				&nbsp;&nbsp;
    				// <Link>
    				// 	<Button type="dashed" htmlType="button">个人中心</Button>
    				// </Link>
    				// &nbsp;&nbsp;
    				// <Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>退出</Button>    			
    			</Menu.Item> :
			<Menu.Item key="register" class="register">
					<Icon type="appstore"/> 注册／登录
				</Menu.Item>;

		return (
			<header>
				<Row>
					<Col span={4} offset={2}>
						<a href="/" class="logo">
							<img src="./src/images/logo.png" alt="logo"/>
							<span>ReactNews</span>
						</a>
					</Col>
					<Col span={16}>
						<Menu onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]} mode="horizontal">
							<Menu.Item key="top">
								<Icon type="mail"/> 头条
							</Menu.Item>
							<Menu.Item key="shehui">
								<Icon type="mail"/> 社会
							</Menu.Item>
							<Menu.Item key="guonei">
								<Icon type="mail"/> 国内
							</Menu.Item>
							<Menu.Item key="guoji">
								<Icon type="mail"/> 国际
							</Menu.Item>
							<Menu.Item key="yule">
								<Icon type="mail"/> 娱乐
							</Menu.Item>
							<Menu.Item key="tiyu">
								<Icon type="mail"/> 体育
							</Menu.Item>
							<Menu.Item key="keji">
								<Icon type="mail"/> 科技
							</Menu.Item>
							<Menu.Item key="shishang">
								<Icon type="mail"/> 时尚
							</Menu.Item>
							{userShow}
						</Menu>
						<Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel={()=>this.setModalVisible(false)} onOk={()=>this.setModalVisible(false)} okText="关关">
							<Tabs type="card" onChange={this.callback.bind(this)}>
								<TabPane tab="登录" key="1">
									<Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
										<FormItem label="账户">
											{getFieldDecorator('userName', {
            								rules: [{ required: true, message: 'Please input your username!' }],
          									})(
            								<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          									)}
										</FormItem>
										<FormItem>
          									{getFieldDecorator('password', {
            								rules: [{ required: true, message: 'Please input your Password!' }],
          									})(
            								<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          									)}
        								</FormItem>
        								<Button type="primary" htmlType="submit">登录</Button>
									</Form>
								</TabPane>
								<TabPane tab="注册" key="2">
									<Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>
										<FormItem>
								          {getFieldDecorator('r_userName', {
								            rules: [{ required: true, message: 'Please input your username!' }],
								          })(
								            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
								          )}
								        </FormItem>
								        <FormItem>
								          {getFieldDecorator('r_password', {
								            rules: [{ required: true, message: 'Please input your Password!' }],
								          })(
								            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
								          )}
								        </FormItem>
								        <FormItem>
								          {getFieldDecorator('r_confirmPassword', {
								            rules: [{ required: true, message: 'Please input your Password!' }],
								          })(
								            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password Again" />
								          )}
								        </FormItem>
								        <Button type="primary" htmlType="submit">注册</Button>
									</Form>
								</TabPane>
							</Tabs>
						</Modal>
					</Col>
				</Row>
			</header>

		);
	}
}

export default PCHeader = Form.create({})(PCHeader);