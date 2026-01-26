import './ManeuverRegistration.css'
import EntryInput             from '../custom_components/entry_input.jsx'
import DropdownInput          from '../custom_components/dropdown_input.jsx'
import ContainerComponent     from '../ContainerComponent.jsx'
import SaveLogo               from '../assets/save_white.svg'
import { useState }           from 'react'
import { buildDefaultObject } from '../common_functions.js'

export default function registration_form()
{
 
//#region    [ DATA SIMULATION ]
  let found_users = 
  [
    {
      user_id:1,
      user_name: 'User_A',
      user_phone:'123 123 123',
      user_mail: 'User_A@mail.com'
    },
    {
      user_id:2,
      user_name: 'User_B',
      user_phone:'321 321 321',
      user_mail: 'User_B@mail.com'
    },
    {
      user_id:3,
      user_name: 'User_C',
      user_phone:'456 456 456',
      user_mail: 'User_C@mail.com'
    }
  ]

  let builtDefaultObject = buildDefaultObject(found_users[0])

  found_users.unshift(builtDefaultObject)
  found_users[0].user_id   = 0
  found_users[0].user_name = 'Select contact'

  let found_transporters = 
  [
    {
      transporter_id:1,
      transporter_name: 'Transporter A',
      transporter_ecos:[
        {eco_name:'ta_eco23'},
        {eco_name:'ta_eco32'},
      ],
      transporter_operators:[
        {operator_name:'op_a_1'},
        {operator_name:'op_a_2'},
      ]
    },
    {
      transporter_id:2,
      transporter_name: 'Transporter B',
      transporter_ecos:[
        {eco_name:'tb_eco45'},
        {eco_name:'tb_eco54'},
      ],
      transporter_operators:[
        {operator_name:'op_b_1'},
        {operator_name:'op_b_2'},
      ]
    }
  ]

  let builtDefaultObject_transporter = buildDefaultObject(found_transporters[0])

  found_transporters.unshift(builtDefaultObject_transporter)
  found_transporters[0].transporter_id        = 0
  found_transporters[0].transporter_name      = 'Select transporter'
  found_transporters[0].transporter_ecos      = []
  found_transporters[0].transporter_operators = []

  let available_modes      = ['SINGLE','FULL']
  let available_locations    = ['YARD A', 'YARD B']
 
//#endregion [ DATA SIMULATION ]

    



//#region    [ STATES ]

  //Final object to be sent...
  let maneuver_object = 
  {
    maneuver_client:               found_users[0].user_name,
    maneuver_type:                 available_modes[0],
    maneuver_dispatch_date:        '',
    maneuver_executive:            '',
    maneuver_agent:                '',
    maneuver_load_location:        '',
    maneuver_unload_location:      '',
    maneuver_extra_location:       '',
    maneuver_extra_location_link:  '',
    maneuver_transporter:          found_transporters[0].transporter_name,
    maneuver_eco:                  '',
    maneuver_operator:             '',
    maneuver_c1_id:                '',
    maneuver_c1_size:              '',
    maneuver_c1_content:           '',
    maneuver_c1_weight:            '',
    maneuver_c1_type:              '',
    maneuver_c2_id:                '',
    maneuver_c2_size:              '',
    maneuver_c2_content:           '',
    maneuver_c2_weight:            '',
    maneuver_c2_type:              '',
    maneuver_c3_id:                '',
    maneuver_c3_size:              '',
    maneuver_c3_content:           '',
    maneuver_c3_weight:            '',
    maneuver_c3_type:              '',
    maneuver_c4_id:                '',
    maneuver_c4_size:              '',
    maneuver_c4_content:           '',
    maneuver_c4_weight:            '',
    maneuver_c4_type:              '',
  }

  //Set to user default values initially...
  const [formValues, setFormValues] = useState(maneuver_object)
  
  /*
  Set the dependant options according to form values actual state...
  FORM VALUES is updated when re-rendered...!
  */
  const ecos_sub_master = found_transporters.find(transporterOject => transporterOject.transporter_name === formValues.maneuver_transporter).transporter_ecos 
  ecos_sub_master.unshift({eco_name:'Select Option'})

  const operators_sub_master = found_transporters.find(transporterOject => transporterOject.transporter_name === formValues.maneuver_transporter).transporter_operators 
  operators_sub_master.unshift({operator_name:'Select Option'})

//console.log(operators_sub_master)
console.log(formValues)

  function handleClientSelection(event)
  {
    //Set the found user as new active object...
    const newSelectedObject = found_users.find(user => user.user_name === event.target.value) 

    setFormValues(prev => (
    {
      ...prev,
      ['maneuver_client']: newSelectedObject.user_name
    }))
  }

  function handleSubSelection(event)
  {
    //Set the found user as new active object...
    console.log(event.target.value)
    const new_eco_options = found_transporters.find(transporterOject => transporterOject.transporter_name === event.target.value).transporter_ecos 
    new_eco_options.unshift({eco_name:'Select Option'})

    const new_ops_options = found_transporters.find(transporterOject => transporterOject.transporter_name === event.target.value).transporter_operators 
    new_ops_options.unshift({operator_name:'Select Option'})

    console.log(new_ops_options)
    setFormValues(prev => (
    {
      ...prev,
      ['maneuver_transporter']: event.target.value,
      ['maneuver_eco']: new_eco_options[0].eco_name,
      ['maneuver_operator']: new_ops_options[0].operator_name
    }))
  }

  function handleSelection(event, customParameter)
  {
    setFormValues(prev => (
    {
      ...prev,
      [customParameter]: event.target.value
    })) 
  } 

  function clearEntry(fieldToClean)
  { 
    //Updates the active object...
    setFormValues(prev => (
    {
      ...prev,
      [fieldToClean]: ''
    }))
  }

  function entry_change(event)
  {
    //Updates the active object...
    setFormValues(prev => (
    {
      ...prev,
      [event.target.name]: event.target.value
    })) 
  }
//#endregion [ STATES ]





  return(
    <form className='MR_form'>

      <span>Registration.</span>

      <div className='MR_upper_form'>
        <div className='MR_general_data_item'>
            <DropdownInput
              titleLabel     = 'Selección de contacto'
              options_master = {found_users}
              accessProperty = {'user_name'}
              onChange       = {handleClientSelection}      
            />

            <DropdownInput
              titleLabel     = 'Tipo de maniobra'
              options_master = {available_modes} 
              accessProperty = {''}
              funcParam      = {'maneuver_type'}
              onChange       = {handleSelection}      
            />

            <EntryInput
              titleLabel  = 'Fecha de despacho'
              inputType   = 'datetime-local'
              name        = 'maneuver_dispatch_date'
              value       = {formValues.maneuver_dispatch_date}  
              cleanEntry  = {clearEntry}
              entryChange = {entry_change}
            />

            <EntryInput
              titleLabel  = 'Ejecutivo(a)'
              inputType   = 'text'
              name        = 'maneuver_executive'
              value       = {formValues.maneuver_executive} 
              cleanEntry  = {clearEntry}
              entryChange = {entry_change}
            />

            <EntryInput
              titleLabel  = 'Agente aduanal'
              inputType   = 'text'
              name        = 'maneuver_agent'
              value       = {formValues.maneuver_agent} 
              cleanEntry  = {clearEntry}
              entryChange = {entry_change}
            />
        </div>

        <div className='MR_general_data_item'>
          <DropdownInput
            titleLabel     = 'Terminal de carga'
            options_master = {available_locations}
            accessProperty = {''} 
            funcParam      = {'maneuver_load_location'}
            onChange       = {handleSelection}      
          />

          <DropdownInput
            titleLabel     = 'Sitio de descarga'
            options_master = {available_locations}
            accessProperty = {''} 
            funcParam      = {'maneuver_unload_location'}
            onChange       = {handleSelection}      
          />

          <EntryInput
            titleLabel  = 'Sitio de descarga extra'
            inputType   = 'text'
            name        = 'maneuver_extra_location'
            value       = {formValues.maneuver_extra_location} 
            cleanEntry  = {clearEntry}
            entryChange = {entry_change}
          />

          <EntryInput
            titleLabel  = 'Link de ubicación sitio extra'
            inputType   = 'text'
            name        = 'maneuver_extra_location_link'
            value       = {formValues.maneuver_extra_location_link} 
            cleanEntry  = {clearEntry}
            entryChange = {entry_change}
          />
        </div>

        <div className='MR_general_data_item'>
          <DropdownInput
            titleLabel     = 'Transportista'
            options_master = {found_transporters}
            accessProperty = {'transporter_name'} 
            funcParam      = {'transporter_name'}
            onChange       = {handleSubSelection}      
          />

          <DropdownInput
            titleLabel     = 'Selección de ECO'
            options_master = {ecos_sub_master}
            accessProperty = {'eco_name'} 
            funcParam      = {'maneuver_eco'}
            onChange       = {handleSelection}      
          />

          <DropdownInput
            titleLabel     = 'Selección de operador'
            options_master = {operators_sub_master}
            accessProperty = {'operator_name'} 
            funcParam      = {'maneuver_operator'}
            onChange       = {handleSelection}      
          />

          <EntryInput
            titleLabel  = 'Manual Entry'
            inputType   = 'text'
            name        = 'maneuver_extra_location_link'
            value       = {formValues.maneuver_extra_location_link} 
            cleanEntry  = {clearEntry}
            entryChange = {entry_change}
          />
        </div>
      </div>

      <div className='MR_lower_form'>
        <ContainerComponent 
          componentTitle    = 'Contenedor A'
          id_label          = 'ID de contenedor.'
          id_inputType      = 'text'
          id_name           = 'maneuver_c1_id'
          id_value          = {formValues.maneuver_c1_id} 
          content_label     = 'Contenido de contenedor.'
          content_inputType = 'text'
          content_name      = 'maneuver_c1_content'
          content_value     = {formValues.maneuver_c1_content} 
          weight_label      = 'Peso del contenedor.'
          weight_inputType  = 'number'
          weight_name       = 'maneuver_c1_weight'
          weight_value      = {formValues.maneuver_c1_weight} 
          type_label        = 'Tipo de contenedor.'
          type_inputType    = 'text'
          type_name         = 'maneuver_c1_type'
          type_value        = {formValues.maneuver_c1_type} 
          funcParam         = 'maneuver_c1_size'
          cleanEntry        = {clearEntry}
          entryChange       = {entry_change}
          selectChange      = {handleSelection}
        />

        <ContainerComponent 
          componentTitle    = 'Contenedor B'
          id_label          = 'ID de contenedor.'
          id_inputType      = 'text'
          id_name           = 'maneuver_c1_id'
          id_value          = {formValues.maneuver_c1_id} 
          content_label     = 'Contenido de contenedor.'
          content_inputType = 'text'
          content_name      = 'maneuver_c1_content'
          content_value     = {formValues.maneuver_c1_content} 
          weight_label      = 'Peso del contenedor.'
          weight_inputType  = 'number'
          weight_name       = 'maneuver_c1_weight'
          weight_value      = {formValues.maneuver_c1_weight} 
          type_label        = 'Tipo de contenedor.'
          type_inputType    = 'text'
          type_name         = 'maneuver_c1_type'
          type_value        = {formValues.maneuver_c1_type} 
          funcParam         = 'maneuver_c1_size'
          cleanEntry        = {clearEntry}
          entryChange       = {entry_change}
          selectChange      = {handleSelection}
        />
        <ContainerComponent 
          componentTitle    = 'Contenedor C'
          id_label          = 'ID de contenedor.'
          id_inputType      = 'text'
          id_name           = 'maneuver_c1_id'
          id_value          = {formValues.maneuver_c1_id} 
          content_label     = 'Contenido de contenedor.'
          content_inputType = 'text'
          content_name      = 'maneuver_c1_content'
          content_value     = {formValues.maneuver_c1_content} 
          weight_label      = 'Peso del contenedor.'
          weight_inputType  = 'number'
          weight_name       = 'maneuver_c1_weight'
          weight_value      = {formValues.maneuver_c1_weight} 
          type_label        = 'Tipo de contenedor.'
          type_inputType    = 'text'
          type_name         = 'maneuver_c1_type'
          type_value        = {formValues.maneuver_c1_type} 
          funcParam         = 'maneuver_c1_size'
          cleanEntry        = {clearEntry}
          entryChange       = {entry_change}
          selectChange      = {handleSelection}
        />
        <ContainerComponent 
          componentTitle    = 'Contenedor D'
          id_label          = 'ID de contenedor.'
          id_inputType      = 'text'
          id_name           = 'maneuver_c1_id'
          id_value          = {formValues.maneuver_c1_id} 
          content_label     = 'Contenido de contenedor.'
          content_inputType = 'text'
          content_name      = 'maneuver_c1_content'
          content_value     = {formValues.maneuver_c1_content} 
          weight_label      = 'Peso del contenedor.'
          weight_inputType  = 'number'
          weight_name       = 'maneuver_c1_weight'
          weight_value      = {formValues.maneuver_c1_weight} 
          type_label        = 'Tipo de contenedor.'
          type_inputType    = 'text'
          type_name         = 'maneuver_c1_type'
          type_value        = {formValues.maneuver_c1_type} 
          funcParam         = 'maneuver_c1_size'
          cleanEntry        = {clearEntry}
          entryChange       = {entry_change}
          selectChange      = {handleSelection}
        />
      </div>

      <button
        className = 'MR_c2a'>
        Guardar maniobra 
        <img src={SaveLogo} alt="save maneuver button" />
      </button>
      
    </form>
  )
}