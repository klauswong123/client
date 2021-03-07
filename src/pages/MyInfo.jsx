import React, { Component } from 'react'
import { useTable } from 'react-table'
import api from '../api'
import styled from 'styled-components'
import tempicon from './aic.png'
import news from './1.png'
import share from './chau.jpg'
import Cookies from 'js-cookie'
import './ProfileCSS/main.css';
import Moment from 'react-moment';
import moment from 'moment';
import axios from 'axios';

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

const ForForm = styled.form.attrs({
  className: 'form123',
})`
  margin-left:28%;
  margin-top:1%;

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

class MyInfo extends Component {
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
          profileImg:'',
          imglink:'',
      }
      this.trigerChange = this.trigerChange.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onFileChange = this.onFileChange.bind(this);
  }

  async componentDidMount() {
      Cookies.set('current_page','profile')
      let phone_number = Cookies.get('phone_number')
      this.setState({ isLoading: true })
      await fetch('http://localhost:3000/api/client?phone_number='+phone_number, {
        method: "GET"
      })
      .then(res => res.json())
          .then((result) => {
            Cookies.set('name',result.data.name)
        this.setState( { user:result.data,
              name:result.data.name,
              email: result.data.email,
              phone_number:result.data.phone_number,
              product_name:result.data.product_name,
              business_description:result.data.business_description,
              personal_description:result.data.personal_description,
              company:result.data.company,
              product_branch: result.data.product_branch,
              imglink:result.data.icon
            } );
      })
      Cookies.set('logo',this.state.imglink)
  }

  trigerChange(e){
    this.setState({ifChange:true})
  }

  handleChange(e){
    e.persist();
    this.setState(prevState => ({
      item: { ...prevState.item,  [e.target.name]: e.target.value }
    }))
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  arrayBufferToBase64(buffer) {
      var binary = '';
      var bytes = [].slice.call(new Uint8Array(buffer));
      bytes.forEach((b) => binary += String.fromCharCode(b));
      return window.btoa(binary);
  };


    onFileChange(e) {
        this.setState({ profileImg: e.target.files[0] })
    }

  onSubmit(e) {
      e.preventDefault()
      const formData = new FormData()
      formData.append('profileImg', this.state.profileImg)
      axios.post("http://localhost:3000/api/uploadIcon"+this.state.user._id, formData, {
      }).then(res => {
      })
      window.location.reload(false);
  }


  submieChange = (event) => {
    event.preventDefault()
    this.setState({ ifchange:false })
    const fs = require('fs');
    var fd = new FormData()
    fd.append('file',this.state.files)
    const data = {
      name:this.state.name,
      email: this.state.email,
      phone_number:this.state.phone_number,
      product_name:this.state.product_name,
      business_description:this.state.business_description,
      personal_description:this.state.personal_description,
      company:this.state.company,
      product_branch: this.state.product_branch,
      icon: fd,
    }
    event.preventDefault();
    fetch('http://localhost:3000/api/updateinfo/'+this.state.user._id, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      if (res.status === 200) {
        // window.location.reload(false);
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('資料更新失敗');
    });
    window.location.reload(false);
  }
    render() {
      const pictures = ['./1.png','./2.png','./3.png','./4.png']
      const items3 = []
      for (const [index, value] of pictures.entries()) {
        items3.push(<NewBlock><img style={{ height:"180px",width: "70%"}} src={news} alt={index} key={index} /><br/></NewBlock>)
      }
      const logo = this.state.imglink
        return (
          <div>
            { this.state.ifChange &&
          <ForForm onSubmit={this.onSubmit}>
                <div className="form-group" >
                    <input type="file" onChange={this.onFileChange} />
                </div>
                <div className="form-group">
                    <button className="btn " style={{'height':"100%",'background':'Grey'}} type="submit">Upload</button>
                </div>
            </ForForm>
          }
          <form onSubmit={this.submieChange}>
          <OutsideContainer>
            <Icon>
              <img src={logo} alt="avatar" class="profile-pic" />
            </Icon>
            <Intro>
            <h5><strong>你好！我是 <Username>{this.state.user.name}</Username></strong></h5>

            <p><br />
            <strong>性別： {this.state.user.gender}</strong><br/>
            <strong>續期到期時間：<Moment date={this.state.user.subscription_due} format="YYYY/MM/DD" /></strong>
            </p>
            </Intro>
            <div class="col-md-2">
            { !this.state.ifChange ?
                <input type="submit" style={{ textAlign:"center","float":"right" }}  onClick={this.trigerChange}  name="edit" value="修改資料"/>
                :
                <div>
                <br/>
                <input type="submit" style={{ textAlign:"center" }}  name="submit" value="提交修改"/>
                </div>
            }
            </div>
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
                                  { this.state.ifChange && <div><input type="text" name="product_name" value={this.state.product_name} placeholder="業務簡介" onChange={this.handleInputChange}/>
                                                                              <div class="row">
                                                                                    <div class="col-md-6">
                                                                                        <label></label><br/>
                                                                                    </div>
                                                                                    <div class="col-md-6">
                                                                                        <label></label><br/>
                                                                                    </div>
                                                                                </div></div> }
                              </div>
                          </div>
                          <div class="row">
                              <div className="title-row">
                                  <label className="infoType"><strong>公司</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</label>
                              </div>
                              <div className="content-row">
                                  <label>{this.state.user.company}</label>
                                  { this.state.ifChange && <div><input type="text" name="company" value={this.state.company} placeholder="公司" onChange={this.handleInputChange}/>
                                                                              <div class="row">
                                                                                    <div class="col-md-6">
                                                                                        <label></label><br/>
                                                                                    </div>
                                                                                    <div class="col-md-6">
                                                                                        <label></label><br/>
                                                                                    </div>
                                                                                </div></div> }
                              </div>
                          </div>
                          <div class="row">
                              <div className="title-row">
                                  <label className="infoType"><strong>分會</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</label>
                              </div>
                              <div className="content-row">
                                  <label><a style={{color:"DarkOrchid",fontSize:"15px",}} href={"http://localhost:8000/viewdivision/"+this.state.phone_number}>{this.state.user.product_branch}</a></label>
                                  { this.state.ifChange && <div><input type="text" name="product_branch" value={this.state.product_branch} placeholder="分會" onChange={this.handleInputChange}/>
                                                                              <div class="row">
                                                                                    <div class="col-md-6">
                                                                                        <label></label><br/>
                                                                                    </div>
                                                                                    <div class="col-md-6">
                                                                                        <label></label><br/>
                                                                                    </div>
                                                                                </div></div> }
                              </div>
                          </div>
                          <div class="row">
                          <div className="title-row">
                              <label className="infoType"><strong>自我介紹</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;： </label>
                          </div>
                          <div className="content-row">
                              <label className="self-intro">{this.state.user.personal_description}</label>
                                  { this.state.ifChange &&  <div className="self-intro"><input type="text" name="personal_description" value={this.state.personal_description} placeholder="自我介紹" onChange={this.handleChange}/>
                                                                                <div class="row">
                                                                                    <div class="col-md-6">
                                                                                        <label></label><br/>
                                                                                    </div>
                                                                                    <div class="col-md-6">
                                                                                        <label></label><br/>
                                                                                    </div>
                                                                                </div></div>  }
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
                { this.state.ifChange && <div className="business-intro"><input type="text" name="business_description" value={this.state.business_description} placeholder="業務簡介" onChange={this.handleChange}/>
                                                            <div class="row">
                                                                  <div class="col-md-6">
                                                                      <label></label><br/>
                                                                  </div>
                                                                  <div class="col-md-6">
                                                                      <label></label><br/>
                                                                  </div>
                                                              </div></div> }
            </div>

          </OutsideContainer1>
          <UpdateNews>
            {items3}
          </UpdateNews>
          </Outside1>
          </form>
          </div>
        )
    }
}

export default MyInfo
