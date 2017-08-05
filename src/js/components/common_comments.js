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
	Card
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
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=" + this.props.uniquekey, myFetchOptions).then(response => response.json()).then(json => {
			this.setState({
				comments: json
			});
		});
	}

	handlerSubmit(e) {
		console.log(e);
	}

	render() {

		return (
			<div class="comment">
				<Row>
					<Col span={24}>
						{commentList}
						<Form onsubmit={this.handlerSubmit.bind(this)}>
							<FormItem label="您的评论">
								<Input type="textarea" placeholder="随便写哈" {...getFieldProps('remark',{initialValue: ''})}/>
							</FormItem>
							<Button type="primary" htmlType="submit">提交评论</Button>
						</Form>
					</Col>
				</Row>
			</div>
		);
	}
}

export default CommonComments = Form.create({})(CommonComments);