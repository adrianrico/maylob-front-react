import './ContainerComponent.css'
import EntryInput             from './custom_components/entry_input.jsx'
import DropdownInput          from './custom_components/dropdown_input.jsx'
import { buildDefaultObject } from './common_functions.js'

export default function ContainerComponent(props)
{
  
    const containers_size = ['Seleccionar',20,40]

    return(
        <div className='containerComponent_div'>
            <h1>{props.componentTitle}</h1>

            <EntryInput
                titleLabel  = {props.id_label}
                inputType   = {props.id_inputType}
                name        = {props.id_name}
                value       = {props.id_value}  
                cleanEntry  = {props.cleanEntry}
                entryChange = {props.entryChange}
            />

            <DropdownInput
                titleLabel     = 'Tamaño del contenedor.'
                options_master = {containers_size} 
                accessProperty = {''}
                funcParam      = {props.funcParam}
                onChange       = {props.selectChange}      
            />

            <EntryInput
                titleLabel  = {props.content_label}
                inputType   = {props.content_inputType}
                name        = {props.content_name}
                value       = {props.content_value}  
                cleanEntry  = {props.cleanEntry}
                entryChange = {props.entryChange}
            />

            <EntryInput
                titleLabel  = {props.weight_label}
                inputType   = {props.weight_inputType}
                name        = {props.weight_name}
                value       = {props.weight_value}  
                cleanEntry  = {props.cleanEntry}
                entryChange = {props.entryChange}
            />

            <EntryInput
                titleLabel  = {props.type_label}
                inputType   = {props.type_inputType}
                name        = {props.type_name}
                value       = {props.type_value}  
                cleanEntry  = {props.cleanEntry}
                entryChange = {props.entryChange}
            />
        </div>
    )
}