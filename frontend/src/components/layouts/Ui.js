import Header from './Header'
import Footer from './Footer'
import { Navigate } from 'react-router-dom'

export default function Ui({children}) {

  if(!localStorage.getItem("login")){
    return <Navigate to="/"/>
  }
 
  return (
    <>
      <Header/>
      {children}
      <Footer/>
    </>
  )
}
