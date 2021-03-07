import React, { Component } from 'react';
import './LandingCSS/assets/css/main.css';
import './LandingCSS/assets/css/font-awesome.min.css';
import { setLoginSession, getSession } from '../app/CookieSession.js'
import Cookies from 'js-cookie'
import tempicon from './Logo.png'
import styled from 'styled-components'

const BrandName = styled.a.attrs({
  className: 'brandname'
})`
position: absolute;
buttom: 30%;
fontSize: 10px;
text-overflow: ellipsis;
white-space: nowrap;
font-style:normal;
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

const Blank2= styled.div.attrs({
  className: 'blank2'
})`
    margin-left: 0%;
`

const Blank1= styled.div.attrs({
  className: 'blank1'
})`
    margin-left: 15%;
`

const Memeber= styled.div.attrs({
  className: 'members'
})`
    display:flex;
    text-overflow: ellipsis;
  white-space: nowrap;
  font-style:normal;
`

const Memeber1= styled.div.attrs({
  className: 'members1'
})`
    display:flex;
    text-overflow: ellipsis;
  white-space: nowrap;
  font-style:normal;
  margin-left: 30%;
  margin-top: 12%;
`

const Core= styled.div.attrs({
  className: 'cores'
})`
    flex:5;
    margin-left:10%;

`
const Core1= styled.div.attrs({
  className: 'cores'
})`
    flex:5;
    margin-right:"20%";

`

const Navb =  styled.a.attrs({
  className: 'navb'
})`
    margin-top:10px;

`

const Icon1= styled.img.attrs({
  className: 'icon1'
})`
    width:20%;
    height:150%;
    margin-top: -3%;
    float:left;
`

export default class Landing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      username: '',
      logined: false,
      current_page:""
    };
    this.handleCookie = this.handleCookie.bind(this);
  }

  componentDidMount() {
    const temp = Cookies.get("current_page")
    console.log(temp);
    if (temp){
      this.setState({current_page:temp})
    }
    else{
      this.setState({current_page:"main"})
    }
  }

  handleCookie(email){
    setLoginSession();
    Cookies.set('email', email)
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({
      name: this.state.username
    });
    console.log(this.state)
    fetch('http://localhost:3000/api/authenticate', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      console.log(res)
      if (res.status === 200) {
        this.handleCookie(this.state.email)
        this.props.history.push('/myinfo')
        window.location.reload(false);
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in please try again');
    });
  }

  changeContent(value){
    Cookies.set("current_page",value)
    window.location.reload(false);
  }

  render() {
    const showContent=[]
    if(this.state.current_page === "main"){
      showContent.push(<div class="inner"><header><h1>AI Circle</h1></header><div class="flex "><div><p>目標成爲以香港為基地，最成功的人工智能業務引薦組織及互聯消費網</p></div></div></div>)
    }
    else if(this.state.current_page === "intro"){
      showContent.push(<div class="inner"><header><h1>分會簡介</h1></header><div class="flex "><div><p>用戶可以通過分會認識更多的人</p></div></div></div>)
    }
    else if(this.state.current_page === "contact"){
      showContent.push(<div class="inner"><header><h1>聯繫我們</h1></header><div class="flex "><div><p>電話： 123456<br/>電郵: abc@gmail.com</p></div></div></div>)
    }
    console.log(this.state.current_page);
    console.log(showContent[0]);


    return (
      <div>
      <header id="header">
        <div class="inner">
          <nav id="nav">
            <Icon1 class="logo" src={tempicon}/>
            <Navb href="/" onClick={()=> this.changeContent("main")}>主頁</Navb>
            <Navb href="/" onClick={()=> this.changeContent("intro")}>分會簡介</Navb>
            <Navb href="/" onClick={()=> this.changeContent("contact")}>聯繫我們</Navb>
            <Navb href="/login">登入</Navb>
          </nav>
          <a href="#navPanel" class="navPanelToggle"><span class="fa fa-bars"></span></a>
        </div>
      </header>
      <section id="banner">
        {showContent[0]}
      </section>

      <section id="three" class="wrapper align-center">
        <div class="inner">
        <h3>AIC 5個核心元素</h3><p>付出者收穫不論在實體世界或者虛擬世界都是相通的</p>
          <div style={{display:"flex"}}>
          <Core>
            <article>
              <div style={{height:"3em",display:"flex"}}><Memeber><Step1>1</Step1><div style={{flex:"5"}}><p style={{ float:"left",fontSize:"15px", textAlign:"left", margin:"12px"}}>付出者收穫</p></div></Memeber></div>
              <br/>
            </article>
            <article>
              <div style={{height:"3em", display:"flex"}}><Memeber><Step1>2</Step1><div style={{flex:"5"}}><p style={{ float:"left",fontSize:"15px", textAlign:"left", margin:"12px"}}>虛心主動學習</p></div></Memeber></div>
            </article>
            <article>
            <br/>
              <div style={{height:"3em", display:"flex"}}><Memeber><Step1>3</Step1><div style={{flex:"5"}}><p style={{ float:"left",fontSize:"15px", textAlign:"left", margin:"12px"}}>持續創新</p></div></Memeber></div>
            </article>
            <article>
            <br/>
              <div style={{height:"3em", display:"flex"}}><Memeber><Step1>4</Step1><div style={{flex:"5"}}><p style={{ float:"left",fontSize:"15px", textAlign:"left", margin:"12px"}}>全球網上商業網絡</p></div></Memeber></div>
            </article>
            <article>
            <br/>
              <div style={{height:"3em", display:"flex"}}><Memeber><Step1>5</Step1><div style={{flex:"5"}}><p style={{ float:"left",fontSize:"15px", textAlign:"left", margin:"12px"}}>嘉許確認</p></div></Memeber></div>
            </article>
            </Core>
            <div style={{flex:5}}>
            <div style={{display:"flex"}}>
            <Core1>
              <img src='./landing/1.jpeg' style={{ margin:"5px", width:"150px", height:"150px", float:"left"}}/>
            </Core1>
            <Core1>
              <img src='./landing/2.png' style={{ margin:"10px", width:"150px", height:"150px", float:"left"}}/>
            </Core1>
            <Core1>
              <img src='./landing/3.jpeg' style={{ margin:"25px", width:"150px", height:"150px", float:"left"}}/>
            </Core1>
            </div>
            <div style={{display:"flex"}}>
            <Core1>
              <img src='./landing/4.jpeg' style={{ margin:"25px", width:"150px", height:"150px", float:"left"}}/>
            </Core1>
            <Core1>
              <img src='./landing/5.jpeg' style={{ margin:"25px", width:"150px", height:"150px", float:"left"}}/>
            </Core1>
            </div>

            </div>
          </div>
        </div>
      </section>
      </div>

    );
  }
}
