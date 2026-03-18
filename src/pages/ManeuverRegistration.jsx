import './ManeuverRegistration.css'
import EntryInput              from '../custom_components/entry_input.jsx'
import DropdownInput           from '../custom_components/dropdown_input.jsx'
import ContainerComponent      from '../ContainerComponent.jsx'
import SaveLogo                from '../assets/save_white.svg'
import toast                   from 'react-hot-toast'
import { useState, useEffect } from 'react'
import { useModal }            from '../context/ModalContext'

export default function registration_form()
{
  
  const { openModal } = useModal()

//#region [ STATES AND PH'S ]

  //⚑ Placeholder forms objects...
  let ph_man = 
  {
    man_client:               '',
    man_type:                 '',
    man_dispatch_date:        '',
    man_executive:            '',
    man_agent:                '',
    man_load_location:        '',
    man_unload_location:      '',
    man_extra_location:       '',
    man_extra_location_link:  '',
    man_transporter:          '',
    man_eco:                  '',
    man_operator:             '',
    man_gps_link:             '',
    man_c1_id:                '',
    man_c1_size:              '',
    man_c1_content:           '',
    man_c1_weight:            '',
    man_c1_type:              '',
    man_c2_id:                '',
    man_c2_size:              '',
    man_c2_content:           '',
    man_c2_weight:            '',
    man_c2_type:              '',
    man_c3_id:                '',
    man_c3_size:              '',
    man_c3_content:           '',
    man_c3_weight:            '',
    man_c3_type:              '',
    man_c4_id:                '',
    man_c4_size:              '',
    man_c4_content:           '',
    man_c4_weight:            '',
    man_c4_type:              '', 
  }
      
  const ph_cli = { client_name:      'PENDIENTE',}
  const ph_tra = { transporter_name: 'PENDIENTE',}
  const ph_ope = { operator_name:    'PENDIENTE',}
  const ph_eco = { eco_name:         'PENDIENTE',}

  //⚑ Form default values; MUST be initialized to feed text entries...!
  const [maneuver_form, set_maneuver_form] = useState(ph_man)

  //⚑ Dropdown options list default values; MUST be initialized as array to send data to dropdown controls...!
  const [clients_list, set_clients_list]           = useState([ph_cli])
  const [transporters_list, set_transporters_list] = useState([ph_tra])
  const [ecos_list, set_ecos_list]                 = useState([ph_eco])
  const [operators_list, set_operators_list]       = useState([ph_ope])

  
  let available_modes        = ['PENDIENTE','SINGLE','FULL']
  let available_locations    = ['YARD A', 'YARD B']

//#endregion [ STATES AND PH'S ]

//#region [ API FUNCTIONS ]

  const getClients = async () => 
  {
    //⚑ To force a state change and re-render...
    set_clients_list([ph_cli])

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
          
          set_clients_list([ph_cli, ...responseData.clients_data])
        }
    } 
    catch (error) { openModal(['No hay conexión con el servidor ⛟', 'Por favor inténtalo más tarde ⛟'],0 ) }
  }

  const getTransporters = async () =>
  {
    //⚑ To force a state change and re-render...
    set_transporters_list([ph_tra])
    try 
    {
      const getTransportersResponse = await fetch ('/api/transporters/transporter',
      {
          method:  'GET',
      });
      if (!getTransportersResponse.ok) 
      {
          throw new Error('Problema de conexión con el servidor...');
      }
      else
      {
          const responseData = await getTransportersResponse.json()
          
          //⚑ Set/Reset TRS...
          switch (responseData.code) 
          {
              case '0':
                  //⚑ No TRANSPORTERS stored...
                  set_transporters_list([ph_tra])
              break;
              case '1':
                  //⚑ At least 1 TRANSPORTER stored...
                  set_transporters_list([ph_tra, ...responseData.transporters_data])
              break;
          }    
      }
    } 
      catch (error) { openModal(['No hay conexión con el servidor ⛟', 'Por favor inténtalo más tarde ⛟'],0 ) } 
  }

  const saveManeuver = async () =>
  {
    try 
    {
      const save = await fetch('/api/maneuvers/maneuver', 
      {
          method:  'POST',
          headers: {'Content-Type': 'application/json',},
          body:    JSON.stringify(maneuver_form),
      });
      if (!save.ok) 
      {
          toast.error('No se pudo almacenar la información!',{duration:4000,position:'top-center'});
          throw new Error("Error al procesar en el servidor...");
      }
      
      toast.success('Maniobra guardada exitosamente!',{duration:4000,position:'top-center'});
      
      //⚑ API based re-render...
      await getTransporters()
      await getClients()
        
    } catch (error) { console.log(error) }
  }

//#endregion [ API FUNCTIONS ]

  useEffect(() => 
  {
    getClients()
    getTransporters()
  },[])

//#region [ FORM FUNCTIONS ]  

  function handleSubSelection(event)
  {
    if (event.target.value != 'PENDIENTE') 
    {
      const new_eco_options = transporters_list.find(transporterOject => transporterOject.transporter_name === event.target.value).transporter_equipment 
      set_ecos_list([ph_eco, ...new_eco_options])
      
      const new_ops_options = transporters_list.find(transporterOject => transporterOject.transporter_name === event.target.value).transporter_operators 
      set_operators_list([ph_ope, ...new_ops_options])

      set_maneuver_form(prev => (
      {
        ...prev,
        ['man_transporter']: event.target.value
      }))      
    }
    else
    {
      set_ecos_list([ph_eco])
      set_operators_list([ph_ope])
    }
  }

  function handleSelection(event, funcParameter)
  {
    set_maneuver_form(prev => (
    {
      ...prev,
      [funcParameter]: event.target.value
    })) 
  } 

  function clearEntry(fieldToClean)
  { 
    //Updates the active object...
    set_maneuver_form(prev => (
    {
      ...prev,
      [fieldToClean]: ''
    }))
  }
  
  function entryChange(event)
  {
    //Updates the active object...
    set_maneuver_form(prev => (
    {
      ...prev,
      [event.target.name]: event.target.value
    })) 
  }

//#endregion [ FORM FUNCTIIONS]

  return(
    <form className='MR_form'>

      <span>Registro de maniobra.</span>

      <div className='MR_upper_form'>

        <div className='MR_general_data_item'>
          <DropdownInput
            titleLabel     = 'Selección de contacto'
            options_master = {clients_list}
            accessProperty = {'client_name'}
            funcParam      = {'man_client'}
            onChange       = {handleSelection}   
          />

          <DropdownInput
            titleLabel     = 'Tipo de maniobra'
            options_master = {available_modes} 
            accessProperty = {''}
            funcParam      = {'man_type'}
            onChange       = {handleSelection}  
          />

          <EntryInput
            titleLabel  = 'Fecha de despacho'
            inputType   = 'datetime-local'
            name        = 'man_dispatch_date'
            value       = {maneuver_form.man_dispatch_date}  
            cleanEntry  = {clearEntry}
            entryChange = {entryChange}
          />
  
          <EntryInput
            titleLabel  = 'Ejecutivo(a)'
            inputType   = 'text'
            name        = 'man_executive'
            value       = {maneuver_form.man_executive} 
            cleanEntry  = {clearEntry}
            entryChange = {entryChange}
          />
 
          <EntryInput
            titleLabel  = 'Agente aduanal'
            inputType   = 'text'
            name        = 'man_agent'
            value       = {maneuver_form.man_agent} 
            cleanEntry  = {clearEntry}
            entryChange = {entryChange}
          />   
        </div>

         <div className='MR_general_data_item'>
          <DropdownInput
            titleLabel     = 'Terminal de carga'
            options_master = {available_locations}
            accessProperty = {''} 
            funcParam      = {'man_load_location'}
            onChange       = {handleSelection}      
          />

          <EntryInput
            titleLabel  = 'Otra terminal de carga'
            inputType   = 'text'
            name        = 'man_load_location'
            value       = {maneuver_form.man_load_location} 
            cleanEntry  = {clearEntry}
            entryChange = {entryChange}
          />

          <DropdownInput
            titleLabel     = 'Sitio de descarga'
            options_master = {available_locations}
            accessProperty = {''} 
            funcParam      = {'man_unload_location'}
            onChange       = {handleSelection}      
          />

          <EntryInput
            titleLabel  = 'Otro sitio de descarga'
            inputType   = 'text'
            name        = 'man_unload_location'
            value       = {maneuver_form.man_unload_location} 
            cleanEntry  = {clearEntry}
            entryChange = {entryChange}
          />

          <EntryInput
            titleLabel  = 'Link de ubicación sitio extra'
            inputType   = 'text'
            name        = 'man_extra_location_link'
            value       = {maneuver_form.man_extra_location_link} 
            cleanEntry  = {clearEntry}
            entryChange = {entryChange}
          />
        </div>

        <div className='MR_general_data_item'>
          <DropdownInput
            titleLabel     = 'Transportista'
            options_master = {transporters_list}
            accessProperty = {'transporter_name'} 
            funcParam      = {'transporter_name'}
            onChange       = {handleSubSelection}      
          />

          <DropdownInput
            titleLabel     = 'ECO'
            options_master = {ecos_list}
            accessProperty = {'eco_name'} 
            funcParam      = {'maneuver_eco'}
            onChange       = {handleSelection}      
          />

          <DropdownInput
            titleLabel     = 'Operador'
            options_master = {operators_list}
            accessProperty = {'operator_name'} 
            funcParam      = {'man_operator'}
            onChange       = {handleSelection}      
          />
 
          <EntryInput
            titleLabel  = 'Otro operador'
            inputType   = 'text'
            name        = 'man_operator'
            value       = {maneuver_form.man_operator} 
            cleanEntry  = {clearEntry}
            entryChange = {entryChange}
          />

          <EntryInput
            titleLabel  = 'Link GPS'
            inputType   = 'text'
            name        = 'man_gps_link'
            value       = {maneuver_form.man_gps_link} 
            cleanEntry  = {clearEntry}
            entryChange = {entryChange}
          />
        </div>

      </div>

      <div className='MR_lower_form'>

        <div className = { maneuver_form.man_type === 'FULL' ? '' : (maneuver_form.man_type === 'SINGLE' ? '':'hidden')} >
        <ContainerComponent 
          componentTitle    = 'Contenedor A'
          id_label          = 'ID de contenedor.'
          id_inputType      = 'text'
          id_name           = 'man_c1_id'
          id_value          = {maneuver_form.man_c1_id} 
          content_label     = 'Contenido de contenedor.'
          content_inputType = 'text'
          content_name      = 'man_c1_content'
          content_value     = {maneuver_form.man_c1_content} 
          weight_label      = 'Peso del contenedor.'
          weight_inputType  = 'number'
          weight_name       = 'man_c1_weight'
          weight_value      = {maneuver_form.man_c1_weight} 
          type_label        = 'Tipo de contenedor.'
          type_inputType    = 'text'
          type_name         = 'man_c1_type'
          type_value        = {maneuver_form.man_c1_type} 
          funcParam         = 'man_c1_size'
          cleanEntry        = {clearEntry}
          entryChange       = {entryChange}
          selectChange      = {handleSelection}
        />
        </div>

        <div className = { maneuver_form.man_type === 'FULL' ? '' : (maneuver_form.man_type === 'SINGLE' ? '':'hidden')} >
        <ContainerComponent 
          componentTitle    = 'Contenedor B'
          id_label          = 'ID de contenedor.'
          id_inputType      = 'text'
          id_name           = 'man_c2_id'
          id_value          = {maneuver_form.man_c2_id} 
          content_label     = 'Contenido de contenedor.'
          content_inputType = 'text'
          content_name      = 'man_c2_content'
          content_value     = {maneuver_form.man_c2_content} 
          weight_label      = 'Peso del contenedor.'
          weight_inputType  = 'number'
          weight_name       = 'man_c2_weight'
          weight_value      = {maneuver_form.man_c2_weight} 
          type_label        = 'Tipo de contenedor.'
          type_inputType    = 'text'
          type_name         = 'man_c2_type'
          type_value        = {maneuver_form.man_c2_type} 
          funcParam         = 'man_c2_size'
          cleanEntry        = {clearEntry}
          entryChange       = {entryChange}
          selectChange      = {handleSelection}
        />
        </div>

        <div className = {maneuver_form.man_type === 'FULL' ? '' : 'hidden'}>
        <ContainerComponent 
          componentTitle    = 'Contenedor C'
          id_label          = 'ID de contenedor.'
          id_inputType      = 'text'
          id_name           = 'man_c3_id'
          id_value          = {maneuver_form.man_c3_id} 
          content_label     = 'Contenido de contenedor.'
          content_inputType = 'text'
          content_name      = 'man_c3_content'
          content_value     = {maneuver_form.man_c3_content} 
          weight_label      = 'Peso del contenedor.'
          weight_inputType  = 'number'
          weight_name       = 'man_c3_weight'
          weight_value      = {maneuver_form.man_c3_weight} 
          type_label        = 'Tipo de contenedor.'
          type_inputType    = 'text'
          type_name         = 'man_c3_type'
          type_value        = {maneuver_form.man_c3_type} 
          funcParam         = 'man_c3_size'
          cleanEntry        = {clearEntry}
          entryChange       = {entryChange}
          selectChange      = {handleSelection}
        />
        </div>

        <div className = {maneuver_form.man_type === 'FULL' ? '' : 'hidden'}>
        <ContainerComponent 
          componentTitle    = 'Contenedor D'
          id_label          = 'ID de contenedor.'
          id_inputType      = 'text'
          id_name           = 'man_c4_id'
          id_value          = {maneuver_form.man_c4_id} 
          content_label     = 'Contenido de contenedor.'
          content_inputType = 'text'
          content_name      = 'man_c4_content'
          content_value     = {maneuver_form.man_c4_content} 
          weight_label      = 'Peso del contenedor.'
          weight_inputType  = 'number'
          weight_name       = 'man_c4_weight'
          weight_value      = {maneuver_form.man_c4_weight} 
          type_label        = 'Tipo de contenedor.'
          type_inputType    = 'text'
          type_name         = 'man_c4_type'
          type_value        = {maneuver_form.man_c4_type} 
          funcParam         = 'man_c4_size'
          cleanEntry        = {clearEntry}
          entryChange       = {entryChange}
          selectChange      = {handleSelection}
        />
        </div>

      </div>  

      <button
        className = 'MR_c2a'
        type      = 'button'
        onClick   = {saveManeuver}
      >
        Guardar maniobra 
        <img src={SaveLogo} alt="save maneuver button" />
      </button>
      
    </form>
  )
}