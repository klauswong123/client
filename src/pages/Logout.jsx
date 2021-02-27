import Cookies from 'js-cookie'
import { Redirect } from 'react-router'
const Logout = () => {
  Cookies.remove('isLogin')
  Cookies.remove('phone_number')
  return <Redirect to='/aic-landing'/>
}

export default Logout
