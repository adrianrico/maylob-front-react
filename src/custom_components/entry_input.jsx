import '../custom_components/entry_input_design.css'
import CleanLogo from '../assets/clean_white.svg'
import {isValid} from '../common_functions.js'

export default function input_component(prop)
{
    //console.log(prop.value)

    //Set default initial values...
    const title = isValid(prop.titleLabel) ? prop.titleLabel : '-' 
    const type  = isValid(prop.inputType)  ? prop.inputType  : 'text'
    const value = isValid(prop.value)      ? prop.value      : ''


 /*    //Customizable depending of input type...?
    function entry_change(event)
    {
        setNewState(event.target.value)
    }

    function clear_entry(event)
    {
        //console.log('Clear entry...')
        event.preventDefault()f
        setNewState('')
    } */
    
    //Buil component...
    return(
    <article className = 'input_container'>
        <div className = 'controls_container'>
            <label 
                className = 'input_label' 
                htmlFor   = {prop.name}>
                {title}
            </label>

            <input 
                className = 'input_entry'
                name      = {prop.name} 
                type      = {type}  
                value     = {value}  
                onChange  = {prop.entryChange}
            />
        </div>

        <button
            className  = 'input_clear'
            type       = 'button' 
            onClick    = {() => prop.cleanEntry(prop.name)}>
            
            <img src={CleanLogo} alt="clear field" />
        </button>
    </article>
    )
}