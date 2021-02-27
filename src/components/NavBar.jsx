import React, { Component } from 'react'
import styled from 'styled-components'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import Links from './Links'
import logOut from '../app/CookieSession'
import { withRouter } from 'react-router-dom';
import Cookies from 'js-cookie'
import './nav.css';
import tempicon from '../pages/Logo.jpg'

const Outside2 = styled.div.attrs({
    className: 'container3',
})`

`

const BrandLogo = styled.img.attrs({
    className: 'BrandLogo',
})`
  width:140px;
  height:40px;
`

class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            phone_number: '',
            stay_page:"",
            searchKey:'',
            isLoading: false,
        }
    }
    componentDidMount() {
      let phone_number = Cookies.get('phone_number')
      this.setState({ isLoading: true })
      fetch('http://localhost:3000/api/client?phone_number='+phone_number, {
        method: "GET"
      })
      .then(res => res.json())
          .then((result) => {
        this.setState( { user:result.data } )
      })
  }


  handleInputChange = (event) => {
    this.setState({
      searchKey: event.target.value
    });
  }

  handleSearch(){
    Cookies.set('searchKey', this.state.searchKey)
    if (this.state.searchKey) {
    this.props.history.push({
      pathname: "/searchResult?="+this.state.searchKey,
      state: {
        searchKey: this.state.searchKey
    }
  });
} else {
  alert("Please enter some search text!");
}
};
    render() {
      const phone_number = Cookies.get('phone_number')
        return (
          <Outside2>
          { phone_number ?
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/"><BrandLogo src={tempicon}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" name="searchKey"  value={this.state.searchKey } onChange={this.handleInputChange} required/>
              <Nav.Link type="submit" className="searchButton" onClick={this.handleSearch.bind(this)} variant="outline-success ">搜索</Nav.Link>
            </Form>
            <span>&nbsp;&nbsp;&nbsp;</span>
              <Nav className="mr-auto" >
              { Cookies.get('current_page')==='taskreport' ?
                <Nav.Link className="active button_bottom_line"  href="/mytask">任務報告</Nav.Link>
                :
                <Nav.Link href="/mytask">任務報告</Nav.Link>
              }
              { Cookies.get('current_page')==='friends' ?
                <Nav.Link className="active button_bottom_line" href="/friends">我的人脈</Nav.Link>
                :
                <Nav.Link href="/friends">我的人脈</Nav.Link>
              }
              { Cookies.get('current_page')==='recommand' ?
                <Nav.Link className="active button_bottom_line" href="/recommand">推薦人脈</Nav.Link>
                :
                <Nav.Link href="/recommand">推薦人脈</Nav.Link>
              }
              { Cookies.get('current_page')==='profile' ?
                <Nav.Link className="active button_bottom_line" href="/myinfo">個人履歷</Nav.Link>
                :
                <Nav.Link href="/myinfo">個人履歷</Nav.Link>
              }
              </Nav>
              <Navbar.Text>
                  <a href="/myinfo"> { this.state.user.name }</a>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;</span><span> </span><span> </span><a href="/logout">登出</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
          :
          <div>
          </div>
        }
        </Outside2>
        )
    }
}

export default withRouter(NavBar)
