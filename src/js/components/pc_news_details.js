import React from 'react';
import {
	Row,
	Col
} from 'antd';

import PCImageBlock from './pc_news_image_block';
import Head from './pc_header';
import Footer from './pc_footer';

export default class PCNewsDetails extends React.Component {

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
	}

	createMarkup() {
		return {
			__html: this.state.newsItem.pagecontent
		};
	}

	render() {
		document.title = this.state.newsItem.title + '- React News | React 驱动的新闻平台';
		return (
			<div>
				<Head></Head>
				<Row>
					<Col span={14} offset={2} className="container">
						<div class="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
					</Col>
					<Col span={6}>
						<PCImageBlock count="40" type="yule"/>
					</Col>
				</Row>
				<Footer></Footer>
			</div>
		);
	}
}