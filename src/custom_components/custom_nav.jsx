import './custom_nav.css'
import AppLogo  from '../assets/react.svg'
import MenuLogo from '../assets/menu_white.svg'

import { Link } from 'react-router-dom'

export default function registration_form(props)
{
    return (
        <nav className='CN_container'>
            <Link to="/" className='CN_logo'>
                <img src={AppLogo} alt="" />
                <span>KPI Portal</span>
            </Link>

            <div 
                className = 'CN_mobile_logo'
                onClick   = {props.handleMobile}
            >
                <img src={AppLogo} alt="" />
                <img src={MenuLogo} alt="" />
            </div>

            <ul className={`CN_options ${props.isOpened ? "open" : ""}`}>
                <li className='CN_link_item'>
                    <Link to="/ClientRegistration"> User registration </Link>
                </li>

                <li className='CN_link_item'>
                    <Link to="/TransporterRegistration"> Transport layer </Link>
                </li>

                <li className='CN_link_item'>
                    <Link to="/ManeuverRegistration"> KPI registration </Link>
                </li>
            </ul>
        </nav>
    )
}