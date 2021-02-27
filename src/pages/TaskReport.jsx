import React, { Component } from 'react'
import { useTable } from 'react-table'
import api from '../api'
import styled from 'styled-components'
import tempicon from './aic.png'
import news from './1.png'
import Cookies from 'js-cookie'
import fbicon from './facebookicon.png'
import wcicon from './wechaticon.png'
import wtsicon from './whatsappicon.png'
import share from './share.PNG'
import Moment from 'react-moment';
import moment from 'moment';

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const OutsideContainer = styled.div.attrs({
    className: 'container',
})`
    margin-top:2%;
    margin-left: 10%;
    margin-right: 20%;
    display:flex;
`

const LeftWrapper = styled.div.attrs({
    className: 'leftwrapper',
})`
    flex:1;
`

const LeftIntroWrapper = styled.div.attrs({
    className: 'leftintrowrapper',
})`
    border-radius: 30px;
    background-color: Lavender;
    width: 300px;
    height: 220px;
`

const LeftIntroIcon = styled.img.attrs({
  className: 'leftintroicon'
})`
    margin-top:40px;
    margin-left:30px;
    height:50px;
    width: 50px;
    border-radius:30px;
    flex:1;
`

const LeftIntroInfo = styled.div.attrs({
  className: 'leftintroicon'
})`
    flex:4;
    margin-top:30px;
    margin-left:20px;
`

const LeftIntroInfoLower = styled.div.attrs({
  className: 'leftintroiconlower'
})`
    text-align: center;
`

const RightWrapper = styled.div.attrs({
    className: 'rightwrapper',
})`
    flex:2;
    margin-left:;
`

const RightLeftRank = styled.div.attrs({
  className:'rightleftrank'
})`
    margin-left:20%;
    flex:1;
`

const BrandIntro = styled.div.attrs({
  className: 'brandintro'
})`
  felx:3;
  text-align: left;
  width:80%;
`

const RightRightRank = styled.div.attrs({
  className:'rightrightrank'
})`

  flex:1;
`

const UpdateNews = styled.div.attrs({
  className: 'UpdateNews'
})`
    text-align: center;
    margin:20px;
    display:flex;
`
const LeftRecomContent = styled.div.attrs({
    className: 'leftrecomcontent',
})`
    text-align:center;
    margin:5%;
`

const LeftRecomWrapper = styled.div.attrs({
    className: 'leftrecomwrapper',
})`
    border-radius: 20px;
    background-color: Lavender;
    flex:1;
    width: 300px;
    height: 130px;
`

const Invitation_code = styled.p.attrs({
    className: 'Invitation_code',
})`
    font-size:30px;
    margin-top: -20px;
    margin-bottom: -7px;
`

const NewBlock = styled.div.attrs({
  className: 'newblock'
})`
    width:30px;
    height:30px;
    flex:1;
`

const RankOut = styled.div.attrs({
  className: 'rankout'
})`
    display:flex;
    margin-bottom:10px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const Ranking = styled.li.attrs({
    className: `1234`,
})`
    margin-top:0px;
    height: 40px;
`
const Step1 = styled.span.attrs({
  className: 'step'
})`
	background: #9370DB;
border-radius: 1.5em;
-moz-border-radius: 1.5em;
-webkit-border-radius: 1.5em;
color: #ffffff;
display: inline-block;
font-weight: bold;
line-height: 3em;
margin-right: 10px;
text-align: center;
width: 3em;

`



class TaskReport extends Component {
  constructor(props) {
      super(props)
      this.state = {
          user: {},
          users:{},
          phone_number: '',
          isLoading: false,
          invite_members_month:[],
          invite_members:[],
          invite_this_month:0,
          }
      }

    async componentDidMount() {
        Cookies.set('current_page','taskreport')
        let phone_number = Cookies.get('phone_number')
        let invite_members_month = []
        let invite_members = []
        let invite_this_month = 0
        let user = {}
        let users = {}
        let tempuse = []
        await fetch('http://localhost:3000/api/client?phone_number='+phone_number, {
          method: "GET"
        })
        .then(res => res.json())
            .then((result) => {
              user = result.data
        })

        await fetch('http://localhost:3000/api/getclients', {
          method: "GET"
        })
        .then(res => res.json())
            .then((result) => {
              tempuse = result.data
              for (const [index, value] of tempuse.entries()) {
              users[value.phone_number] = value
            }
            console.log(users);
        })

        await fetch('http://localhost:3000/api/getmonthinvites', {
          method: "GET"
        })
        .then(res => res.json())
            .then((result) => {
          if (result.data){
            invite_members_month = result.data
          }
        })
        await fetch('http://localhost:3000/api/getinvites', {
          method: "GET"
        })
        .then(res => res.json())
            .then((result) => {
          if (result.data){
            console.log(result.data);
            invite_members = result.data
          }
        })

        await fetch('http://localhost:3000/api/getinvite?invite_person='+phone_number, {
          method: "GET"
        })
        .then(res => res.json())
            .then((result) => {
          if (result.data){
            invite_this_month = result.data.length
          }
        })
        this.setState({invite_members:invite_members, invite_members_month:invite_members_month, users:users,user:user,isLoading:true, invite_this_month:invite_this_month})
    }

    countInArray(array, value) {
      return array.reduce((n, x) => n + (x === value), 0);
    }

    getUnique(array){
        var uniqueArray = [];
        for(var i=0; i < array.length; i++){
            if(uniqueArray.indexOf(array[i]) === -1) {
                uniqueArray.push(array[i]);
            }
        }
        return uniqueArray;
    }

    sortNumber(a,b) {
       return a - b;
    }


    render() {
      //all memeber rank
        const invite_members =  this.state.invite_members
        const all_users = this.state.users
        const temp_invite_members = []
        const rank_all = []
        const rank_all_pho = []
        const output = {}
        for (const [index, value] of invite_members.entries()) {
          temp_invite_members.push(value['invite_person'])
        }
        const unique_invite_members = this.getUnique(temp_invite_members)
        for (const [index, value] of unique_invite_members.entries()) {
          rank_all.push(this.countInArray(temp_invite_members, value))
        }
        rank_all.sort( function(a, b){return b-a})
        for (const [index1, value1] of rank_all.entries()) {
          for (const [index, value] of unique_invite_members.entries()) {
            if(value1 == this.countInArray(temp_invite_members, value)){
              rank_all_pho.push(value)
            }
          }
        }
        const rank_all_pho_1 = this.getUnique(rank_all_pho)
        const rank = [rank_all_pho_1[0],rank_all_pho_1[1],rank_all_pho_1[2]];
        const joblist = []
        const namelist = []
        for (const [index, value] of rank.entries()) {
          for(var key in all_users[value]){
            if(key=='occupation'){
              joblist.push(all_users[value][key]);
            }
            if(key=='name'){
              namelist.push(all_users[value][key]);
            }
          }
        }
        const jobs =joblist
        const rank1 = namelist
        //this month rank
        const invite_members_month =  this.state.invite_members_month
        const temp_invite_members_month = []
        const rank_all_month = []
        const rank_all_pho_month = []
        const output_month = {}
        for (const [index, value] of invite_members_month.entries()) {
          temp_invite_members_month.push(value['invite_person'])
        }
        const unique_invite_members_month = this.getUnique(temp_invite_members_month)
        for (const [index, value] of unique_invite_members_month.entries()) {
          rank_all_month.push(this.countInArray(temp_invite_members_month, value))
        }
        rank_all_month.sort( function(a, b){return b-a})
        for (const [index1, value1] of rank_all_month.entries()) {
          for (const [index, value] of unique_invite_members_month.entries()) {
            if(value1 == this.countInArray(temp_invite_members_month, value)){
              rank_all_pho_month.push(value)
            }
          }
        }
        const rank_all_pho_1_month = this.getUnique(rank_all_pho_month)
        const rank_month = [rank_all_pho_1_month[0],rank_all_pho_1_month[1],rank_all_pho_1_month[2]];
        const joblist_month = []
        const namelist_month = []
        for (const [index, value] of rank_month.entries()) {
          for(var key in all_users[value]){
            if(key=='occupation'){
              joblist_month.push(all_users[value][key]);
            }
            if(key=='name'){
              namelist_month.push(all_users[value][key]);
            }
          }
        }
        const rank2 = namelist_month
        const job2 = joblist_month
        const items1 = []
        const items2 = []
        for (const [index, value] of rank1.entries()) {
          items1.push(<RankOut><Step1>{index+1}</Step1><Ranking key={index}><a style={{color:"DarkOrchid",fontSize:"15px",}} href={"viewprofile/"+rank[index]}>{value}</a><br/>{jobs[index]}</Ranking></RankOut>)
        }
        for (const [index, value] of rank2.entries()) {
          items2.push(<RankOut><Step1>{index+1}</Step1><Ranking key={index}><a style={{color:"DarkOrchid",fontSize:"15px",}} href={"viewprofile/"+rank_month[index]}>{value}</a><br/>{job2[index]}</Ranking></RankOut>)
        }
        const pictures = ['./1.png','./2.png','./3.png','./4.png']
        const items3 = []
        for (const [index, value] of pictures.entries()) {
          items3.push(<NewBlock><img style={{width: "60%", margin:"15px"}} src={news} alt={index} key={index} /><br/><p>News {index}</p></NewBlock>)
        }
        const icons = [fbicon, wcicon ,wtsicon]
        const items5 = []
        for (const [index, value] of icons.entries()) {
          items5.push(<img style={{width: "20%", margin:"5px"}} src={value} alt={index} key={index} />)
        }

        const invite_member = this.state.user.invitated_people
        const accept_member = this.state.user.accept_member
        const invite_number = 0
        const accept_number = 0
        if (invite_member){
          const invite_number = invite_member.length
        }
        if (accept_member){
        const accept_number = accept_member.length
      }

        return (
          <div>
          <OutsideContainer>
            <LeftWrapper>
              <p style={{  fontSize:22, fontWeight: 'bold', textAlign: 'center'}}>歡迎回來!  {this.state.user.name}</p>
              <LeftIntroWrapper>
              <div style={{display:"flex"}}>
                <LeftIntroIcon src={tempicon} />
                <LeftIntroInfo><p>名稱:  {this.state.user.name}<br />分會： {this.state.user.product_branch}<br />訂閲到期： <Moment date={this.state.user.subscription_due} format="YYYY/MM/DD" /></p></LeftIntroInfo>
              </div>
                <LeftIntroInfoLower><p>本月推薦累計： {this.state.invite_this_month}人<br />連續推薦累計：{invite_number}人<br />接受推薦累計：{accept_number}人</p></LeftIntroInfoLower>
              </LeftIntroWrapper>
              <LeftRecomWrapper>
                <LeftRecomContent><br /><p>我的專屬邀請碼：</p><Invitation_code><strong>{this.state.user.invitation_code}</strong></Invitation_code><p>請指示來賓申請時輸入邀請碼</p></LeftRecomContent>
              </LeftRecomWrapper>
              <BrandIntro>
                <img src={share} />
                <br/>
                <form>
                <InputText
                    type="text"
                    placeholder="請輸入郵箱"
                    type="email"
                />
                <Button >發送</Button>

                </form>
              </BrandIntro>
            </LeftWrapper>
            <RightWrapper>
              <h3 style={{ textAlign:"center" }}>排行榜</h3>
              <p style={{ textAlign:"center"}}>付出者收穫，虛心主動學習，持續創新，全球商業網絡，嘉許確認</p>
              <hr size="8px" align="center" width="100%" />
              <div style={{display:"flex"}}>
              <RightLeftRank>
                <h6 style={{ margin:"15px" }}>本月推薦纍計排行</h6><br />
                {items2}
              </RightLeftRank>
              <RightRightRank>
                <h6 style={{ margin:"15px" }}>連續推薦纍計排行</h6><br />
                {items1}
              </RightRightRank>
              </div>
              <hr size="8px" align="center" width="100%"></hr>
              <p>最新消息</p>
              <UpdateNews>
                {items3}
              </UpdateNews>
            </RightWrapper>
          </OutsideContainer>
          </div>
        )
    }
}

export default TaskReport
