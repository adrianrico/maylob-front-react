
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
                    cleanEntry = {(event) => props.cleanEntry(event, props.manID, 'START DATE CLEAN')} 
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
                            componentTitle    = 'Contenedor A'
                            id_label          = 'ID de contenedor.'
                            id_inputType      = 'text'
                            id_name           = 'man_c1_id'
                            id_value          = {props.cont_1_ID} 
                            content_label     = 'Contenido de contenedor.'
                            content_inputType = 'text'
                            content_name      = 'man_c1_content'
                            content_value     = {props.cont_1_content} 
                            weight_label      = 'Peso del contenedor.'
                            weight_inputType  = 'number'
                            weight_name       = 'man_c1_weight'
                            weight_value      = {props.cont_1_weight} 
                            type_label        = 'Tipo de contenedor.'
                            type_inputType    = 'text'
                            type_name         = 'man_c1_type'
                            type_value        = {props.cont_1_type} 
                            funcParam         = 'man_c1_size'
                            selectedSize      = {props.cont_1_size}
                            sizeChange        = {(event) => props.cont_1_sizeSel(event, props.manID,'1')}
                        />

                        <ContainerComponent 
                            componentTitle    = 'Contenedor B'
                            id_label          = 'ID de contenedor.'
                            id_inputType      = 'text'
                            id_name           = 'man_c2_id'
                            id_value          = {props.cont_2_ID} 
                            content_label     = 'Contenido de contenedor.'
                            content_inputType = 'text'
                            content_name      = 'man_c2_content'
                            content_value     = {props.cont_2_content} 
                            weight_label      = 'Peso del contenedor.'
                            weight_inputType  = 'number'
                            weight_name       = 'man_c2_weight'
                            weight_value      = {props.cont_2_weight} 
                            type_label        = 'Tipo de contenedor.'
                            type_inputType    = 'text'
                            type_name         = 'man_c2_type'
                            type_value        = {props.cont_2_type} 
                            funcParam         = 'man_c2_size'
                            selectedSize      = {props.cont_2_size}
                            sizeChange        = {(event) => props.cont_2_sizeSel(event, props.manID,'2')}
                        />
                    </div>

                    <div>
                        <ContainerComponent 
                            componentTitle    = 'Contenedor C'
                            id_label          = 'ID de contenedor.'
                            id_inputType      = 'text'
                            id_name           = 'man_c3_id'
                            id_value          = {props.cont_3_ID} 
                            content_label     = 'Contenido de contenedor.'
                            content_inputType = 'text'
                            content_name      = 'man_c3_content'
                            content_value     = {props.cont_3_content} 
                            weight_label      = 'Peso del contenedor.'
                            weight_inputType  = 'number'
                            weight_name       = 'man_c3_weight'
                            weight_value      = {props.cont_3_weight} 
                            type_label        = 'Tipo de contenedor.'
                            type_inputType    = 'text'
                            type_name         = 'man_c3_type'
                            type_value        = {props.cont_3_type} 
                            funcParam         = 'man_c3_size'
                            selectedSize      = {props.cont_3_size}
                            sizeChange        = {(event) => props.cont_3_sizeSel(event, props.manID,'3')}
                        />

                        <ContainerComponent 
                            componentTitle    = 'Contenedor D'
                            id_label          = 'ID de contenedor.'
                            id_inputType      = 'text'
                            id_name           = 'man_c4_id'
                            id_value          = {props.cont_4_ID} 
                            content_label     = 'Contenido de contenedor.'
                            content_inputType = 'text'
                            content_name      = 'man_c4_content'
                            content_value     = {props.cont_4_content} 
                            weight_label      = 'Peso del contenedor.'
                            weight_inputType  = 'number'
                            weight_name       = 'man_c4_weight'
                            weight_value      = {props.cont_4_weight} 
                            type_label        = 'Tipo de contenedor.'
                            type_inputType    = 'text'
                            type_name         = 'man_c4_type'
                            type_value        = {props.cont_4_type} 
                            funcParam         = 'man_c4_size'
                            selectedSize      = {props.cont_4_size}
                            sizeChange        = {(event) => props.cont_4_sizeSel(event, props.manID,'4')}
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
                            name        = ''
                            value       = {props.man_dispatch_date}  
                            cleanEntry  = {props.cleanEntry}
                            entryChange = {props.entryChange} 
                        /> 

                        <EntryInput
                            titleLabel  = 'Ejecutivo(a)'
                            inputType   = ''
                            name        = ''
                            value       = {props.man_dispatch_date}  
                            cleanEntry  = {props.cleanEntry}
                            entryChange = {props.entryChange} 
                        />  
                        
                        <EntryInput
                            titleLabel  = 'CAAT'
                            inputType   = ''
                            name        = ''
                            value       = {props.man_dispatch_date}  
                            cleanEntry  = {props.cleanEntry}
                            entryChange = {props.entryChange} 
                        />  

                        <textarea 
                            placeholder='Nota(s)'
                            cleanEntry  = {props.cleanEntry}
                            onChange = {props.entryChange} 
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