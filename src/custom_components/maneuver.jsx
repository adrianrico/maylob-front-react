
import'../custom_components/maneuver.css'
import EntryInput              from '../custom_components/entry_input.jsx'
import DropdownInput           from '../custom_components/dropdown_input.jsx'
import ManeuverActions         from '../custom_components/maneuver_actions.jsx'
import ActionButton            from '../custom_components/custom_button.jsx'
import ContainerComponent      from '../ContainerComponent.jsx'
import { useState } from 'react'
import { isValid } from '../common_functions.js'

export default function Maneuver (props)
{
    // UI collapse logic...
    const [displayManeuver, setdisplayManeuver]         = useState(false) 
    const [displayContainers, setDisplayContainers]     = useState(false) 
    const [displayGenerals, setdisplayGenerals]         = useState(false) 
    const [displayLoadUnload, setdisplayLoadUnload]     = useState(false) 
    const [displaytransporter, setdisplaytransporter]   = useState(false) 

    function collapseManeuver()    { setdisplayManeuver(prev => !prev) }
    function collapseContainers()  { setDisplayContainers(prev => !prev) }
    function collapseGenerals()    { setdisplayGenerals(prev => !prev) }
    function collapseLoadUnload()  { setdisplayLoadUnload(prev => !prev) }
    function collapseTransporter() { setdisplaytransporter(prev => !prev) }

    return(
    <article className='ind_maneuver_container'>
        
        <div className='ind_man_brief'>
            <h2 className='ind_cont_id'>{props.manID}</h2>
            <h3 className={props.manAdvance === '100%' ? 'ind_cont_adv green_bg': 'ind_cont_adv blue_bg'}>{props.manAdvance}</h3>
            
            <DropdownInput
                titleLabel      = 'Cliente'
                options_master  = {props.clienstList} 
                accessProperty  = {'client_name'}
                selected_option = {props.selectedClient}
                onChange        = {(event) => props.onClientChange(event, props.manID)}      
            />

            <DropdownInput
                titleLabel      = 'Modalidad'
                options_master  = {['SENCILLO','FULL']} 
                accessProperty  = {''}
                selected_option = {props.selectedType}
                onChange        = {(event) => props.onTypeChange(event, props.manID)}      
            />
            
            <div className='ind_man_start'>
                <EntryInput
                    titleLabel  = 'Fecha de despacho'
                    inputType   = 'datetime-local'
                    name        = 'man_dispatch_date'
                    value       = {props.dispatchDate}  
                   /*  cleanEntry  = {props.cleanEntry} */
                    cleanEntry  = {(event) => props.cleanEntry(event, props.manID)} 
                    entryChange = {(event) => props.entryChange(event, props.manID, 'START')} 
                /> 
            </div>

            <div className='ind_man_end'>
                <h4>Fecha de término: {props.endDate}</h4>
                {/*
                    <EntryInput
                        titleLabel  = 'Fecha de término'
                        inputType   = 'datetime-local'
                        name        = ''
                        value       = {props.man_dispatch_date}  
                        cleanEntry  = {props.cleanEntry}
                        entryChange = {(event) => props.entryChange(event, props.manID, 'END')} 
                    />  
                */}
            </div>

            <div className='ind_man_loc'>
                <DropdownInput
                    titleLabel      = 'Ubicación'
                    options_master  = {props.locationList} 
                    accessProperty  = {''}
                    selected_option = {props.currentLocation}
                    onChange        = {(event) => props.onLocationChange(event, props.manID)}      
                />
            </div>
            
            <div className='ind_man_sta'>
                <DropdownInput
                    titleLabel      = 'Estatus'
                    options_master  = {props.statusList} 
                    accessProperty  = {''}
                    selected_option = {props.currentStatus}
                    onChange        = {(event) => props.onStatusChange(event, props.manID)}      
                />
            </div>

            <div 
                className='ind_man_exp'
                onClick={ collapseManeuver }    
            >
                <div className={displayManeuver ? 'arrow_up' : 'arrow_down'}>
                <ActionButton
                    type   = ''
                    text   = ''
                    color  = 'blue'
                    action = 'navigation'
                />
                </div>
            </div>

        </div>

        {displayManeuver && (<>
    
            <div className='ind_man_cntrs'>
                <div 
                    className = 'card_title'
                    onClick   = {collapseContainers}    
                >
                    <h2>Contenedores</h2>
                    <div className={displayContainers ? 'arrow_up' : 'arrow_down'}>
                        <ActionButton
                            type   = ''
                            text   = ''
                            color  = 'blue'
                            action = 'navigation'
                        />
                    </div>
                </div>

                {displayContainers && (
                <>

                    <div>
                        <ContainerComponent 
                            componentTitle       = 'Contenedor A'
                     
                            id_label             = 'ID de contenedor.'
                            id_inputType         = 'text'
                            id_name              = 'man_c1_id'
                            id_value             = {props.cont_1_ID} 
                            id_entry_change      = {(event) => props.cont_entry_change(event, props.manID, 'man_c1_id')} 

                            funcParam            = 'man_c1_size'
                            selectedSize         = {props.cont_1_size}
                            sizeChange           = {(event) => props.cont_1_sizeSel(event, props.manID,'1')}
         
                            content_label        = 'Contenido de contenedor.'
                            content_inputType    = 'text'
                            content_name         = 'man_c1_content'
                            content_value        = {props.cont_1_content} 
                            content_entry_change = {(event) => props.cont_entry_change(event, props.manID, 'man_c1_content')} 

                            weight_label         = 'Peso del contenedor.'
                            weight_inputType     = 'number'
                            weight_name          = 'man_c1_weight'
                            weight_value         = {props.cont_1_weight}
                            weight_entry_change  = {(event) => props.cont_entry_change(event, props.manID, 'man_c1_weight')} 
                            
                            type_label           = 'Tipo de contenedor.'
                            type_inputType       = 'text'
                            type_name            = 'man_c1_type'
                            type_value           = {props.cont_1_type} 
                            type_entry_change    = {(event) => props.cont_entry_change(event, props.manID, 'man_c1_type')} 

                            cleanEntry           = {(event) => props.cleanEntry(event, props.manID)}                            
                        />

                        <ContainerComponent 
                            componentTitle       = 'Contenedor B'
                     
                            id_label             = 'ID de contenedor.'
                            id_inputType         = 'text'
                            id_name              = 'man_c2_id'
                            id_value             = {props.cont_2_ID} 
                            id_entry_change      = {(event) => props.cont_entry_change(event, props.manID, 'man_c2_id')} 

                            funcParam            = 'man_c2_size'
                            selectedSize         = {props.cont_2_size}
                            sizeChange           = {(event) => props.cont_2_sizeSel(event, props.manID,'2')}
         
                            content_label        = 'Contenido de contenedor.'
                            content_inputType    = 'text'
                            content_name         = 'man_c2_content'
                            content_value        = {props.cont_2_content} 
                            content_entry_change = {(event) => props.cont_entry_change(event, props.manID, 'man_c2_content')} 

                            weight_label         = 'Peso del contenedor.'
                            weight_inputType     = 'number'
                            weight_name          = 'man_c2_weight'
                            weight_value         = {props.cont_2_weight}
                            weight_entry_change  = {(event) => props.cont_entry_change(event, props.manID, 'man_c2_weight')} 
                            
                            type_label           = 'Tipo de contenedor.'
                            type_inputType       = 'text'
                            type_name            = 'man_c2_type'
                            type_value           = {props.cont_2_type} 
                            type_entry_change    = {(event) => props.cont_entry_change(event, props.manID, 'man_c2_type')} 

                            cleanEntry           = {(event) => props.cleanEntry(event, props.manID)}                            
                        />
                    </div>

                    <div>
                        <ContainerComponent 
                            componentTitle       = 'Contenedor C'
                     
                            id_label             = 'ID de contenedor.'
                            id_inputType         = 'text'
                            id_name              = 'man_c3_id'
                            id_value             = {props.cont_3_ID} 
                            id_entry_change      = {(event) => props.cont_entry_change(event, props.manID, 'man_c3_id')} 

                            funcParam            = 'man_c3_size'
                            selectedSize         = {props.cont_3_size}
                            sizeChange           = {(event) => props.cont_3_sizeSel(event, props.manID,'3')}
         
                            content_label        = 'Contenido de contenedor.'
                            content_inputType    = 'text'
                            content_name         = 'man_c3_content'
                            content_value        = {props.cont_3_content} 
                            content_entry_change = {(event) => props.cont_entry_change(event, props.manID, 'man_c3_content')} 

                            weight_label         = 'Peso del contenedor.'
                            weight_inputType     = 'number'
                            weight_name          = 'man_c3_weight'
                            weight_value         = {props.cont_3_weight}
                            weight_entry_change  = {(event) => props.cont_entry_change(event, props.manID, 'man_c3_weight')} 
                            
                            type_label           = 'Tipo de contenedor.'
                            type_inputType       = 'text'
                            type_name            = 'man_c3_type'
                            type_value           = {props.cont_3_type} 
                            type_entry_change    = {(event) => props.cont_entry_change(event, props.manID, 'man_c3_type')} 

                            cleanEntry           = {(event) => props.cleanEntry(event, props.manID)}                            
                        />

                        <ContainerComponent 
                            componentTitle       = 'Contenedor D'
                     
                            id_label             = 'ID de contenedor.'
                            id_inputType         = 'text'
                            id_name              = 'man_c4_id'
                            id_value             = {props.cont_4_ID} 
                            id_entry_change      = {(event) => props.cont_entry_change(event, props.manID, 'man_c4_id')} 

                            funcParam            = 'man_c4_size'
                            selectedSize         = {props.cont_4_size}
                            sizeChange           = {(event) => props.cont_4_sizeSel(event, props.manID,'3')}
         
                            content_label        = 'Contenido de contenedor.'
                            content_inputType    = 'text'
                            content_name         = 'man_c4_content'
                            content_value        = {props.cont_4_content} 
                            content_entry_change = {(event) => props.cont_entry_change(event, props.manID, 'man_c4_content')} 

                            weight_label         = 'Peso del contenedor.'
                            weight_inputType     = 'number'
                            weight_name          = 'man_c4_weight'
                            weight_value         = {props.cont_4_weight}
                            weight_entry_change  = {(event) => props.cont_entry_change(event, props.manID, 'man_c4_weight')} 
                            
                            type_label           = 'Tipo de contenedor.'
                            type_inputType       = 'text'
                            type_name            = 'man_c4_type'
                            type_value           = {props.cont_4_type} 
                            type_entry_change    = {(event) => props.cont_entry_change(event, props.manID, 'man_c4_type')} 

                            cleanEntry           = {(event) => props.cleanEntry(event, props.manID)}                            
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

                    { displayGenerals && (<>
                            
                        <EntryInput
                            titleLabel  = 'Agente aduanal'
                            inputType   = ''
                            name        = 'man_agent'
                            value       = {props.agent}  
                            cleanEntry  = {(event) => props.cleanEntry(event, props.manID)}
                            entryChange = {(event) => props.cont_entry_change(event, props.manID, 'man_agent')} 
                        /> 

                        <EntryInput
                            titleLabel  = 'Ejecutivo(a)'
                            inputType   = ''
                            name        = 'man_executive'
                            value       = {props.executive}  
                            cleanEntry  = {(event) => props.cleanEntry(event, props.manID)}
                            entryChange = {(event) => props.cont_entry_change(event, props.manID, 'man_executive')} 
                        />  

                        <textarea 
                            placeholder = 'Nota(s)'
                            value       = {props.note}
                            onChange    = {(event) => props.cont_entry_change(event, props.manID, 'man_note')} 
                        />

                    </>)}

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

                    <h4 className ={isValid(props.caat) ? '': 'hidden'}>CAAT: {isValid(props.caat) ? props.caat : 'Sin asignar.'}</h4>

{/*                     <EntryInput
                        titleLabel  = 'CAAT'
                        inputType   = ''
                        name        = 'man_caat'
                        value       = {props.caat}  
                        cleanEntry  = {(event) => props.cleanEntry(event, props.manID)}
                        entryChange = {(event) => props.cont_entry_change(event, props.manID, 'man_caat')} 
                    />   */}
                    
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