import React from 'react'
import HeaderContainer from '../components/header/headerContainer'
import NavbarContainer from '../components/nav/navContainer'
import AsideContainer from '../components/aside/asideContainer'
import FooterContainer from '../components/footer/footerContainer'

function AdminLayout({ children }) {
  return (
    <>
      <header><HeaderContainer/></header>
      <nav><NavbarContainer/></nav>
      <aside><AsideContainer/></aside>
      <main>
        <section>{ children }</section>
      </main>
      <footer><FooterContainer/></footer>
    </>
  )
}

export default AdminLayout