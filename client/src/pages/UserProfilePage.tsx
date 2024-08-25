import React from 'react'
import NavBar from '../features/navbar/NavBar'
import UserProfile from '../features/user/components/UserProfile'

function UserProfilePage() {
  return (
    <NavBar>
        <UserProfile/>
    </NavBar>
  )
}

export default UserProfilePage