import React, { Component } from 'react'
import { useTable } from 'react-table'
import api from '../api'
import styled from 'styled-components'
import tempicon from './aic.png'
import news from './1.png'
import share from './share.PNG'
import Cookies from 'js-cookie'
import fbicon from './facebookicon.png'
import wcicon from './wechaticon.png'
import wtsicon from './whatsappicon.png'
import Moment from 'react-moment';
import moment from 'moment';

const OutsideContainer = styled.div.attrs({
    className: 'container',
})`
    margin-top:2%;
    margin-left: 13%;
    margin-right: 5%;
    display:flex;
`

const LeftMainFragment = styled.div.attrs({
  className: 'leftmain',
})`
float: left;
flex:4;
`

const RightMainFragment = styled.div.attrs({
  className: 'rightmain',
})`
flex:2;
margin-left:30px;
`

const BrandLogo = styled.div.attrs({
  className: 'brandlogo'
})`
  felx:2;
  margin:20px;
  text-align: center;
`

const BrandIntro = styled.div.attrs({
  className: 'brandintro'
})`
  felx:3;
  margin-top:20px;
  margin-left:100px;
  text-align: left;
`

const Title = styled.div.attrs({
  className: 'title'
})`
  font-weight: bold;
`

const UpdateNews = styled.div.attrs({
  className: 'UpdateNews'
})`
    text-align: center;
    margin:20px;
    display:flex;
`

const NewBlock = styled.div.attrs({
  className: 'newblock'
})`
    width:30px;
    height:30px;
    flex:1;
`

const Memeber= styled.div.attrs({
  className: 'members'
})`
    width:80%;
    display:flex;
`

const LeftIntroWrapper = styled.div.attrs({
    className: 'leftintrowrapper',
})`
    border-radius: 30px;
    background-color: Lavender;
    width: 300px;
    height: 220px;
`

const LeftRecomWrapper = styled.div.attrs({
    className: 'leftrecomwrapper',
})`
    margin:20px;
    border-radius: 20px;
    background-color: Lavender;
    flex:1;
    width: 250px;
    height: 90px;
`
const LeftRecomContent = styled.div.attrs({
    className: 'leftrecomcontent',
})`
    text-align:center;
    font-size:18px;
    margin:4%;
`


const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const Divideline = styled.div.attrs({
    className: 'leftrecomcontent',
})`
    border:1px solid;
    float:left;
    color:#A9A9A9;
    background-color:#A9A9A9
    border-color: #A9A9A9;
    height:600px;
`
const Divideline1 = styled.div.attrs({
    className: 'leftrecomcontent',
})`
  border:1px solid;
  float:left;
  color:#A9A9A9;
  background-color:#A9A9A9;
  margin-left:8%;
  border-color: #A9A9A9;
    height:435px;
`


const LeftRecom = styled.div.attrs({
    className: 'leftrecomcontent',
})`
    flex:1;
    margin-left: 20px;
`

const RightRecom = styled.div.attrs({
    className: 'rightrecom',
})`
    margin-right:10%;
    margin-left: 10px;
    flex:1;
`

const InoneLine =  styled.div.attrs({
    className: 'inoneline',
})`
    overflow: hidden;
    white-space: nowrap;
    display:flex;
    width:120%;
`
class RecommandFD extends Component {
  constructor(props) {
      super(props)
      this.state = {
          user: {},
          phone_number: '',
          isLoading: false,
          invite_this_month: 0,
          Meinvite_person:[],
          Whoinvite_person:[],
          newinvite_new:[]
      }
  }

    async componentDidMount() {
        Cookies.set('current_page','recommand')
        let phone_number = Cookies.get('phone_number')
        let invite_members = 0
        let user = {}
        let meinvite = []
        let whoinvite= []
        let newinvite_new=[]
        await fetch('http://localhost:3000/api/getinvite/invite?invite_person='+phone_number, {
          method: "GET"
        })
        .then(res => res.json())
            .then((result) => {
          if (result.data){
            meinvite = result.data
          }
          else{
            meinvite = []
          }
        })

        await fetch('http://localhost:3000/api/getinvite/invited?invited_person='+phone_number, {
          method: "GET"
        })
        .then(res => res.json())
            .then((result) => {
          if (result.data){
            whoinvite = result.data
          }
          else{
            whoinvite = []
          }
        })

        await fetch('http://localhost:3000/api/getinvites', {
          method: "GET"
        })
        .then(res => res.json())
            .then((result) => {
          if (result.data){
            newinvite_new = result.data
          }
          else{
            newinvite_new = []
          }
        })

        await fetch('http://localhost:3000/api/client?phone_number='+phone_number, {
          method: "GET"
        })
        .then(res => res.json())
            .then((result) => {
              user = result.data
        })

        await fetch('http://localhost:3000/api/getinvite?invite_person='+phone_number, {
          method: "GET"
        })
        .then(res => res.json())
            .then((result) => {
          if (result.data){
            invite_members = result.data.length
          }
        })
        this.setState( { user:user, invite_this_month:invite_members,newinvite_new:newinvite_new, Meinvite_person:meinvite, Whoinvite_person:whoinvite, isLoading:true, phone_number:phone_number } )
    }

    render() {
        const members = this.state.Meinvite_person
        const items1 = []
        for (const [index, value] of members.entries()) {
          items1.push(<div style={{"display":"flex"}}><div style={{"flex":"4"}}><a style={{color:"DarkOrchid",fontSize:"15px",}} href={"viewprofile/"+value['invite_person']}>{value['invite_news'][0]}</a>&nbsp;推薦了&nbsp;<a style={{color:"DarkOrchid",fontSize:"15px",}} href={"viewprofile/"+value['invited_person']}>{value['invite_news'][1]}</a></div><div style={{"flex":"2"}}><Moment style={{"float":"right","color":"#808080"}} date={value['invite_date']} format="YYYY/MM/DD" /></div></div>)
        }
        const members1 = this.state.Whoinvite_person
        const items2 = []
        for (const [index, value] of members1.entries()) {
          items2.push(<div style={{"display":"flex"}}><div style={{"flex":"4"}}><a style={{color:"DarkOrchid",fontSize:"15px",}} href={"viewprofile/"+value['invite_person']}>{value['invite_news'][0]}</a>&nbsp;推薦了&nbsp;<a style={{color:"DarkOrchid",fontSize:"15px",}} href={"viewprofile/"+value['invited_person']}>{value['invite_news'][1]}</a></div><div style={{"flex":"2"}}><Moment style={{"float":"right","color":"#808080"}} date={value['invite_date']} format="YYYY/MM/DD" /></div></div>)
        }
        const members2 = this.state.newinvite_new
        const items3 = []
        for (const [index, value] of members2.entries()) {
          items3.push(<InoneLine><div style={{"flex":"4"}}><a style={{color:"DarkOrchid",fontSize:"15px" }} href={"viewprofile/"+value['invite_person']}>{value['invite_news'][0]}</a>&nbsp;推薦了&nbsp;<a style={{color:"DarkOrchid",fontSize:"15px",}} href={"viewprofile/"+value['invited_person']}>{value['invite_news'][1]}</a></div><div style={{"flex":"2"}}>&nbsp;&nbsp;&nbsp;<Moment style={{"float":"right","color":"#808080"}} date={value['invite_date']} format="YYYY/MM/DD" /></div></InoneLine>)
        }
        const name = ''
        const intviteList = this.state.Meinvite_person
        var accept_number = 0
        console.log(intviteList);
        for(const value of intviteList){
          if (value.accepted){
            accept_number = accept_number+1
          }
        }
        const invite_member = this.state.Meinvite_person.length
        const invite_number = 0
        if (invite_member){
          const invite_number = invite_member.length
        }

        return (
          <div>
          <OutsideContainer>
            <LeftMainFragment>
              <div style={{display:"flex"}} className="recommandinfo">
              <LeftRecomWrapper>
                <LeftRecomContent><p><strong>連續推薦累計</strong></p><p><strong>{invite_member} 人</strong></p></LeftRecomContent>
              </LeftRecomWrapper>
              <LeftRecomWrapper>
                <LeftRecomContent><p><strong>本月推薦累計</strong></p><p><strong>{this.state.invite_this_month} 人</strong></p></LeftRecomContent>
              </LeftRecomWrapper>
              <LeftRecomWrapper>
                <LeftRecomContent><p><strong>接受推薦累計</strong></p><p><strong>{accept_number} 人</strong></p></LeftRecomContent>
              </LeftRecomWrapper>
              </div>
              <div style={{display:"flex"}}>
              <LeftRecom>
              <p>你被誰推薦了？</p>
              {items2}
              </LeftRecom>
              <Divideline1></Divideline1>
              <RightRecom>
              <p>你的推薦記錄</p>
              {items1}
              </RightRecom>
              </div>
            </LeftMainFragment>
            <Divideline></Divideline>
            <RightMainFragment>
              <p>新增人脈</p>
              {items3}
            </RightMainFragment>
          </OutsideContainer>
          </div>
        )
    }
}

export default RecommandFD
