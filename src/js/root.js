import React from 'react'; //from 后面需写成小写的react，否则总会有警告
import ReactDOM from 'react-dom';
import {
	BrowserRouter as
	Router,
	Match,
	Route,
	Switch,
	Link
} from 'react-router-dom';
import {
	Button
} from 'antd';
import 'antd/dist/antd.css';

//导入适配组件
import MediaQuery from 'react-responsive';


//导入文件
import MobileIndex from './components/mobile_index';
import PCIndex from './components/pc_index';
import PCNewsDetails from './components/pc_news_details';
import MobileDetails from './components/mobile_news_details';
import PCUserCenter from './components/pc_usercenter';

export default class Root extends React.Component {
	render() {
		return (
			<div>
				<MediaQuery query='(min-device-width: 1224px)'>
					<Router>
						<Switch>
							<Route exact path="/" component={PCIndex} />
							<Route path= "/details/:id" component={PCNewsDetails} />
							<Route path= "/usercenter" component={PCUserCenter} />
						</Switch>							
					</Router>
					
				</MediaQuery>
				<MediaQuery query='(max-device-width: 1224px)'>
					<Router>
						<Switch>
							<Route exact path="/" component={MobileIndex} />
							<Route path= "/details/:id" component={MobileDetails} />
						</Switch>	
					</Router>
					
				</MediaQuery>
				
			</div>
		)
	};
};

ReactDOM.render(<Root/>, document.getElementById('mainContainer'));