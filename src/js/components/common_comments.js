import React from 'react';
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
	Modal,
	Card,
	notification
} from 'antd';

const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;

class CommonComments extends React.Component {

	constructor() {
		super();
		this.state = {
			comments: ''
		};
	}

	componentDidMount() {
		var myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" +
			this.props.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
			this.setState({
				comments: json
			});
		});
	}

	handlerSubmit(e) {
		e.preventDefault();
		var myFetchOptions = {
			method: 'GET'
		};

		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log(values);
				fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=" + localStorage.userid + "&uniquekey=" +
						this.props.uniquekey + "&commnet=" + values.remark, myFetchOptions)
					.then(response => response.json())
					.then(json => {
						this.componentDidMount();
						message.success("评论成功！");
						this.props.form.resetFields(); //表单清空
					})
			}
		})
	};

	addUserCollection() {
		var myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=" + localStorage.userid + "&uniquekey=" + this.props.uniquekey, myFetchOptions)
			.then(response => response.json())
			.then(json => {
				//收藏成功以后进行一下全局的提醒
				notification['success']({
					message: '提示',
					description: '此文章收藏成功'
				})
			})

	};

	render() {
		const {
			getFieldDecorator
		} = this.props.form;

		const {
			comments
		} = this.state;
		const commentList = comments.length ?
			comments.map((comment, index) => (
				<Card key={index} title={comment.UserName} extra={<a href="#">发布于{comment.datetime}</a>}>
					<p>{comment.Comments}</p>
				</Card>
			)) :
			'没有加载到任何评论';

		return (
			<div class="comment">
				<Row>
					<Col span={24}>
						{commentList}
						<Form onSubmit={this.handlerSubmit.bind(this)}>
							<FormItem label="您的评论">
								{getFieldDecorator('remark', {initialValue: 'try',})(
            						<Input type="textarea" placeholder="随便写哈" />)}
							</FormItem>
							<Button type="primary" htmlType="submit">提交评论</Button>
							&nbsp;&nbsp;
							<Button type="primary" onClick={this.addUserCollection.bind(this)}>收藏</Button>
						</Form>
					</Col>
				</Row>
			</div>
		);
	}
}

export default CommonComments = Form.create({})(CommonComments);