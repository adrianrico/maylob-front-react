import '../pages/TransporterRegistration.css'
import EntryInput              from '../custom_components/entry_input.jsx'
import DropdownInput           from '../custom_components/dropdown_input.jsx'
import SaveLogo                from '../assets/save_white.svg'
import DeleteLogo              from '../assets/delete_white.svg'

export default function TransporterRegistration(props)
{
      const placeholderObject = [
  {
    client_id:        '0',
    client_name:      'NUEVO CONTACTO',
    client_search:    '',
    client_phone:     '',
    client_email:     ''
  }
      ]
      function handleChange(event)
    {
      //Set the object as new active object...
/*       const newSelectedObject = clients.find(user => user.client_name === event.target.value) 
      newSelectedObject.client_search = newSelectedObject.client_name

      setFormValues(newSelectedObject) */

      console.log('test')
    }

        function clearEntry(fieldToClean)
    { 
      //Updates the active object...
/*       setFormValues(prev => (
      {
        ...prev,
        [fieldToClean]: ''
      })) */
    }

    function entry_change(event)
    {
      //Updates the active object...
 /*      setFormValues(prev => (
      {
        ...prev,
        [event.target.name]: event.target.value
      }))  */
    }


    return(
        <form className="TR_container">

            <span>Registration.</span> 

            <section className='TR_subform_container'>

                <div className='TR_left_subform_container'>

                    <div className='TR_maindata'>
                        <DropdownInput
                            titleLabel     = 'Selección de TR'
                            options_master = {placeholderObject} 
                            accessProperty = {'client_name'}
                            onChange       = {handleChange}      
                        />
                
                        <EntryInput
                        titleLabel = 'Nombre del TR'
                        inputType  = 'text'
                        name       = 'client_name'
                        value      = {'test'}  
                        cleanEntry = {clearEntry}
                        entryChange   = {entry_change}
                        />
                
                        <EntryInput
                        titleLabel = 'CAAT del TR'
                        inputType  = 'text'
                        name       = 'client_name'
                        value      = {'test'}  
                        cleanEntry = {clearEntry}
                        entryChange   = {entry_change}
                        />

                         <div className='TR_Btns'>
                            <button>Guardar  <img src={SaveLogo}   alt="" /></button>
                            <button>Eliminar <img src={DeleteLogo} alt="" /></button>
                        </div>
                    </div>

                    <div className='TR_ops'>
                        <DropdownInput
                            titleLabel     = 'Selección de OP'
                            options_master = {placeholderObject} 
                            accessProperty = {'client_name'}
                            onChange       = {handleChange}      
                        />

                        <EntryInput
                            titleLabel = 'Nombre del OP'
                            inputType  = 'text'
                            name       = 'client_name'
                            value      = {'test'}  
                            cleanEntry = {clearEntry}
                            entryChange   = {entry_change}
                        />

                        <EntryInput
                            titleLabel = 'RFC del OP'
                            inputType  = 'text'
                            name       = 'client_name'
                            value      = {'test'}  
                            cleanEntry = {clearEntry}
                            entryChange   = {entry_change}
                        />

                        <EntryInput
                            titleLabel = 'NSS del OP'
                            inputType  = 'text'
                            name       = 'client_name'
                            value      = {'test'}  
                            cleanEntry = {clearEntry}
                            entryChange   = {entry_change}
                        />

                        <EntryInput
                            titleLabel = 'Licencia del OP'
                            inputType  = 'text'
                            name       = 'client_name'
                            value      = {'test'}  
                            cleanEntry = {clearEntry}
                            entryChange   = {entry_change}
                        />

                        <EntryInput
                            titleLabel = 'Direcciónn del OP'
                            inputType  = 'text'
                            name       = 'client_name'
                            value      = {'test'}  
                            cleanEntry = {clearEntry}
                            entryChange   = {entry_change}
                        />

                        <div className='TR_Btns'>
                            <button>Guardar  <img src={SaveLogo}   alt="" /></button>
                            <button>Eliminar <img src={DeleteLogo} alt="" /></button>
                        </div>
                    </div>
                
                </div>

                <div className='TR_ecos'>
                    <DropdownInput
                        titleLabel     = 'Selección del ECO'
                        options_master = {placeholderObject} 
                        accessProperty = {'client_name'}
                        onChange       = {handleChange}      
                    />

                    <EntryInput
                        titleLabel = 'Nombre asignado'
                        inputType  = 'text'
                        name       = 'client_name'
                        value      = {'test'}  
                        cleanEntry = {clearEntry}
                        entryChange   = {entry_change}
                    />

                    <EntryInput
                        titleLabel = 'Número asignado'
                        inputType  = 'text'
                        name       = 'client_name'
                        value      = {'test'}  
                        cleanEntry = {clearEntry}
                        entryChange   = {entry_change}
                    />

                    <EntryInput
                        titleLabel = 'Placas'
                        inputType  = 'text'
                        name       = 'client_name'
                        value      = {'test'}  
                        cleanEntry = {clearEntry}
                        entryChange   = {entry_change}
                    />

                    <EntryInput
                        titleLabel = 'Modelo / Año'
                        inputType  = 'text'
                        name       = 'client_name'
                        value      = {'test'}  
                        cleanEntry = {clearEntry}
                        entryChange   = {entry_change}
                    />

                    <EntryInput
                        titleLabel = 'Color'
                        inputType  = 'text'
                        name       = 'client_name'
                        value      = {'test'}  
                        cleanEntry = {clearEntry}
                        entryChange   = {entry_change}
                    />

                    <EntryInput
                        titleLabel = 'Número de serie'
                        inputType  = 'text'
                        name       = 'client_name'
                        value      = {'test'}  
                        cleanEntry = {clearEntry}
                        entryChange   = {entry_change}
                    />

                    <EntryInput
                        titleLabel = 'Número de motor'
                        inputType  = 'text'
                        name       = 'client_name'
                        value      = {'test'}  
                        cleanEntry = {clearEntry}
                        entryChange   = {entry_change}
                    />

                    <EntryInput
                        titleLabel = 'Compañía de seguros'
                        inputType  = 'text'
                        name       = 'client_name'
                        value      = {'test'}  
                        cleanEntry = {clearEntry}
                        entryChange   = {entry_change}
                    />

                    <EntryInput
                        titleLabel = 'Número de poliza'
                        inputType  = 'text'
                        name       = 'client_name'
                        value      = {'test'}  
                        cleanEntry = {clearEntry}
                        entryChange   = {entry_change}
                    />

                    <div className='TR_Btns'>
                        <button>Save<img src={SaveLogo} alt="" /></button>
                        <button>Delete<img src={DeleteLogo} alt="" /></button>
                    </div>
                </div>
                
            </section>
        </form>
    )
}