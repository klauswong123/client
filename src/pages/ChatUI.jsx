import React, { Component } from 'react';
import './ChatCSS/main.css';
import styled from 'styled-components'
import { setLoginSession, getSession } from '../app/CookieSession.js'
import Cookies from 'js-cookie'
import Moment from 'react-moment';
import moment from 'moment';

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

function sortTextByTime(arr){
  let temp = []
  for (let value of arr){
    temp.push(arr)
  }
  temp.sort(function(a, b) {
    var keyA = new Date(a.createdAt),
      keyB = new Date(b.createdAt);
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  })
  return arr
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

function updateInvite(data){
  return fetch('http://localhost:3000/api/findinviteupdate', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

export default class ChatUI extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sumchat:[],
      allchats:[],
      currentchat:[],
      text:"",
      receivers:[],
      receivers_phone:[],
      myname:'',
      receiver_text:[],
      send_text:'',
      current_fd:'',
      current_fd_phone:'',
      ifTalking:false,
      firstChat:{},
      secChat:{},
    };
    this.getCurrentChat = this.getCurrentChat.bind(this);
    this.UpdateChat = this.UpdateChat.bind(this);
  }

  scrollToBottom = () => {
    this.listContainer.scrollTop = this.listContainer.scrollHeight;
  }

  async componentDidMount() {
      this.scrollToBottom();
      Cookies.set('current_page','chatroom')
      let receiver_phone =  this.props.match.params.receiver
      let receiver_list = []
      let receivers_phone= []
      let phone_number = Cookies.get('phone_number')
      await fetch('http://localhost:3000/api/chatroom', {
        method: 'POST',
        body: JSON.stringify({'sender':phone_number}),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => res.json())
          .then((result) => {
            for (let value of result.data) {
              receiver_list.push(value.receiver)
              receivers_phone.push(value.receiver_phone)
            }
            if (receiver_list.length >0){
            let receivers = [...new Set(receiver_list)]
            let receiversphone = [...new Set(receivers_phone)]
            this.setState({receivers:receivers, receivers_phone:receiversphone})
          }
      })
       await fetch('http://localhost:3000/api/chats', {
         method: 'GET',
       }).then(res => res.json())
           .then((result) => {
             this.setState({sumchat:result.data})
       })
       console.log(this.state.sumchat);
       const forallchat = []
       if (this.state.sumchat.length>0){
       for (const singlechat of this.state.sumchat){
         if (singlechat.receiver_phone===phone_number){
           let myname = singlechat.receiver
           this.setState({secChat:singlechat,myname:myname})
           break;
         }
         else if (singlechat.sender_phone===phone_number){
           let myname = singlechat.sender
           this.setState({firstChat:singlechat,myname:myname})
           break;
         }
       }
       for (const singlechat of this.state.sumchat){
         if (singlechat.receiver_phone===phone_number){
           forallchat.push(singlechat)
         }
         else if (singlechat.sender_phone===phone_number){
           forallchat.push(singlechat)
       }
     }
   }
   console.log(forallchat);
   this.setState({allchats:forallchat})
       let returnvalue=[]
       let sendtexts = []
       let receivetexts = []
       let name = ''
       if (receiver_phone==='none'){
         if (this.state.firstChat){
           receiver_phone=this.state.firstChat.receiver_phone
         }
         else if (this.state.secChat){
           receiver_phone=this.state.firstChat.sender_phone
         }
         for (let value of this.state.allchats){
           if(value.receiver_phone===receiver_phone && value.sender_phone===phone_number){
             receivetexts.push(value)
             name = value.receiver
           }
           else if(value.sender_phone===receiver_phone && value.receiver_phone===phone_number){
             receivetexts.push(value)
           }
         }
         this.setState({currentchat:receivetexts, current_fd:name, ifTalking:true, current_fd_phone:receiver_phone})
       }
       else{
         for (let value of this.state.allchats){
           if(value.receiver_phone===receiver_phone && value.sender_phone===phone_number){
             receivetexts.push(value)
             name = value.receiver
           }
           else if(value.sender_phone===receiver_phone && value.receiver_phone===phone_number){
             receivetexts.push(value)
           }
         }
         this.setState({currentchat:receivetexts, current_fd:name, ifTalking:true, current_fd_phone:receiver_phone})
       }
  }
  componentDidUpdate() {
  this.scrollToBottom();
}

  getCurrentChat(receiver_phone, name){
    let returnvalue=[]
    let sendtexts = []
    let receivetexts = []
    let phone_number = Cookies.get('phone_number')
    for (let value of this.state.allchats){
      if(value.receiver_phone===receiver_phone && value.sender_phone===phone_number){
        receivetexts.push(value)
      }
      else if(value.sender_phone===receiver_phone && value.receiver_phone===phone_number){
        receivetexts.push(value)
      }
    }
    this.setState({currentchat:receivetexts, current_fd:name, ifTalking:true, current_fd_phone:receiver_phone})
  };


  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  UpdateChat(e){
    let phone_number = Cookies.get('phone_number')
    let username = this.state.myname
    let date = new Date()
    const data ={
      sender:username,
      sender_phone:phone_number,
      receiver:this.state.current_fd,
      receiver_phone:this.state.current_fd_phone,
      raw_text:this.state.send_text,
    }
    postText(data)
    const data1 = {
      invited_person:phone_number,
      invite_person:this.state.current_fd_phone,
      accepted:true,
    }
    updateInvite(data1)
    const usedata ={
      sender:username,
      sender_phone:phone_number,
      receiver:this.state.current_fd,
      receiver_phone:this.state.current_fd_phone,
      raw_text:this.state.send_text,
      createdAt:date,
      }
      const updatedata =this.state.allchats
      updatedata.push(usedata)
      this.setState({allchats:updatedata})

  }


  render() {
    const receiver_list = this.state.receivers
    const receivers_phone = this.state.receivers_phone
    const mePhone = Cookies.get('phone_number')
    const items1 = []
    const items2=[]

    if (receiver_list.length>1){
    for (const [index,value] of receiver_list.entries())  {
      items1.push( <li onClick={() => this.getCurrentChat(this.state.receivers_phone[index],value)}>
            				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""  />
            				<div style={{"margin":"18px"}}>
            					<h3 style={{"fontSize":"15px"}}>{value}</h3>
            				</div>
            			</li>)
    }
    const texts = this.state.currentchat
    console.log( this.state.currentchat);
    for (const [index,value] of texts.entries())  {
      items2.push(
        <div>
        { value.sender_phone===mePhone ?
          <li class="me">
            <div class="entete">
              <h3><Moment date={value.createdAt} format="YYYY/MM/DD HH:MM" /></h3>
              <h2>{this.state.sender}</h2>
              <span class="status blue"></span>
            </div>
            <div class="triangle"></div>
            <div class="message">
              {value.raw_text}
            </div>
          </li>
          :
          <li className="you">
              <div class="entete">
                <span class="status green"></span>
                <h2>{value.sender}&nbsp;&nbsp;</h2>
                <h3><Moment date={value.createdAt} format="YYYY/MM/DD HH:MM" /></h3>
              </div>
              <div class="triangle"></div>
              <div class="message">
                {value.raw_text}
              </div>
            </li>
                }
          </div>)
    }
  }

    return (
      <div id="container">
      <aside>
      		<header>
      			<h5 style={{"color":"DarkOrchid"}}>聊天室</h5>
      		</header>
      		<ul>
            {items1}
      		</ul>
      	</aside>
      	<main>
      		<header>
          { this.state.ifTalking &&
            <div style={{"display":"flex"}}>
      			<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt="" />
      				<h2 style={{"margin":"18px", "color":"DarkOrchid"}}><a href={"http://localhost:8000/viewprofile/"+this.state.current_fd_phone}>{this.state.current_fd}</a></h2>
            </div>
          }
      		</header>
      		<ul id="chat" ref={(element) => { this.listContainer = element; }}>
      			{items2}
      		</ul>
      		<footer>
          <form onSubmit={this.UpdateChat} style={{"display":"flex"}}>
      			<textarea placeholder="輸入文字" name="send_text" value={this.state.send_text} onChange={this.handleInputChange}></textarea>
      			<button type='submit'>Send</button>
          </form>
      		</footer>
      	</main>
      </div>

    );
  }
}
