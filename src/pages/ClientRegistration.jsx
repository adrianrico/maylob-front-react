import '../pages/ClientRegistration.css'
import EntryInput              from '../custom_components/entry_input.jsx'
import DropdownInput           from '../custom_components/dropdown_input.jsx'
import SaveLogo                from '../assets/save_white.svg'
import DeleteLogo              from '../assets/delete_white.svg'
import { useState, useEffect } from 'react'
import toast, {Toaster}        from 'react-hot-toast'

export default function registration_form()
{
//#region    [ DATA LOAD ]

  const placeholderObject = 
  {
    client_id:        '0',
    client_name:      'NUEVO CONTACTO',
    client_search:    '',
    client_phone:     '',
    client_email:     ''
  }

  //Default initial value...
  const [clients, setclients] = useState([placeholderObject])

  //Form initially hidden until response from server...
  const [formDisplay, setFormDisplay] = useState(false)

  useEffect(() =>
  {
    //fetch('https://maylob-backend.onrender.com/client/readClients')
    fetch('/api/clients/all')
    .then(res =>
    {  
      switch (true) 
      {
        case (!res.ok && res.status == 500):
          setFormDisplay(false)
          toast.error('No hay conexión con el servidor',{duration:2000,position:'bot-center'});
          throw new Error('No hay conexión con el servidor. 39')
        break;

        case (res.ok && res.status == 200):
          setFormDisplay(true)
          return res.json()
        break;
      
        default:
          throw new Error('Error de conexión: '+res.status)
        break;
      }
    })
    .then(data => 
    {
      switch (data.code) 
      {
        case '0':      
          //console.log(data.message)  
          setFormDisplay(true)
        break;

        case '1':      
          //console.log(data.message)  
          setFormDisplay(true)
          setclients(prev => [prev[0], ...data.clients_data])
        break;

        default:
          setFormDisplay(false)
        break;
      }
    })
    .catch(err => { 
      console.log(err) 
                toast.error('No hay conexión con el servidor',{duration:2000,position:'bot-center'});
    })
  },[])

//#endregion [ DATA LOAD ]



//#region    [ LOGIC AND STATES ]

    //Set to user default values initially...
    const [formValues, setFormValues] = useState(clients[0])

    function handleChange(event)
    {
      //Set the object as new active object...
      const newSelectedObject = clients.find(user => user.client_name === event.target.value) 
      newSelectedObject.client_search = newSelectedObject.client_name

      setFormValues(newSelectedObject)
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

    async function trigger_save(event)
    {
      try 
      {
        const save = await fetch('/api/clients/client', 
        {
          method:  'POST',
          headers: {'Content-Type': 'application/json',},
          body:    JSON.stringify(formValues),
        });

        switch (save.status) 
        {
          case 200:
            //console.log('Contact saved correctly...')  
            toast.success('Contacto guardado exitosamente!',{duration:2000,position:'bot-center'});

            await fetch('/api/clients/all')
            .then(res =>
            {  
              switch (true) 
              {
                case (!res.ok && res.status == 500):
                  setFormDisplay(false)
                  toast.error('No hay conexión con el servidor',{duration:2000,position:'bot-center'});
                  throw new Error('No hay conexión con el servidor.')
                break;
              
                case (res.ok && res.status == 200):
                  setFormDisplay(true)
                  return res.json()
                break;
              
                default:
                  throw new Error('Error de conexión: '+res.status)
                break;
              }
            })
            .then(data => 
            {
              switch (data.code) 
              {
                case '0':      
                  console.log(data.message)  
                  setFormDisplay(true)
                break;
              
                case '1':      
                  console.log(data.message)  
                  setFormDisplay(true)
                  setclients(prev => [prev[0], ...data.clients_data])
                  setFormValues(clients[0])
                break;
              
                default:
                  setFormDisplay(false)
                break;
              }
            })
            .catch(err => { console.log(err) })
          break;
        
          case 500:
            toast.error('Hubo un problema al guardar el contacto!',{duration:2000});
            throw new Error('Contact not saved...')
          break;
        }

      } catch (error) { console.log(error) }
    }

    async function trigger_delete(event)
    {
      try 
      {
        const deleted = await fetch('/api/clients/deletion', 
        {
          method:  'DELETE',
          headers: {'Content-Type': 'application/json',},
          body:    JSON.stringify(formValues),
        });

        switch (deleted.status) 
        {
          case 200:
            //console.log('Contact DELETED correctly...')  
            toast.success('Contacto eliminado exitosamente!',{duration:2000,position:'bot-center'});

            await fetch('/api/clients/all')
            .then(res =>
            {  
              switch (true) 
              {
                case (!res.ok && res.status == 500):
                  setFormDisplay(false)
                  throw new Error('No hay conexión con el servidor.')
                break;
              
                case (res.ok && res.status == 200):
                  setFormDisplay(true)
                  return res.json()
                break;
              
                default:
                  throw new Error('Error de conexión: '+res.status)
                break;
              }
            })
            .then(data => 
            {
              switch (data.code) 
              {
                case '0':      
                  console.log(data.clients_data)  
                  setclients([clients[0]])
                  setFormValues(clients[0])
                  setFormDisplay(true)
                  
                break;
              
                case '1':      
                  console.log(data.message)  
                  setFormDisplay(true)
                  setclients(prev => [prev[0], ...data.clients_data])
                  setFormValues(clients[0])
                break;
              
                default:
                  setFormDisplay(false)
                break;
              }
            })
            .catch(err => { console.log(err) })

          break;
        
          case 500:
            toast.error('No se pudo eliminar el contacto',{duration:2000,position:'bot-center'});
            throw new Error('Contact not deleted...')
          break;
        }

      } catch (error) { console.log(error) }
    } 

//#endregion [ LOGIC AND STATES ]

return (
    <form className={formDisplay ? 'CR_form' : 'hidden'}>

    <span>Registration.</span> 

{/*     <Toaster 
      containerStyle =
      {{
          position: 'relative',
          bottom:   '50%',
          left:     '0'
      }} 
  
      toastOptions =
      {{ style:{width:'100%'} }}
    /> */}

      <DropdownInput
        titleLabel     = 'Contact Selection'
        options_master = {clients} 
        accessProperty = {'client_name'}
        onChange       = {handleChange}      
      />
      
      <EntryInput
                titleLabel    = 'Contact Name'
                inputType     = 'text'
                name          = 'client_name'
                value         = {formValues.client_name}  
                cleanEntry    = {clearEntry}
                entryChange   = {entry_change}
      />

      <EntryInput
                titleLabel    = 'Contact Phone'
                inputType     = 'phone'
                name          = 'client_phone'
                value         = {formValues.client_phone} 
                cleanEntry    = {clearEntry}
                entryChange   = {entry_change}
      />

      <EntryInput
                titleLabel = 'Contact Mail'
                inputType  = 'email'
                name       = 'client_email'
                value      = {formValues.client_email}
                cleanEntry = {clearEntry}
                entryChange   = {entry_change}
      />

      <div>
        <button
          className = 'save_btn'
          type      = 'button'
          onClick   = {trigger_save}>
          Save user 
          <img src={SaveLogo} alt="save user button" />
        </button>

        <button
          className = 'delete_btn'
          type      = 'button'
          onClick   = {trigger_delete}>
          Delete user 
          <img src={DeleteLogo} alt="save user button" />
        </button>
      </div>

    </form>
  )
}