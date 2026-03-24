import './ManeuversPage.css'
import EntryInput              from '../custom_components/entry_input.jsx'
import CheckInput              from '../custom_components/check_input.jsx'
import Maneuver                from '../custom_components/maneuver.jsx'
import { isValid }             from '../common_functions.js'
import { useEffect, useState } from 'react'

export default function ManeuversPage ()
{

    const ph_cli = 
    {
        client_id:        '0',
        client_name:      'PENDIENTE',
        client_phone:     '',
        client_email:     '',
        client_search:    '',
    }

    const ph_tr = 
    {
        transporter_id:         '0',
        transporter_name:       'NUEVO TRANSPORTISTA',
        transporter_caat:       '',
        transporter_search:     '',
        transporter_operators:  [ ],
        transporter_equipment:  [ ],
    }

    const ph_op = 
    {
        operator_id:      '',
        operator_name:    'NUEVO OPERADOR',
        operator_rfc:     '',
        operator_nss:     '',
        operator_license: '',
        operator_address: '',
        operator_tr_id:   '',
    }

    const ph_ec = 
    {
        eco_id:                '',
        eco_name:              'NUEVO ECO',
        eco_number:            '',
        eco_plates:            '',
        eco_model:             '',
        eco_color:             '',
        eco_serial_number:     '',
        eco_motor_number:      '',
        eco_insurance_company: '',
        eco_insurance_policy:  '',
    }

    const defined_locations = []
    const defined_status    = ['SIN INICIAR','Status A', 'Status B','Status C']

    const custom_locations = 
    [
        {
            location_name: 'SIN INICIAR',
            location_status: ['SIN INICIAR','CANCELADO']
        },
        {
            location_name: 'ACL',
            location_status: ['ACL - Status A','ACL - Status B']
        },
        {
            location_name: 'ROUTER',
            location_status: ['ROUTER - Status A','ROUTER - Status B']
        },
    ]

    custom_locations.forEach(location => { defined_locations.push(location.location_name) });

    const [maneuversList, setmaneuversList]       = useState([])
    const [clientslist, setclientslist]           = useState([ph_cli])
    const [statusList, setstatusList]             = useState(custom_locations[0].location_status)
    const [transportersList, settransportersList] = useState([ph_tr])
    const [operatorList, setoperatorList]         = useState([ph_op])
    const [ecoList, setecoList]                   = useState([ph_ec])



    const getClients = async () =>
    {
        //⚑ To force a state change and re-render...
        setclientslist([ph_cli])

        try 
        {
            const getClientResponse = await fetch ('/api/clients/client',
            {
                method:  'GET',
            });

            if (!getClientResponse.ok) 
            {
                throw new Error('Problema de conexión con el servidor...');
            }
            else
            {
                const responseData = await getClientResponse.json()
                
                //⚑ Set/Reset clients list...
                switch (responseData.code) 
                {
                    case '0':
                        //⚑ No CLIENTS stored, force to empty list to default...
                        setclientslist([ph_cli])
                    break;

                    case '1':
                        //⚑ At least 1 CLIENT stored...
                        setclientslist([ph_cli, ...responseData.clients_data])
                    break;
                }
            }
        } 
        catch (error) { openModal(['No hay conexión con el servidor ⛟', 'Por favor inténtalo más tarde ⛟'],0 ) }
    }

    const getManeuvers = async () =>
    {
        //⚑ To force a state change and re-render...
        setmaneuversList([])

        try 
        {
            const getManeuversResponse = await fetch ('/api/maneuvers/maneuver',
            {
                method:  'GET',
            });

            if (!getManeuversResponse.ok) 
            {
                throw new Error('Problema de conexión con el servidor...');
            }
            else
            {
                const responseData = await getManeuversResponse.json()
                
                //⚑ Set/Reset maneuvers list...
                switch (responseData.code) 
                {
                    case '0':
                        //⚑ No MANEUVERS stored, force to empty list to default...
                        setmaneuversList([])
                    break;

                    case '1':
                        //⚑ At least 1 MANEUVERS stored...
                        setmaneuversList(responseData.maneuvers_data)
                    break;
                }
            }
        } 
        catch (error) { openModal(['No hay conexión con el servidor ⛟', 'Por favor inténtalo más tarde ⛟'],0 ) }
    }





    useEffect(()=>
    {
        getClients()
        getManeuvers()
    },[])




    function clientSelection(event, man_id)
    {
        //console.log('Client changed')

        // Create main MANEUVERS list copy...
        const maneuvers_copy = [...maneuversList]

        // Find the object to be updated from the list...
        const updatedManeuver =  maneuvers_copy.find(maneuver => maneuver.man_id === man_id)
        
        // Update the found object properties...
        updatedManeuver.man_client = event.target.value
        
        //console.log(updatedManeuver)

        // Update STATES...
        setmaneuversList(maneuvers_copy)
    }

    function modeSelection(event, man_id)
    {
        //console.log('Mode changed')

        // Create main MANEUVERS list copy...
        const maneuvers_copy = [...maneuversList]

        // Find the object to be updated from the list...
        const updatedManeuver = maneuvers_copy.find(maneuver => maneuver.man_id === man_id)
        
        // Update the found object properties...
        updatedManeuver.man_type = event.target.value

        //console.log(updatedManeuver)

        // Update STATES...
        setmaneuversList(maneuvers_copy)
    }

    function locationSelection(event, man_id)
    {
        //console.log('Location changed')

        // Create main MANEUVERS list copy...
        const maneuvers_copy = [...maneuversList]

        //Find specific LOCATION object from list and update LOCATION only if found... 
        const updatedManeuver = maneuvers_copy.find(maneuver => maneuver.man_id === man_id)

        updatedManeuver.man_current_location = event.target.value
  

        // Update STATUS list according to location selection, and set the default STATUS event...
        const statusListCopy = [...custom_locations] 
        const newstatusList = statusListCopy.find(location => location.location_name === event.target.value)
        updatedManeuver.man_current_status = newstatusList.location_status[0] 
       
        //console.log(updatedManeuver)

        // Update STATES...
        setstatusList(newstatusList.location_status)
        setmaneuversList(maneuvers_copy)
    }

    function statusChange(event, man_id)
    {
        //console.log('Status changed')

        // Create main MANEUVERS list copy...
        const maneuvers_copy = [...maneuversList]

        // Find the object to be updated from the list...
        const updatedManeuver = maneuvers_copy.find(maneuver => maneuver.man_id === man_id)

        // Update the found object properties...
        updatedManeuver.man_current_status = event.target.value
        
        //console.log(updatedManeuver)

        // Update STATES...
        setmaneuversList(maneuvers_copy)
    }

    function dateEntry(event, man_id, date2Adjust)
    {
        // Create main MANEUVERS list copy...
        const maneuvers_copy = [...maneuversList]
        
        // Find the object to be updated from the list...
        const updatedManeuver = maneuvers_copy.find(maneuver => maneuver.man_id === man_id)

        // Update the found object properties...
        switch (date2Adjust) 
        {
            case 'START':
                updatedManeuver.man_dispatch_date = event.target.value                
            break;
        }

        //console.log(updatedManeuver)

        // Update STATES...
        setmaneuversList(maneuvers_copy)
    }
    
    function cleanEntries(event, man_id, control)
    {
        console.log(event)
        console.log(man_id)
        console.log(control)

        // Create main MANEUVERS list copy...
        const maneuvers_copy = [...maneuversList]
        
        // Find the object to be updated from the list...
        const updatedManeuver = maneuvers_copy.find(maneuver => maneuver.man_id === man_id)

        // Set state according to control
        switch (control) 
        {
            case 'START DATE CLEAN':
                 updatedManeuver.man_dispatch_date = ''        
            break;
        }

        // Update STATES...
        setmaneuversList(maneuvers_copy)
    }

    function containerSizeSelection(event, man_id, container_number)
    {
        console.log('Container size changed')

        // Create main MANEUVERS LIST copy...
        const maneuvers_copy = [...maneuversList]

        // Find the MANEUVER OBJECT to be updated from the list...
        const updatedManeuver = maneuvers_copy.find(maneuver => maneuver.man_id === man_id)
        
        // Update found MANEUVER OBJECT property...
        switch (container_number) 
        {
            case '1':
                updatedManeuver.man_c1_size = event.target.value === 'Seleccionar' ? '' : event.target.value        
            break;

            case '2':
                updatedManeuver.man_c2_size = event.target.value === 'Seleccionar' ? '' : event.target.value        
            break;

            case '3':
                updatedManeuver.man_c3_size = event.target.value === 'Seleccionar' ? '' : event.target.value        
            break;

            case '4':
                updatedManeuver.man_c4_size = event.target.value === 'Seleccionar' ? '' : event.target.value        
            break;
        }
        console.log(updatedManeuver)
        // Update the MANEUVERS LIST with the only...
        setmaneuversList(maneuvers_copy)
    }

    function clear_entry()
    {
        console.log('Clear entry')
    }





    return(
        <section className='MP_container'>
            <article className='filter_container'>                   
                <CheckInput
                    titleLabel  = 'Hoy'
                    name        = 'today_check'
                    checked     = {clientSelection} 
                />

                <EntryInput
                    titleLabel  = 'De'
                    inputType   = 'datetime-local'
                    name        = ''
                    value       = {''}  
                    /* cleanEntry  = {clearEntry}
                    entryChange = {entryChange}  */
                />

                <EntryInput
                    titleLabel  = 'Hasta'
                    inputType   = 'datetime-local'
                    name        = ''
                    value       = {''}  
                    /*  cleanEntry  = {clearEntry}
                    entryChange = {entryChange}  */
                />
            </article>

            <article className='MP_main_content'>

                <aside className='MP_maneuvers'>

                    {
                        maneuversList.map((maneuver, index) => 
                        (
                            <Maneuver
                                key              = {index}
                                manID            = {maneuver.man_id}  
                                manAdvance       = {maneuver.man_events[maneuver.man_events.length-1]}   

 
                                clienstList      = {clientslist}
                                selectedClient   = {maneuver.man_client}
                                onClientChange   = {clientSelection}
 
                                selectedType     = {maneuver.man_type}
                                onTypeChange     = {modeSelection}

                                locationList     = {defined_locations}
                                currentLocation  = {maneuver.man_current_location}
                                onLocationChange = {locationSelection}

                                statusList       = {statusList}
                                currentStatus    = {maneuver.man_current_status}
                                onStatusChange   = {statusChange}

                                dispatchDate     = {maneuver.man_dispatch_date}
                                cleanEntry       = {cleanEntries}
                                entryChange      = {dateEntry}

                                endDate          = {
                                                        maneuver.man_events[maneuver.man_events.length-1] === '0%' ? ('SIN INICIAR') 
                                                        : maneuver.man_events[maneuver.man_events.length-1] === '100%' ? (maneuver.man_events[maneuver.man_events.length-4])
                                                        : 'AÚN EN CURSO'
                                                   }

                                cont_1_ID       = {isValid(maneuver.man_c1_id)      ? maneuver.man_c1_id      : 'Sin usar'}
                                cont_1_content  = {isValid(maneuver.man_c1_content) ? maneuver.man_c1_content : ''}
                                cont_1_weight   = {isValid(maneuver.man_c1_weight)  ? maneuver.man_c1_weight  : ''}
                                cont_1_type     = {isValid(maneuver.man_c1_type)    ? maneuver.man_c1_type    : ''}    
                                cont_1_size     = {maneuver.man_c1_size} 
                                cont_1_sizeSel  = {containerSizeSelection} 

                                cont_2_ID       = {isValid(maneuver.man_c2_id)      ? maneuver.man_c2_id      : 'Sin usar'}
                                cont_2_content  = {isValid(maneuver.man_c2_content) ? maneuver.man_c2_content : ''}
                                cont_2_weight   = {isValid(maneuver.man_c2_weight)  ? maneuver.man_c2_weight  : ''}
                                cont_2_type     = {isValid(maneuver.man_c2_type)    ? maneuver.man_c2_type    : ''}    
                                cont_2_size     = {maneuver.man_c2_size} 
                                cont_2_sizeSel  = {containerSizeSelection} 

                                cont_3_ID       = {isValid(maneuver.man_c3_id)      ? maneuver.man_c3_id      : 'Sin usar'}
                                cont_3_content  = {isValid(maneuver.man_c3_content) ? maneuver.man_c3_content : ''}
                                cont_3_weight   = {isValid(maneuver.man_c3_weight)  ? maneuver.man_c3_weight  : ''}
                                cont_3_type     = {isValid(maneuver.man_c3_type)    ? maneuver.man_c3_type    : ''}    
                                cont_3_size     = {maneuver.man_c3_size} 
                                cont_3_sizeSel  = {containerSizeSelection} 

                                cont_4_ID       = {isValid(maneuver.man_c4_id)      ? maneuver.man_c4_id      : 'Sin usar'}
                                cont_4_content  = {isValid(maneuver.man_c4_content) ? maneuver.man_c4_content : ''}
                                cont_4_weight   = {isValid(maneuver.man_c4_weight)  ? maneuver.man_c4_weight  : ''}
                                cont_4_type     = {isValid(maneuver.man_c4_type)    ? maneuver.man_c4_type    : ''}    
                                cont_4_size     = {maneuver.man_c4_size} 
                                cont_4_sizeSel  = {containerSizeSelection} 
                            />
                    ))}



                </aside>

                {/* <aside className='MP_visuals'> */}
                <aside className='hidden'>
                    <div className='MP_visuals_item'>
                        Events list
                    </div>
                    <div className='MP_visuals_item'>
                        Map
                    </div>
                </aside>    
            </article>

        </section>
    )
}