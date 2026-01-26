import '../custom_components/dropdown_input_design.css'
import { isValid } from '../common_functions.js'

export default function select_input_component(props)
{  
    const title    = isValid(props.titleLabel) ? props.titleLabel : '-' 
    const isObject = isValid(props.accessProperty)

    let rendered_options = []
    if (isObject) 
    {
        rendered_options = props.options_master.map((indOption) =>
        {
            return( <option key={indOption[props.accessProperty]} value={indOption[props.accessProperty]}>{indOption[props.accessProperty]}</option> )
        })    
    }else
    {
        rendered_options = props.options_master.map((indOption) =>
        {
            return( <option key={indOption} value={indOption}>{indOption}</option> )
        })  
    }

    return(
        <article className='select_input_container'>
            <div className='select_controls_container'>
                <label 
                    className = 'select_input_label' 
                    htmlFor   = 'select_input_entry'>
                    {title}
                </label>
            
                <select 
                    className    = 'select_input_entry' 
                    name         = 'select_input_entry' 
                    /* onChange     = {props.onChange} */
                     onChange     = {(event) => props.onChange(event, props.funcParam)} 
                >
                    {rendered_options}
                </select>
            </div>
        </article>
    )
}