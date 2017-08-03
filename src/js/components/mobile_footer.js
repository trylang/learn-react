import React from 'react';
import {
	Row,
	Col
} from 'antd';

export default class MobileFooter extends React.Component {

	render() {
		return (
			<footer>
				<Row>
					<Col span={20} offset={2} class="footer">
						&copy;&nbsp;2017 ReactNews. All Rights Reserved.
					</Col>
				</Row>
			</footer>
		);
	};
};