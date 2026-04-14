import './App.css'

import Navbar         from "./custom_components/custom_nav"
import Home           from "./pages/Home"
import Maneuvers      from "./pages/ManeuverRegistration"
import ManeuversP     from "./pages/ManeuversPage"
import Clients        from "./pages/ClientRegistration"
import Transporters   from "./pages/TransporterRegistration"
import CustomRoute    from "./pages/RoutesRegistration"

import { useState }      from 'react'
import { Routes, Route } from "react-router-dom"
import { Toaster }       from 'react-hot-toast'

export default function App() 
{
    const [menuOpen, setMenuOpen] = useState(false)
    
    function openMenu() { setMenuOpen(!menuOpen) }

    return(
        <main className='main_container'>

            <Toaster
                position="bottom-center"
                toastOptions={{duration:4000,}}
            />

            <Navbar
                isOpened     = {menuOpen}
                handleMobile = {openMenu}
            /> 

            <section className='content'>
                <Routes>
                    <Route path="/"                          element={<Home />          } />
                    <Route path="/ClientRegistration"        element={<Clients />       } />
                    <Route path="/TransporterRegistration"   element={<Transporters />  } />
                    <Route path="/RouteRegistration"         element={<CustomRoute />  } />
                    <Route path="/ManeuverRegistration"      element={<Maneuvers />     } />
                    <Route path="/ManeuversPage"             element={<ManeuversP />    } />
                </Routes>
            </section>

        </main>
    )
}

