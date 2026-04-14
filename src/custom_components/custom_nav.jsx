import './custom_nav.css'
import AppLogo  from '../assets/react.svg'
import MenuLogo from '../assets/menu_white.svg'
import ActionButton            from '../custom_components/custom_button.jsx'

import { Link } from 'react-router-dom'

export default function registration_form(props)
{
    return (
        <nav className='CN_container'>
            <Link to="/" className='CN_logo'>
                <img src={AppLogo} alt="" />
                <span>TIL Portal</span>
            </Link>

            <div 
                className = 'CN_mobile_logo'
                onClick   = {props.handleMobile}
            >
                <img src={AppLogo} alt="" />
                <img src={MenuLogo} alt="" />
            </div>

            <ul className={`CN_options ${props.isOpened ? "open" : ""}`}>

                <Link to="/ClientRegistration" className='CN_link_item'>                        
                    <ActionButton
                        text   = 'Clientes'
                        color  = 'blue'
                        action = 'navigation'
                    />
                </Link>

                <Link to="/TransporterRegistration" className='CN_link_item'>                        
                    <ActionButton
                        text   = 'Transportistas'
                        color  = 'blue'
                        action = 'navigation'
                    />
                </Link>

                <Link to="/RouteRegistration" className='CN_link_item'>                        
                    <ActionButton
                        text   = 'Rutas'
                        color  = 'blue'
                        action = 'navigation'
                    />
                </Link>

                <Link to="/ManeuverRegistration" className='CN_link_item'>                        
                    <ActionButton
                        text   = 'Registrar maniobra'
                        color  = 'blue'
                        action = 'navigation'
                    />
                </Link>

                <Link to="/ManeuversPage" className='CN_link_item'>                        
                    <ActionButton
                        text   = 'Ver maniobras'
                        color  = 'blue'
                        action = 'navigation'
                    />
                </Link>
            </ul>
        </nav>
    )
}