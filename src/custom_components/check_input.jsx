import '../custom_components/check_input.css'
import {isValid} from '../common_functions.js'

export default function input_component(prop)
{
    //Set default initial values...
    const title = isValid(prop.titleLabel) ? prop.titleLabel : '-' 

    //Build component...
    return(
    <article className = 'check_input_container'>

            <label 
                className = 'check_input_label' 
                htmlFor   = {prop.name}>
                {title}
            </label>

            <input
                className = 'filter_check' 
                type      = "checkbox" 
                name      = {prop.name} 
                onChange  = {prop.checked}
            />
    </article>
    )
}