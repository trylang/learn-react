import React from 'react'; //from 后面需写成小写的react，否则总会有警告
import ReactDOM from 'react-dom';
import {
	Router,
	Route,
	hashHistory
} from 'react-router';
import {
	Button
} from 'antd';
import 'antd/dist/antd.css';

//导入适配组件
import MediaQuery from 'react-responsive';


//导入文件
import MobileIndex from './components/mobile_index';
import PCIndex from './components/pc_index';

export default class Root extends React.Component {
	render() {
		return (
			<div>
				<MediaQuery query='(min-device-width: 1224px)'>
					<PCIndex/>
				</MediaQuery>
				<MediaQuery query='(max-device-width: 1224px)'>
					<MobileIndex/>
				</MediaQuery>
				
			</div>
		)
	};
};

ReactDOM.render(<Root/>, document.getElementById('mainContainer'));