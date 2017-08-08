import React from 'react';
import {
	Row,
	Col,
	BackTop
} from 'antd';

import PCImageBlock from './pc_news_image_block';
import Head from './mobile_header';
import Footer from './mobile_footer';

export default class MobileNewsDetails extends React.Component {

	constructor() {
		super();
		this.state = {
			newsItem: ''
		};
	}

	componentWillMount() {
		var myFatchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" +
				this.props.match.params.id, myFatchOptions)
			.then(response => response.json())
			.then(json => this.setState({
				newsItem: json
			}));
		document.title = this.state.newsItem.title + '- React News | React 驱动的新闻平台';

	}

	createMarkup() {
		return {
			__html: this.state.newsItem.pagecontent
		};
	}

	render() {
		return (
			<div id="mobileDetailsContainer">
				<Head></Head>
				<div class="ucmobileList">
					<Row>
						<Col span={24} className="container">
							<div class="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
							<hr/>
						</Col>					
					</Row>
					<Footer></Footer>
					<BackTop/>
				</div>								
			</div>
		);
	}
}