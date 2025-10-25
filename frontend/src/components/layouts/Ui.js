import Header from './Header'
import Footer from './Footer'

export default function Ui({children}) {
  return (
    <>
      <Header/>
      {children}
      <Footer/>
    </>
  )
}
