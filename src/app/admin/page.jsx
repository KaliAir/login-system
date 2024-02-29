"use client"
import React from 'react'
import { signOut } from 'next-auth/react'

function AdminLanding() {
  const handleSignOut = ()=>{
    signOut();
  }
  return (
    <div>
      <div>AdminLanding</div>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}

export default AdminLanding