import React from 'react';
import PCNewsBlock from './pc_news_block';
import PCImageBlock from './pc_news_image_block';
import {
	Row,
	Col
} from 'antd';
import {
	Tabs,
	Carousel
} from 'antd';

const TabPane = Tabs.TabPane;

export default class PCNewsContainer extends React.Component {

	render() {

		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			autoplay: true
		};

		return (
			<div>
				<Row>
					<Col span={20} offset={2} class="container">
						<div class="leftContainer">
							<div class="carousel">
								<Carousel {...settings}>
									<div><img src="./src/images/carousel_1.jpg"/></div>
                  <div><img src="./src/images/carousel_2.jpg"/></div>
                  <div><img src="./src/images/carousel_3.jpg"/></div>
                  <div><img src="./src/images/carousel_4.jpg"/></div>
								</Carousel>
							</div>	
							<PCImageBlock count={6} type="guonei" width="400px" cartTitle="国内新闻" imageWidth="110px"/>						
						</div>
						<Tabs class="tabs_news">
							<TabPane tab="新闻" key="1">
								<PCNewsBlock count="22" type="top" width="100%" bordered="false" />
							</TabPane>
							<TabPane tab="国际" key="2">
								<PCNewsBlock count="24" type="guoji" width="100%" bordered="false" />
							</TabPane>
						</Tabs>
						<div>
							
							<PCImageBlock count={9} type="keji" width="100%" cartTitle="科技见闻" imageWidth="110px"/>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}