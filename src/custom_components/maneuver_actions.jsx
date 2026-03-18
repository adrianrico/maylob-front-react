import '../custom_components/maneuver_actions.css'
import ActionButton from '../custom_components/custom_button.jsx'
import EntryInput   from '../custom_components/entry_input.jsx'
import CheckInput   from '../custom_components/check_input.jsx'

export default function ManeuverActions()
{
    return(
        <section className='MP_ind_actions'>
            <div>
                <EntryInput
                    titleLabel  = 'Link GPS'
                    inputType   = 'text'
                    name        = ''
                    value       = {'test'}  
                /> 
            </div>

            <div>
            <CheckInput
                titleLabel = 'Habilitar MONI'
            />
            </div>

            <div>
                <ActionButton
                    type   =''
                    text   = 'Guardar maniobra'
                    color  = 'blue'
                    action = 'save'
                />

                <ActionButton
                    type   =''
                    text   = 'Borrar maniobra'
                    color  = 'red'
                    action = 'delete'
                />
            </div>
        </section>
        
    )
}