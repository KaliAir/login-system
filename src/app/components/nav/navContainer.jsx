"use client"
import React from 'react'
import { signOut } from 'next-auth/react'
import { Style } from './styleJS'

function NavbarContainer() {

  const handleSignOut = ()=>{
    signOut();
  }

  return (
    <div style={Style.container}>
      <div>Navbar</div>
      <button onClick={handleSignOut}>SignOut</button>
    </div>
  )
}

export default NavbarContainer