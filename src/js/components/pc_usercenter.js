import React from 'react';
import ReactDom from 'react-dom';
import {
  Row,
  Col,
  Modal
} from 'antd';
import {
  Menu,
  Icon
} from 'antd';
import {
  Tabs,
  message,
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  notification,
  Upload
} from 'antd';

import PCHeader from './pc_header';
import PCFooter from './pc_footer';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

export default class PCUserCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usercollection: '',
      usercomments: '',
      previewImage: '',
      previewVisible: ''
    };
  };

  componentDidMount() {
    var myFetchOptions = {
      method: 'GET'
    };

    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions)
      .then(response => response.json())
      .then(json => {
        this.setState({
          usercollection: json
        });
      })

    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
      .then(response => response.json())
      .then(json => {
        this.setState({
          usercomments: json
        });
      });
  };

  handlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  handleChange(fileList) {
    this.setState({
      fileList: fileList
    })
  }

  render() {
    const param = {
      action: 'http://newsapi.gugujiankong.com/handler.ashx',
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      listType: "picture-card",
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        state: 'done',
        url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
        thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png'
      }]

    }

    const {
      usercollection,
      usercomments
    } = this.state;
    const usercollectionList = usercollection.length > 0 ?
      usercollection.map((uc, index) => {
        return <Card key={index} title={uc.uniquekey} extra={<a target="_blank" href={`/#/details/${uc.uniquekey}`}>查看</a>}>
          <p>{uc.Title}</p>
        </Card>
      }) : '您还没有收藏任何的新闻，快去收藏一些新闻吧。';

    const usercommentsList = usercomments.length ?
      usercomments.map((comment, index) => (
        <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`} extra={<a target="_blank" href={`/#/details/${comment.uniquekey}`}>查看</a>}>
          <p>{comment.Comments}</p>
        </Card>
      )) :
      '您还没有发表过任何评论。';
    return (
      <div>
        <PCHeader/>
        <Row>
          <Col span={20} offset={2}>
          <Tabs>
            <TabPane tab="我的收藏列表" key="1">
              <div class="comment">
                <Row>
                  <Col span={24}>
                    {usercollectionList}
                  </Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tab="我的评论列表" key="2">
              <div class="comment">
                <Row>
                  <Col span={24}>
                    {usercommentsList}
                  </Col>
                </Row>
              </div>
            </TabPane>
            <TabPane tab="头像设置" key="3">
              <div class="comment">
                <Row>
                  <Col span={24}>
                    <div className="clearfix">
                      <Upload {...param} onPreview={this.handlePreview.bind(this)} onChange={this.handleChange.bind(this)}>
                        <Modal vasible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                          <img alt="" style={{width:'100%'}} src={this.state.previewImage}/>                          
                        </Modal>
                      </Upload>
                    </div>
                  </Col>
                </Row>
              </div>
            </TabPane>
          </Tabs>
          </Col>
        </Row>
      </div>
    );
  };

};