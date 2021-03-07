import React, { Component } from 'react';
import './LoginCSS/css/main.css';
import './LoginCSS/css/util.css';
import styled from 'styled-components'
import { setLoginSession, getSession } from '../app/CookieSession.js'
import Cookies from 'js-cookie'
import tempicon from './Logo.png'

const ButtonLink= styled.button.attrs({
  className: 'buttonlink'
})`
  background: none!important;
  border: none;
  padding: 0!important;
  /*optional*/
  font-family: arial, sans-serif;
  /*input has OS specific font-family*/
  color: #069;
  text-decoration: underline;
  cursor: pointer;
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

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      auth_way :"email",
      phone_number : '',
      token: '',
      logined: false,
      return_token:'',
      ifTriger:false,
    };
    this.handleCookie = this.handleCookie.bind(this);
    this.changeAuth = this.changeAuth.bind(this);
  }

  componentDidMount() {
    const isLogin = Cookies.get('isLogin')
        if (isLogin) {
          this.props.history.push('/')
        }
  }

  handleCookie(token, phone_number,name){
    setLoginSession();
    Cookies.set('token', token)
    Cookies.set('phone_number', phone_number)
    Cookies.set('name',name)
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.auth_way=="phone"){
    this.setState({
      phone_number: this.state.phone_number,
      token: this.state.token,
      email:""
    });
  }
  else{
    this.setState({
      email: this.state.email,
      token: this.state.token,
      phone_number:""
    });
  }

    fetch('http://localhost:3000/api/authenticate', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
          .then((result) => {
      if (result.status === 200 && this.state.token===this.state.return_token ) {
        this.handleCookie(this.state.token,result.phone_number,result.name)
        this.props.history.push('/myinfo')
        window.location.reload(false);
      }
      else if(this.state.token!=this.state.return_token){
        alert("驗證碼錯誤");
      }
      else if (result.error){
        alert(result.error)
      }
    })
  }

sendSMS = (event) => {
    event.preventDefault();
    this.setState({
      phone_number: this.state.phone_number,
      ifTriger:true
    });
    fetch('http://localhost:3000/api/sendSMS', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
        .then((result) => {
      this.setState({"return_token":result.token})
    })
    .catch(err => {
      console.error(err);
      alert('手機號不存在! 僅支持香港電話!');
    });
  }


  sendEmail = (event) => {
      event.preventDefault();
      this.setState({
        email: this.state.email,
        ifTriger:true
      });
      fetch('http://localhost:3000/api/sendEmail', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => res.json())
          .then((result) => {
        this.setState({"return_token":result.token})
      })
      .catch(err => {
        console.error(err);
        alert('郵箱不存在!');
      });
    }

    changeContent(value){
      Cookies.set("current_page",value)
      window.location.reload(false);
    }
    
    changeAuth(){
      if(this.state.auth_way==="phone"){
      this.setState({auth_way:"email"})
      }
      else{
        this.setState({auth_way:"phone"})
    }
    }

  render() {


    return (
      	<div class="limiter">
        <header id="header">
          <div class="inner">
            <nav id="nav">
              <Icon1 class="logo" src={tempicon}/>
              <Navb style={{color: "#000000"}} href="/" onClick={()=> this.changeContent("main")}>主頁</Navb>
              <Navb style={{color: "#000000"}} href="/" onClick={()=> this.changeContent("intro")}>分會簡介</Navb>
              <Navb style={{color: "#000000"}} href="/" onClick={()=> this.changeContent("contact")}>聯繫我們</Navb>
              <Navb style={{color: "#000000"}} href="/login">登入</Navb>
            </nav>
            <a href="#navPanel" class="navPanelToggle"><span class="fa fa-bars"></span></a>
          </div>
        </header>
        <style type="text/css">
          {`.navbar {display: none}`}
        </style>
      		<div class="container-login100">
      			<div class="wrap-login100 p-t-50 p-b-90">
      				<form class="login100-form validate-form flex-sb flex-w" onSubmit={this.onSubmit}>
      					<span class="login100-form-title p-b-51">
      						Login
      					</span>
                <div style={{display:"flex", width:"500px"}}>
                {this.state.auth_way==="phone" &&
      					<div class="wrap-input100 validate-input m-b-16" data-validate = "輸入手機號碼" style={{flex:5}}>
      						<input class="input100"
                            type="text"
                            name="phone_number"
                            placeholder="輸入手機號碼"
                            value={this.state.phone_number}
                            onChange={this.handleInputChange}
                            required />
      						<span class="focus-input100"></span>
      					</div>
              }
              {this.state.auth_way==="email" &&
              <div class="wrap-input100 validate-input m-b-16" data-validate = "輸入郵箱" style={{flex:5}}>
                <input class="input100"
                          type="email"
                          name="email"
                          placeholder="輸入郵箱"
                          value={this.state.email}
                          onChange={this.handleInputChange}
                          required />
                <span class="focus-input100"></span>
              </div>
            }
            { this.state.auth_way==="phone"?
                 (this.state.ifTriger) ?
                  <button class="login100-form-btn" style={{flex:1, height:"52px"}} disabled>已傳送</button>
                  :
                <button onClick={this.sendSMS} class="login100-form-btn" style={{flex:1, height:"52px"}}>傳送驗證碼</button>
              :
               (this.state.ifTriger) ?
                <button class="login100-form-btn" style={{flex:1, height:"52px"}} disabled>已傳送</button>
                :
              <button onClick={this.sendEmail} class="login100-form-btn" style={{flex:1, height:"52px"}}>傳送驗證碼</button>

          }
                </div>
      					<div class="wrap-input100 validate-input m-b-16" data-validate = "輸入驗證碼">
      						<input class="input100"
                            type="text"
                            name="token"
                            placeholder="輸入驗證碼"
                            value={this.state.token }
                            onChange={this.handleInputChange}
                            required />
      						<span class="focus-input100"></span>
      					</div>
                <div>
                { this.state.auth_way=="phone" ?
                <ButtonLink onClick={this.changeAuth}>使用郵箱登錄</ButtonLink>
                :
                <ButtonLink onClick={this.changeAuth}>使用電話登錄</ButtonLink>
                }
                </div>
      					<div class="container-login100-form-btn m-t-17">
      						<button class="login100-form-btn" type="submit" value="Submit" >
      							Login
      						</button>
      					</div>

      				</form>
      			</div>
      		</div>
      	</div>

    );
  }
}
