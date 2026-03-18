
import'../custom_components/maneuver.css'
import EntryInput              from '../custom_components/entry_input.jsx'
import DropdownInput           from '../custom_components/dropdown_input.jsx'
import ManeuverActions         from '../custom_components/maneuver_actions.jsx'
import ActionButton            from '../custom_components/custom_button.jsx'
import ContainerComponent      from '../ContainerComponent.jsx'
import { useState } from 'react'

export default function Maneuver (props)
{

    const [displayManeuver, setdisplayManeuver]         = useState(false) 
    const [displayContainers, setDisplayContainers]     = useState(false) 
    const [displayGenerals, setdisplayGenerals]         = useState(false) 
    const [displayLoadUnload, setdisplayLoadUnload]     = useState(false) 
    const [displaytransporter, setdisplaytransporter]   = useState(false) 

    function collapseManeuver() { setdisplayManeuver(prev => !prev) }
    function collapseContainers(e) 
    { 
        //e.stopPropagation()
        setDisplayContainers(prev => !prev) 
    }
    function collapseGenerals(e)   { setdisplayGenerals(prev => !prev) }
    function collapseLoadUnload(e) { setdisplayLoadUnload(prev => !prev) }
    function collapseTransporter(e) { setdisplaytransporter(prev => !prev) }

    return(
    <article className='ind_maneuver_container'>
        
        <div className='ind_man_brief'>
            <h2 className='ind_cont_id'>{props.cont_1_ID}</h2>
            <h3 className='ind_cont_adv'>{props.m_advance}</h3>
            
            <DropdownInput
                titleLabel     = 'Cliente'
                options_master = {['client a','client b']} 
                accessProperty = {''}
                onChange       = {(event) => props.onClientChange(event, props.funcParam)}      
            />

            <DropdownInput
                titleLabel     = 'Modalidad'
                options_master = {['mode a','mode b']} 
                accessProperty = {''}
                onChange       = {(event) => props.onModeChange(event, props.funcParam)}      
            />
            
            <div className='ind_man_start'>
                <EntryInput
                    titleLabel  = 'Fecha de despacho'
                    inputType   = 'datetime-local'
                    name        = ''
                    value       = {props.man_dispatch_date}  
                    cleanEntry  = {props.cleanEntry}
                    entryChange = {props.entryChange} 
                /> 
            </div>

            <div className='ind_man_end'>
                <EntryInput
                    titleLabel  = 'Fecha de término'
                    inputType   = 'datetime-local'
                    name        = ''
                    value       = {props.man_dispatch_date}  
                    cleanEntry  = {props.cleanEntry}
                    entryChange = {props.entryChange} 
                /> 
            </div>

            <div className='ind_man_loc'>
                <DropdownInput
                    titleLabel     = 'Ubicación'
                    options_master = {['location a','location b']} 
                    accessProperty = {''}
                    onChange       = {(event) => props.onClientChange(event, props.funcParam)}      
                />
            </div>
            
            <div className='ind_man_sta'>
                <DropdownInput
                    titleLabel     = 'Estatus'
                    options_master = {['status a','status b']} 
                    accessProperty = {''}
                    onChange       = {(event) => props.onClientChange(event, props.funcParam)}      
                />
            </div>

            <div 
                className='ind_man_exp'
                onClick={ collapseManeuver }    
            >
                <ActionButton
                    type   = ''
                    text   = ''
                    color  = 'blue'
                    action = 'navigation'
                />
            </div>

        </div>

        {displayManeuver && (<>
    
            <div className='ind_man_cntrs'>
                <div 
                    className = 'card_title'
                    onClick   = {collapseContainers}    
                >
                    <h2>Contenedores</h2>
                    <ActionButton
                        type   = ''
                        text   = ''
                        color  = 'blue'
                        action = 'navigation'
                    />
                </div>

                {displayContainers && (
                <>

                    <div>
                        <ContainerComponent 
                            componentTitle    = 'Contenedor A'
                            id_label          = 'ID de contenedor.'
                            id_inputType      = 'text'
                            id_name           = 'man_c1_id'
                            id_value          = {'maneuver_form.man_c1_id'} 
                            content_label     = 'Contenido de contenedor.'
                            content_inputType = 'text'
                            content_name      = 'man_c1_content'
                            content_value     = {'maneuver_form.man_c1_content'} 
                            weight_label      = 'Peso del contenedor.'
                            weight_inputType  = 'number'
                            weight_name       = 'man_c1_weight'
                            weight_value      = {'maneuver_form.man_c1_weight'} 
                            type_label        = 'Tipo de contenedor.'
                            type_inputType    = 'text'
                            type_name         = 'man_c1_type'
                            type_value        = {'maneuver_form.man_c1_type'} 
                            funcParam         = 'man_c1_size'
                        />

                        <ContainerComponent 
                            componentTitle    = 'Contenedor B'
                            id_label          = 'ID de contenedor.'
                            id_inputType      = 'text'
                            id_name           = 'man_c1_id'
                            id_value          = {'maneuver_form.man_c1_id'} 
                            content_label     = 'Contenido de contenedor.'
                            content_inputType = 'text'
                            content_name      = 'man_c1_content'
                            content_value     = {'maneuver_form.man_c1_content'} 
                            weight_label      = 'Peso del contenedor.'
                            weight_inputType  = 'number'
                            weight_name       = 'man_c1_weight'
                            weight_value      = {'maneuver_form.man_c1_weight'} 
                            type_label        = 'Tipo de contenedor.'
                            type_inputType    = 'text'
                            type_name         = 'man_c1_type'
                            type_value        = {'maneuver_form.man_c1_type'} 
                            funcParam         = 'man_c1_size'
                        />
                    </div>

                    <div>
                        <ContainerComponent 
                            componentTitle    = 'Contenedor C'
                            id_label          = 'ID de contenedor.'
                            id_inputType      = 'text'
                            id_name           = 'man_c1_id'
                            id_value          = {'maneuver_form.man_c1_id'} 
                            content_label     = 'Contenido de contenedor.'
                            content_inputType = 'text'
                            content_name      = 'man_c1_content'
                            content_value     = {'maneuver_form.man_c1_content'} 
                            weight_label      = 'Peso del contenedor.'
                            weight_inputType  = 'number'
                            weight_name       = 'man_c1_weight'
                            weight_value      = {'maneuver_form.man_c1_weight'} 
                            type_label        = 'Tipo de contenedor.'
                            type_inputType    = 'text'
                            type_name         = 'man_c1_type'
                            type_value        = {'maneuver_form.man_c1_type'} 
                            funcParam         = 'man_c1_size'
                        />

                        <ContainerComponent 
                            componentTitle    = 'Contenedor D'
                            id_label          = 'ID de contenedor.'
                            id_inputType      = 'text'
                            id_name           = 'man_c1_id'
                            id_value          = {'maneuver_form.man_c1_id'} 
                            content_label     = 'Contenido de contenedor.'
                            content_inputType = 'text'
                            content_name      = 'man_c1_content'
                            content_value     = {'maneuver_form.man_c1_content'} 
                            weight_label      = 'Peso del contenedor.'
                            weight_inputType  = 'number'
                            weight_name       = 'man_c1_weight'
                            weight_value      = {'maneuver_form.man_c1_weight'} 
                            type_label        = 'Tipo de contenedor.'
                            type_inputType    = 'text'
                            type_name         = 'man_c1_type'
                            type_value        = {'maneuver_form.man_c1_type'} 
                            funcParam         = 'man_c1_size'
                        />
                    </div>

                </>    
                )}

            </div>

            <div className='ind_man_details'>
                
                <div className='card'>
                    <div 
                        className ='card_title'
                        onClick   = { collapseGenerals }
                    >
                        <h2>Datos generales</h2>
                        <ActionButton
                            type   = ''
                            text   = ''
                            color  = 'blue'
                            action = 'navigation'
                        />
                    </div>

                    { displayGenerals && (
                    <>
                            
                        <EntryInput
                            titleLabel  = 'Agente aduanal'
                            inputType   = 'text'
                            name        = ''
                            value       = {'test'}  
                            /*  cleanEntry  = {clearEntry}
                            entryChange = {entryChange}  */
                        /> 

                        <EntryInput
                            titleLabel  = 'Ejecutivo(a)'
                            inputType   = 'text'
                            name        = ''
                            value       = {'test'}  
                            /*  cleanEntry  = {clearEntry}
                            entryChange = {entryChange}  */
                        /> 
                        
                        <EntryInput
                            titleLabel  = 'CAAT'
                            inputType   = 'text'
                            name        = ''
                            value       = {'test'}  
                            /*  cleanEntry  = {clearEntry}
                            entryChange = {entryChange}  */
                        /> 

                        <textarea placeholder='Nota(s)'/>

                    </>
                    )}

                </div>

                <div className='card'>
                    <div 
                        className ='card_title'
                        onClick   = {collapseLoadUnload}
                    >
                        <h2>Datos de carga / descarga</h2>
                        <ActionButton
                            type   = ''
                            text   = ''
                            color  = 'blue'
                            action = 'navigation'
                        />
                    </div>

                    { displayLoadUnload && (
                    <>
                        <DropdownInput
                            titleLabel     = 'Terminal de carga'
                            options_master = {['test']} 
                            accessProperty = {''}
                            onChange       = {'ecoSelection'}      
                        />

                        <EntryInput
                            titleLabel  = 'Otra terminal'
                            inputType   = 'text'
                            name        = ''
                            value       = {'test'}  
                            /*  cleanEntry  = {clearEntry}
                            entryChange = {entryChange}  */
                        /> 

                        <DropdownInput
                            titleLabel     = 'Patio de descarga'
                            options_master = {['test']} 
                            accessProperty = {''}
                            onChange       = {'ecoSelection'}      
                        />
                        <EntryInput
                            titleLabel  = 'Otro patio'
                            inputType   = 'text'
                            name        = ''
                            value       = {'test'}  
                            /*  cleanEntry  = {clearEntry}
                            entryChange = {entryChange}  */
                        />
                    </>
                    )}

                </div>

                <div className='card'>
                    <div 
                        className ='card_title'
                        onClick   = {collapseTransporter}
                    >
                        <h2>Datos transportista</h2>
                        <ActionButton
                            type   = ''
                            text   = ''
                            color  = 'blue'
                            action = 'navigation'
                        />
                    </div>

                    {displaytransporter && (<>

                    <DropdownInput
                        titleLabel     = 'Transportista'
                        options_master = {['test']} 
                        accessProperty = {''}
                        onChange       = {'ecoSelection'}      
                    />
                    
                    <DropdownInput
                        titleLabel     = 'Operador'
                        options_master = {['test']} 
                        accessProperty = {''}
                        onChange       = {'ecoSelection'}      
                    />
                    
                    <DropdownInput
                        titleLabel     = 'ECO'
                        options_master = {['test']} 
                        accessProperty = {''}
                        onChange       = {'ecoSelection'}      
                    />

                    </>)}
                </div>

                <div><ManeuverActions/></div>

            </div>
            
        </>)}
    </article>
    )
}