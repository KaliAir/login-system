import React from 'react'
import HeaderContainer from '../components/header/headerContainer'
import NavbarContainer from '../components/nav/navContainer'
import FooterContainer from '../components/footer/footerContainer'
import MainContent from '../mainComponents/mainContent'
import { Style } from './styleJS'

function AdminLayout({ children }) {
  return (
    <div style={Style.container}>
      <header style={Style.header}><HeaderContainer/></header>
      <nav style={Style.nav}><NavbarContainer/></nav>
      <MainContent>
        {children}
      </MainContent>
      <footer><FooterContainer/></footer>
    </div>
  )
}

export default AdminLayout