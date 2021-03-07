import React, { Component } from 'react'
import { useTable } from 'react-table'
import api from '../api'
import styled from 'styled-components'
import tempicon from './aic.png'
import news from './1.png'
import Cookies from 'js-cookie'
import Moment from 'react-moment';
import moment from 'moment';


const OutsideContainer = styled.div.attrs({
    className: 'container',
})`
    margin-top:2%;
    margin-left: 10%;
    margin-right: 20%;
    display:flex;
`

const LeftMainFragment = styled.div.attrs({
  className: 'leftmain',
})`
  felx:5;
  margin:20px;
  width:100%
`

const RightMainFragment = styled.div.attrs({
  className: 'rightmain',
})`
  felx:2;
  margin-bottom:10px;
  width:200px;
  height:50px;
`

const BrandLogo = styled.div.attrs({
  className: 'brandlogo'
})`
  felx:2;
  text-align: center;
`

const BrandIntro = styled.div.attrs({
  className: 'brandintro'
})`
  felx:5;
  margin-left:10%;
  width:80%;
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
    margin:5%;
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
    width:100px;
    display:flex;
    text-overflow: ellipsis;
  white-space: nowrap;
  font-style:normal;
  margin:10px;
`



class Friends extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user:[],
            group:{},
            group_description:"",
            final_target:"",
            phone_number: '',
            isLoading: false,
            member_number:0,
            ifChange:false,
        }
        this.trigerChange = this.trigerChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this)
    }

    async componentDidMount() {
        let phone_number = Cookies.get('phone_number')
        Cookies.set('current_page','friends')
        let searchKey = ''
        let user = []
        let group = []
        this.setState({ isLoading: true })
        await fetch('http://localhost:3000/api/client?phone_number='+phone_number, {
          method: "GET"
        })
        .then(res => res.json())
            .then((result) => {
          searchKey=result.data.product_branch;
        })
        this.setState({ isLoading: true })
        await fetch('http://localhost:3000/api/groupclients?group_name='+searchKey, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(res => res.json())
            .then((result) => {
              let users = result.data
          for (var key in users) {
            user.push(users[key]);
          }
        })
        await fetch('http://localhost:3000/api/getgroup?group_name='+searchKey, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(res => res.json())
            .then((result) => {
          group = result.data
        })
        this.setState({ user: user, group: group, member_number: group.members.length, final_target:group.target,group_description:group.group_description  })
    }


    trigerChange(e){
      this.setState({ ifChange:true })
    }


    handleChange(e){
      e.persist();
      this.setState(prevState => ({
        item: { ...prevState.item,  [e.target.name]: e.target.value }
      }))
    }

    handleRedirect(phone_number){
      Cookies.set('check_number',phone_number)
      this.props.history.push('/checkinfo/'+phone_number)
    }

    handleInputChange = (event) => {
      const { value, name } = event.target;
      this.setState({
        [name]: value
      });
    }

    submieChange = (event) => {
      this.setState({ ifchange:false })
      const data = {
        group_description: this.state.group_description,
        target: this.state.final_target,
      }
      event.preventDefault();
      fetch('http://localhost:3000/api/group/update/'+this.state.group._id, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        if (res.status === 200) {
          window.location.reload(false);
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert('修改出錯，請聯絡系統管理員');
      });
    }

    render() {
        const user = this.state.user
        const items1 = []
        var members =[]
        var phone_numbers=[]
        var jobs=[]
        user.filter(function(item, index, array){
            jobs.push(array[index].occupation)
            members.push(array[index].name)
            phone_numbers.push(array[index].phone_number)
        });
        for (const [index, value] of members.entries()) {
          items1.push(<div style={{height:"50px"}}><Memeber><img src={tempicon} style={{ margin:"5px", width:"40px", height:"40px",flex:"2"}}/><div style={{flex:"5"}}><p style={{color:"DarkOrchid",fontSize:"15px",}}>&nbsp;&nbsp;<a style={{ color:"DarkOrchid" }} href={"http://localhost:8000/viewprofile/"+phone_numbers[index]}>{value}</a><br/>&nbsp;&nbsp;{jobs[index]}</p></div></Memeber></div>)
        }
        const pictures = ['./1.png','./2.png','./3.png','./4.png']
        const items3 = []
        for (const [index, value] of pictures.entries()) {
          items3.push(<NewBlock><img style={{ height:"180px",width: "70%"}} src={news} alt={index} key={index} /><br/></NewBlock>)
        }

        return (
          <div>
          <OutsideContainer>
            <LeftMainFragment>
            <form onSubmit={this.submieChange}>
              <div style={{display:"flex"}} className="brandInfo">
                <BrandLogo>
                  <h4>{this.state.group.group_name}</h4>
                  <br />
                  <img src={tempicon} style={{width:"200px", height:"200px"}}/>
                </BrandLogo>
                <BrandIntro>
                <div style={{ display:"flex" }}>
                <div style={{ flex:4 }}>
                  <p style={{ fontSize: 14, color: 'gray' }}>{this.state.group.group_description}</p>
                  { this.state.ifChange &&  <div className="self-intro"><input type="text" name="group_description" value={this.state.group_description} placeholder="分會介紹" onChange={this.handleInputChange}/></div>  }
                  </div>
                  <div style={{ flex:1 }}>
                  { !this.state.ifChange ?
                      <input type="submit" style={{ textAlign:"center" }}  onClick={this.trigerChange} value="修改資料"/>
                      :
                      <div>
                      <br/>
                      <input type="submit" style={{ textAlign:"center" }}  name="submit" value="提交修改"/>
                      </div>
                  }
                  </div>
                  </div>
                  <br/> <br/>
                  <Title style={{ fontSize: 18 }}>成立日期</Title>
                  <p><Moment date={this.state.group.createdAt} format="YYYY/MM/DD"></Moment></p>
                  <Title style={{ fontSize: 18 }}>會員人數</Title>
                  <p>{this.state.member_number}</p>
                  <Title style={{ fontSize: 18 }}>宗旨</Title>
                  <p>{this.state.group.target}</p>
                  { this.state.ifChange &&  <div className="self-intro"><input type="text" name="final_target" value={this.state.final_target} placeholder="分會介紹" onChange={this.handleInputChange}/></div>  }
                </BrandIntro>
              </div>
              <UpdateNews>
                {items3}
              </UpdateNews>
              </form>
            </LeftMainFragment>
            <RightMainFragment>
              <p>成員列表</p>
              {items1}
            </RightMainFragment>
          </OutsideContainer>
          </div>
        )
    }
}

export default Friends
