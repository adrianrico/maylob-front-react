import '../custom_components/custom_button.css'
import ExpArrowLogo  from '../assets/expand_arrow_white.svg'
import DeleteLogo    from '../assets/delete_white.svg'
import SaveLogo      from '../assets/save_white.svg'
import AddLogo       from '../assets/add_white.svg'
import RemoveLogo    from '../assets/remove_white.svg'
import { isValid }   from '../common_functions.js'

export default function CustomButtont(props)
{
    const button_text = isValid(props.text) ? props.text : ''
    
    // Set background color if received...
    let background = ''

    switch (props.color) 
    {
        case 'red':
            background = 'red_bg'    
        break;
        
        case 'blue':
            background = 'blue_bg'    
        break;

        case 'green':
            background = 'green_bg'    
        break;
    }

    // Set Set image according to received parameter...
    let action_logo = ''
    let isCircled   = false

    switch (props.action) 
    {
        case 'delete':
            action_logo = DeleteLogo    
        break;

        case 'save':
            action_logo = SaveLogo   
        break;

        case 'expand':
            action_logo = ExpArrowLogo 
            isCircled = true
        break;

        case 'add':
            action_logo = AddLogo 
            isCircled = true
        break;

        case 'remove':
            action_logo = RemoveLogo 
            isCircled = true
        break;

        case 'navigation':
            
        break;
        
    }

    return(
        <button
            className = {isCircled ? ('circle_button '+background) : ('custom_button '+background)}
            type      = 'button'
        >
        {!isCircled && (button_text)}
 
        {props.action != 'navigation' && (
            <img src={action_logo}   aria-label= {'custom button'} /> 
        )}
        
        </button>
    )
}