import React, { Component } from 'react';
import './ProfileCSS/main.css';
import { setLoginSession, getSession } from '../app/CookieSession.js'
import Cookies from 'js-cookie'

export default class UserProfile extends Component {
  constructor(props) {
      super(props)
      this.state = {
          user: {},
          name:'',
          email: '',
          phone_number:'',
          product_name:'',
          business_description:'',
          personal_description:'',
          ifChange: false,
          isLoading: false,
      }
      this.trigerChange = this.trigerChange.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
      let email = Cookies.get('email')
      this.setState({ isLoading: true })
      fetch('http://localhost:3000/api/client?email='+email, {
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
              personal_description:result.data.personal_description,  } )
      })

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

  submieChange = (event) => {
    this.setState({ ifchange:false })
    const data = {
      name:this.state.name,
      email: this.state.email,
      phone_number:this.state.phone_number,
      product_name:this.state.product_name,
      business_description:this.state.business_description,
      personal_description:this.state.personal_description,
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

  render() {
    return (
      <div class="container emp-profile">
                      <div class="row">
                          <div class="col-md-4">
                              <div class="profile-img">
                                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt=""/>
                                  <div class="file btn btn-lg btn-primary">
                                      Change Photo
                                      <input type="file" name="file"/>
                                  </div>
                              </div>
                          </div>
                          <div class="col-md-6">
                              <div class="profile-head">
                                          <h5>
                                              {this.state.user.name}
                                          </h5>
                                          <h6>
                                              {this.state.user.product_type}
                                          </h6>
                                          <p class="proile-rating">訂閲到期 : <span>{this.state.user.subscription_due}</span></p>
                                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                                      <li class="nav-item">
                                          <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">資料</a>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                          <div class="col-md-2">
                          { !this.state.ifChange &&
                              <input type="submit" class="profile-edit-btn" onClick={this.trigerChange}  name="edit" value="修改資料"/>
                          }
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-md-4">
                              <div class="profile-work">
                                  <p>產品鏈接/公司網址</p>
                                  <a href={this.state.user.business_link}>{this.state.user.business_link}www.apple.com</a><br/>

                              </div>
                          </div>
                          <div class="col-md-8">
                              <div class="tab-value profile-tab" id="myTabvalue">
                              <form onSubmit={this.submieChange}>
                                  <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                              <div class="row">
                                                  <div class="col-md-6">
                                                      <label>姓名</label>
                                                  </div>
                                                  <div class="col-md-6">
                                                      <p>{this.state.user.name}</p>
                                                      { this.state.ifChange && <div><input type="text" name="name" value={this.state.name} placeholder="姓名" onChange={this.handleInputChange}/>
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
                                                  <div class="col-md-6">
                                                      <label>電郵</label>
                                                  </div>
                                                  <div class="col-md-6">
                                                      <p>{this.state.user.email}</p>
                                                      { this.state.ifChange && <div> <input class="input"
                                                                                  type="email"
                                                                                  name="email"
                                                                                  placeholder="Enter email"
                                                                                  value={this.state.email}
                                                                                  onChange={this.handleInputChange}
                                                                                   />
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
                                                  <div class="col-md-6">
                                                      <label>電話號碼</label>
                                                  </div>
                                                  <div class="col-md-6">
                                                      <p>{this.state.user.phone_number }</p>
                                                      { this.state.ifChange && <div><input type="text" name="phone_number" value={this.state.phone_number} placeholder="電話號碼" onChange={this.handleInputChange}/>
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
                                                  <div class="col-md-6">
                                                      <label>產品/公司</label>
                                                  </div>
                                                  <div class="col-md-6">
                                                      <p>{this.state.user.product_name}</p>
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
                                                      <label className="infoType"><strong>自我介紹</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;： </label>
                                                  </div>
                                                  <div className="content-row">
                                                      <label className="self-intro">{this.state.user.personal_description}</label>
                                                      { this.state.ifChange &&  <div><input type="text" name="personal_description" value={this.state.personal_description} placeholder="自我介紹" onChange={this.handleChange}/>
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
                                              <div class="row">
                                                  <div class="col-md-6">
                                                      <label>業務簡介：</label><br/>
                                                  </div>
                                                  <div class="col-md-6">
                                                      <p>{this.state.user.business_description}</p>
                                                      { this.state.ifChange && <div><input type="text" name="business_description" value={this.state.business_description} placeholder="業務簡介" onChange={this.handleChange}/>
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
                                                  <div class="col-md-6">
                                                      <label></label><br/>
                                                  </div>
                                                  <div class="col-md-6">
                                                      <label></label><br/>
                                                  </div>
                                              </div>
                                              { this.state.ifChange &&
                                              <div class="row">
                                                  <div class="col-md-6">
                                                      <input type="submit" class="profile-edit-btn"  name="submit" value="提交修改"/>
                                                  </div>
                                              </div>
                                            }
                                  </div>
                                  </form>
                              </div>
                          </div>
                      </div>
              </div>

    );
  }
}
