import React, { Component } from 'react'
import { useTable } from 'react-table'
import api from '../api'
import styled from 'styled-components'
import Cookies from 'js-cookie'
import './SearchCSS/search.css'

const OutsideContainer =  styled.div.attrs({
    className: 'container',
})`
    margin-top:20px;
    margin-left: 100px;
    margin-right: 100px;
    height:100px;
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
    height:100px;
    width:100px;
    float:right;
    border-radius: 50%;
`
const Icon = styled.img.attrs({
    className: 'container',
})`
    margin-left:100px;
    height:100px;
    width:100px;
    float:right;
    border-radius: 50%;
`

const Intro1 = styled.div.attrs({
    className: 'container3',
})`
    flex:5;
    text-align:left;
`

const Intro = styled.div.attrs({
    className: 'container',
})`
    flex:2;
    text-align:left;
`

const Outside1 = styled.div.attrs({
    className: 'container1',
})`
    margin-top:20px;
    margin-left: 200px;
    margin-right: 100px;
    height:150px;
`

class SearchResult extends Component {
  constructor(props) {
      super(props)
      this.state = {
          user: [],
          email: '',
          searchKey:'',
          isLoading: false,
          phone_number:"",
      }
  }

    componentDidMount() {
        Cookies.set('current_page','')
        let searchType = Cookies.get('searchType')
        let searchKey = this.props.match.params.searchKey
        let phone_number = Cookies.get('phone_number')
        this.setState({ isLoading: true })
        fetch('http://localhost:3000/api/clients', {
          method: 'POST',
          body: JSON.stringify({'searchKey':searchKey}),
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(res => res.json())
            .then((result) => {
          this.setState( { user:result.data } )
        })
    }
    render() {
      const items1 = []
      for (const [index, value] of this.state.user.entries()) {
        items1.push(
                        <tr>
                            <td>{value.name}</td>
                            <td>{value.email}</td>
                            <td>{value.occupation}</td>
                            <td className="t1">{value.product_name}</td>
                            <td className="t1">{value.product_type}</td>
                            <td class="text-center"><a class='btn btn-info btn-xs' style={{backgroundColor:"#9370DB",borderColor:"#9370DB"}} href={"http://localhost:8000/viewprofile/"+value.phone_number}><span ></span> 查看資料 </a></td>
                        </tr>
                      )
      }
        return (
          <div class="container">
              <div class="row col-md-6 col-md-offset-2 custyle">
              <table class="table table-striped custab">
              <thead>
                  <tr style={{backgroundColor:"#9370DB"}}>
                      <th>姓名</th>
                      <th>郵箱</th>
                      <th>職業</th>
                      <th className="t1">產品</th>
                      <th className="t1">產品類目</th>
                      <th class="text-center">操作</th>
                  </tr>
              </thead>
                      {items1}
              </table>
              </div>
          </div>
        )
    }
}

export default SearchResult
