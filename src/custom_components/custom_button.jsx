import '../custom_components/custom_button.css'
import NavArrowLogo  from '../assets/nav_arrow_white.svg'
import DeleteLogo    from '../assets/delete_white.svg'
import SaveLogo      from '../assets/save_white.svg'
import { isValid }   from '../common_functions.js'

export default function CustomButtont(props)
{
    const type = isValid(props.type) ? props.type : 'button'
    const button_text = isValid(props.text) ? props.text : ''

    /** - Step [1] 
     *  - Select color background dinamically...
     */
    let background = ''

    switch (props.color) 
    {
        case 'red':
            background = 'red_bg'    
        break;
        
        case 'blue':
            background = 'blue_bg'    
        break;
    }


    /** - Step [2]
     *  - Select logo according to action...
     */
    let action_logo = ''

    switch (props.action) 
    {
        case 'delete':
            action_logo = DeleteLogo    
        break;
        
        case 'navigation':
            action_logo = NavArrowLogo 
        break;

        case 'save':
            action_logo = SaveLogo   
        break;
    }

    return(
        <button
            className = {props.action === 'navigation' ? ('expand_button '+background) : ('custom_button '+background)}
            type      = {type}
        >
        {button_text}
        <img src={action_logo}   aria-label= {'custom button'} />
        </button>
    )
}