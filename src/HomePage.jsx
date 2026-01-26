import './HomePage.css'
import CustomNav    from './custom_components/custom_nav'  
import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import ClientRegistration from './pages/ClientRegistration.jsx'
import ManeuverRegistration from './pages/ManeuverRegistration.jsx'

export default function MainPage()
{
  const [menuOpen, setMenuOpen] = useState(false)

  function openMenu() { setMenuOpen(!menuOpen) }

  return(
    <main className='HP_main'>
      <CustomNav
        isOpened     = {menuOpen}
        handleMobile = {openMenu}
      />

    </main>
  )
}