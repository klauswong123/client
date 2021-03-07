import React, { Component } from 'react'
import { useTable } from 'react-table'
import api from '../api'
import styled from 'styled-components'
import tempicon from './aic.png'
import news from './2.jpg'
import share from './chau.jpg'
import Cookies from 'js-cookie'
import './ProfileCSS/main.css';
import Moment from 'react-moment';
import moment from 'moment';

const OutsideContainer =  styled.div.attrs({
    className: 'container',
})`
    margin-top:2%;
    margin-left: 15%;
    margin-right: 15%;
    height:130px;
    display: flex;
`

const OutsideContainer1 = styled.div.attrs({
    className: 'container1',
})`
    display: flex;
`

const Icon1 = styled.img.attrs({
    className: 'container2',
})`
  border-radius: 50%;
`
const Icon = styled.div.attrs({
    className: 'container',
})`
img {
  width: 100px;
  height: 100px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  float: right;
  margin-right: 5%;
  border:2px white;
}

  flex:1;
`


const Intro1 = styled.div.attrs({
    className: 'container3',
})`
    flex:5;
    text-align:left;
`

const Username = styled.span.attrs({
    className: 'username',
})`
  font-size:25px;
  color:#9370DB;
`

const Intro = styled.div.attrs({
    className: 'container',
})`

    flex:2;
    text-align:"left";
    position: "relative";
`

const Outside1 = styled.div.attrs({
    className: 'container1',
})`
  margin-top:1%;
  margin-left:2%;

`


const UpdateNews = styled.div.attrs({
  className: 'UpdateNews'
})`
    text-align: center;
    margin:2%;
    margin-left:20%;
    margin-right:20%;
    margin-bottom:15%;
    display:flex;
`

const NewBlock = styled.div.attrs({
  className: 'newblock'
})`
    width:30px;
    height:30px;
    flex:1;
`

function updateInvite(data){
  return fetch('http://localhost:3000/api/inviteupdate/create', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

function postText(data){
  return fetch('http://localhost:3000/api/chat/create', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

class ViewProfile extends Component {
  constructor(props) {
      super(props)
      this.state = {
          user: {},
          name:'',
          email: '',
          phone_number:'',
          company:'',
          product_name:'',
          product_branch:'',
          business_description:'',
          personal_description:'',
          ifChange: false,
          isLoading: false,
      }
      this.trigerChange = this.trigerChange.bind(this)
  }


  componentDidMount() {
      Cookies.set('current_page','profile')
      let phone_number = this.props.match.params.phone_number
      this.setState({ isLoading: true })
      fetch('http://localhost:3000/api/client?phone_number='+phone_number, {
        method: "GET"
      })
      .then(res => res.json())
          .then((result) => {
        this.setState( { user:result.data,
              name:result.data.name,
              email: result.data.email,
              phone_number:result.data.phone_number,
              product_name:result.data.product_name,
              business_description:result.data.business_description,
              personal_description:result.data.personal_description,
              company:result.data.company,
              product_branch: result.data.product_branch,
            } );
      })
  }

trigerChange(){
  let sender = Cookies.get('name')
  let sender_phone = Cookies.get('phone_number')
  let receiver = this.state.name
  let receiver_phone = this.state.phone_number
  let text = "你好"
  const data ={
    invite_person:sender_phone,
    invite_news:[
      sender,
      receiver
    ],
    invited_person:receiver_phone,
  }
  updateInvite(data)
  const data1 = {
    sender:sender,
    sender_phone:sender_phone,
    receiver:receiver,
    receiver_phone:receiver_phone,
    raw_text:"你好",
  }
  postText(data1)
  this.props.history.push('/chatroom/'+receiver_phone)
}

    render() {
      const pictures = ['./1.png','./2.png','./3.png','./4.png']
      const items3 = []
      const myphone = Cookies.get("phone_number")
      for (const [index, value] of pictures.entries()) {
        items3.push(<NewBlock><img style={{ height:"180px",width: "70%"}} src={news} alt={index} key={index} /><br/></NewBlock>)
      }
        return (
          <div>
          <OutsideContainer>
            <Icon>
              <img src={share} alt="avatar" class="profile-pic" />
            </Icon>
            <Intro><h5><strong>你好！我是 <Username>{this.state.user.name}</Username></strong></h5><p><br /><strong>性別： {this.state.user.gender}</strong><br/><strong>續期到期時間：<Moment date={this.state.user.subscription_due} format="YYYY/MM/DD" /></strong></p></Intro>
            { myphone==this.state.phone_number ?
              <div>
              </div>
              :
            <div class="col-md-2">
              <input type="submit" style={{ textAlign:"center" }}  onClick={this.trigerChange}  name="edit" value="進行對話"/>
            </div>
          }
          </OutsideContainer>
          <hr size="8px" align="center" width="75%" style={{ margin: "auto"  }}></hr>
          <Outside1>
              <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                          <div class="row">
                              <div className="title-row">
                                  <label className="infoType"><strong>產品/服務描述</strong>：</label>
                              </div>
                              <div className="content-row">
                                  <label>{this.state.user.product_name}</label>
                              </div>
                          </div>
                          <div class="row">
                              <div className="title-row">
                                  <label className="infoType"><strong>公司</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</label>
                              </div>
                              <div className="content-row">
                                  <label>{this.state.user.company}</label>
                              </div>
                          </div>
                          <div class="row">
                              <div className="title-row">
                                  <label className="infoType"><strong>分會</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</label>
                              </div>
                              <div className="content-row">
                                  <label><a style={{color:"DarkOrchid",fontSize:"15px",}} href={"http://localhost:8000/viewdivision/"+this.state.phone_number}>{this.state.user.product_branch}</a></label>
                              </div>
                          </div>
                          <div class="row">
                              <div className="title-row">
                                  <label className="infoType"><strong>自我介紹</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;： </label>
                              </div>
                              <div className="content-row">
                                  <label className="self-intro">{this.state.user.personal_description}</label>
                              </div>
                          </div>
              </div>
              <br/>
          </Outside1>
          <hr size="8px" align="center" width="75%" style={{ margin: "auto"  }}></hr>
          <Outside1>
          <h6 className="title-row"><strong>業務簡介：</strong></h6>
          <OutsideContainer1>
            <div style={{flex:"1"}}><Icon src={share}></Icon></div>
            <div>
                <label className="business-intro">{this.state.user.business_description}</label>
            </div>

          </OutsideContainer1>
          <UpdateNews>
            {items3}
          </UpdateNews>
          </Outside1>
          </div>
        )
    }
}

export default ViewProfile
