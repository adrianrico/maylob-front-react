import '../pages/TransporterRegistration.css'
import EntryInput              from '../custom_components/entry_input.jsx'
import DropdownInput           from '../custom_components/dropdown_input.jsx'
import SaveLogo                from '../assets/save_white.svg'
import DeleteLogo              from '../assets/delete_white.svg'
import toast                   from 'react-hot-toast'
import { useState, useEffect } from 'react'
import { useModal }            from '../context/ModalContext'


export default function TransporterRegistration(props)
{
    const { openModal } = useModal()
    
    //⚑ Placeholder forms objects...
    const ph_tr = 
    {
        transporter_id:         '0',
        transporter_name:       'NUEVO TRANSPORTISTA',
        transporter_caat:       '',
        transporter_search:     '',
        transporter_operators:  [ ]
    }

    const ph_op = 
    {
        operator_id:      '',
        operator_name:    'NUEVO OPERADOR',
        operator_rfc:     '',
        operator_nss:     '',
        operator_license: '',
        operator_address:  '',
        operator_tr_id:   '',
    }

    //⚑ UI conditional control...
    const [form_display, set_form_display]       = useState(false)
    const [disable_control, set_disable_control] = useState(false)
    const [display_subform, set_display_subform] = useState(false) 

    //⚑ Form default values; MUST be initialized to feed text entries...!
    const [tr_form, set_tr_form] = useState(ph_tr)
    const [op_form, set_op_form] = useState(ph_op)

   //⚑ Dropdown options list default values; MUST be initialized as array to send data to dropdown controls...!
    const [transporters, setTransporters] = useState([ph_tr]) 
    const [operators, setOperators]       = useState([ph_op])

    const [current_op_id, set_current_op_id] = useState('')


//#region [ API FUNCTIONS ]

    const getTransporters = async () =>
    {
        //⚑ To force a state change and re-render...
        setTransporters([ph_tr])

        try 
        {
            const getTransportersResponse = await fetch ('/api/transporters/transporter',
            {
                method:  'GET',
            });

            if (!getTransportersResponse.ok) 
            {
                throw new Error('[68] - Problema de conexión con el servidor...');
            }
            else
            {
                const responseData = await getTransportersResponse.json()
                
                //⚑ Set/Reset TRS...
                switch (responseData.code) 
                {
                    case '0':
                        //⚑ No TRANSPORTERS stored...
                        setTransporters([ph_tr])
                    break;

                    case '1':
                        //⚑ At least 1 TRANSPORTER stored...
                        setTransporters([ph_tr, ...responseData.transporters_data])
                    break;
                }

                set_tr_form(ph_tr)

                //⚑ Reset OPS...
                setOperators([ph_op])
                set_op_form(ph_op)
                
                //⚑ Reset UI...
                set_form_display(true)
                set_display_subform(false)
            }
        } 
        catch (error) { openModal(['No hay conexión con el servidor ⛟', 'Por favor inténtalo más tarde ⛟'],0 ) }
    }

    const saveTransporter = async () => 
    {
        try 
        {
            const save = await fetch('/api/transporters/transporter', 
            {
                method:  'POST',
                headers: {'Content-Type': 'application/json',},
                body:    JSON.stringify(tr_form),
            });

            if (!save.ok) 
            {
                toast.error('No se pudo almacenar la información!',{duration:4000,position:'top-center'});
                throw new Error("[116] - Error al procesar en el servidor...");
            }

            toast.success('Transportista guardado exitosamente!',{duration:4000,position:'top-center'});
            
            //⚑ API based re-render...
            await getTransporters()
            
        } catch (error) { console.log(error) }
    }

    const deleteTransporter = async () =>
    {
        try 
        {
            const save = await fetch('/api/transporters/transporter', 
            {
                method:  'DELETE',
                headers: {'Content-Type': 'application/json',},
                body:    JSON.stringify(tr_form),
            });

            if (!save.ok) 
            {
                toast.error('[140] - No se pudo almacenar la información!',{duration:4000,position:'top-center'});
                throw new Error("Error al procesar en el servidor...");
            }

            toast.success('Transportista eliminado',{duration:4000,position:'top-center'});
            
            //⚑ API based re-render...
            await getTransporters()
            
        } catch (error) { console.log(error) }
    }

//#endregion [ API FUNCTIONS ]

    useEffect
    (() => { getTransporters() },[])

    //Logging for testing --> ❌ To remove...! 
    console.log(transporters)
    console.log(operators)
    console.log(tr_form)
    console.log(op_form)
    //console.log(current_op_id)

//#region [ TRANSPORTER FUNCTIONS ]  

    function transporterSelection(event)
    {
        //⚑ Find selection from the list and set it as active form...
        const selectedTransporter = transporters.find(transporter => transporter.transporter_name === event.target.value) 
        
        //⚑ Fill form with found values...
        set_tr_form(selectedTransporter)

        //⚑ Update OPS list...
        setOperators(prev => [prev[0], ...selectedTransporter.transporter_operators])

        //⚑ Every time there is a change, set to default values...
        set_op_form(ph_op)
         
        set_display_subform(event.target.value == 'NUEVO TRANSPORTISTA'? false:true)
    }

    function tr_clear_entry(fieldToClean) { set_tr_form(prev => ({...prev,[fieldToClean]: ''})) }
    function tr_entry_input(event)        { set_tr_form(prev => ({...prev,[event.target.name]: event.target.value})) }

//#endregion [ TRANSPORTER FUNCTIONS ]

    function operatorSelection(event)
    {
        //⚑ First find the transporter who belongs to and then find it by iterating subarray...
        if (event.target.value != 'NUEVO OPERADOR') 
        {
            let selectedOperator = operators.find(operator => operator.operator_name == event.target.value)

            set_op_form(selectedOperator) 
            set_current_op_id(selectedOperator.operator_id)
            //set_op_form({...selectedOperator, operator_tr_id:tr_form.transporter_id})
        } 
        else 
        { 
            set_op_form(ph_op) 
            set_current_op_id('')
        } //⚑ Avoid crashing by setting to defaul form values...
    }

    function op_clear_entry(fieldToClean) {set_op_form(prev => ({...prev,[fieldToClean]: ''}))}
    function op_entry_input(event)        
    {
        set_op_form(prev => ({...prev,[event.target.name]: event.target.value}))
        //set_op_form({...op_form, operator_tr_id:tr_form.transporter_id})
    }


    const saveOperator = async () =>
    {   
        const updatedOperatorData = 
        {
            ...op_form,
            operator_tr_id:tr_form.transporter_id
        }
        console.log(updatedOperatorData)       
        set_op_form(updatedOperatorData)
 
        try 
        {
            const saveOperatorResponse = await fetch('/api/transporters/operator', 
            {
                method:  'POST',
                headers: {'Content-Type': 'application/json',},
                body:    JSON.stringify(updatedOperatorData),
            });

            if (!saveOperatorResponse.ok) 
            {
                toast.error('No se pudo almacenar la información!',{duration:4000,position:'top-center'});
                throw new Error("Error al procesar en el servidor...");
            }else
            {
                toast.success('Datos de operador guardados exitosamente!',{duration:4000,position:'top-center'});

                //⚑ Re-render dropdowns...
                await getTransporters()
            }
        } 
        catch (error) { openModal(['No hay conexión con el servidor ⛟', 'Por favor inténtalo más tarde ⛟'],0 ) } 
    }






    return(
        <form className = {form_display ? 'TR_container' : 'hidden'}>

            <span>Registro de transportista.</span> 

            <section className='TR_subform_container'>

                <div className='TR_left_subform_container'>

                    <div className='TR_maindata'>
                        <DropdownInput
                            titleLabel     = 'Selección de TR'
                            options_master = {transporters} 
                            accessProperty = {'transporter_name'}
                            onChange       = {transporterSelection}      
                        />
                
                        <EntryInput
                        titleLabel    = 'Nombre del TR'
                        inputType     = 'text'
                        name          = 'transporter_name'
                        value         = {tr_form.transporter_name}  
                        cleanEntry    = {tr_clear_entry}
                        entryChange   = {tr_entry_input}
                                />
                
                        <EntryInput
                        titleLabel    = 'CAAT del TR'
                        inputType     = 'text'
                        name          = 'transporter_caat'
                        value         = {tr_form.transporter_caat}  
                        cleanEntry    = {tr_clear_entry}
                        entryChange   = {tr_entry_input}
                                />

                         <div className = {disable_control ? 'hidden':'TR_Btns'}>
                            <button
                                type='button'
                                onClick={saveTransporter}
                                disabled = {disable_control}
                            >
                                Guardar  
                                <img src={SaveLogo}   alt="" />
                            </button>

                            <button
                                type='button'
                                onClick={deleteTransporter}
                                disabled = {disable_control}
                            >
                                Eliminar  
                                <img src={DeleteLogo}   alt="" />
                            </button>
                        </div>
                    </div>

                    <div className={display_subform?'TR_ops':'hidden'}>
                        <DropdownInput
                            titleLabel     = 'Selección de OP'
                            options_master = {operators} 
                            accessProperty = {'operator_name'}
                            onChange       = {operatorSelection}      
                        />

                        <EntryInput
                            titleLabel    = 'Nombre del OP'
                            inputType     = 'text'
                            name          = 'operator_name'
                            value         = {op_form.operator_name}  
                            cleanEntry    = {op_clear_entry}
                            entryChange   = {op_entry_input}
                        />
                
                        <EntryInput
                            titleLabel    = 'RFC del OP'
                            inputType     = 'text'
                            name          = 'operator_rfc'
                            value         = {op_form.operator_rfc}  
                            cleanEntry    = {op_clear_entry}
                            entryChange   = {op_entry_input}
                        />

                        <EntryInput
                            titleLabel    = 'NSS del OP'
                            inputType     = 'text'
                            name          = 'operator_nss'
                            value         = {op_form.operator_nss}  
                            cleanEntry    = {op_clear_entry}
                            entryChange   = {op_entry_input}
                        />

                        <EntryInput
                            titleLabel    = 'Licencia del OP'
                            inputType     = 'text'
                            name          = 'operator_license'
                            value         = {op_form.operator_license}  
                            cleanEntry    = {op_clear_entry}
                            entryChange   = {op_entry_input}
                        />

                        <EntryInput
                            titleLabel = 'Direcciónn del OP'
                            inputType  = 'text'
                            name          = 'operator_address'
                            value         = {op_form.operator_address}  
                            cleanEntry    = {op_clear_entry}
                            entryChange   = {op_entry_input}
                        />

                        <div className='TR_Btns'>
                            <button
                                type='button'
                                onClick={saveOperator}
                                disabled = {disable_control}
                            >
                                Guardar  
                                <img src={SaveLogo}   alt="" />
                            </button>
                            <button>Eliminar <img src={DeleteLogo} alt="" /></button>
                        </div>
                    </div>
                
                </div>

                <div className={display_subform?'hidden':'hidden'}>
                    <DropdownInput
                        titleLabel     = 'Selección del ECO'
                        options_master = {transporters} 
                        accessProperty = {'client_name'}
                        onChange       = {transporterSelection}      
                    />

                    <EntryInput
                        titleLabel = 'Nombre asignado'
                        inputType  = 'text'
                        name       = 'client_name'
                        value      = {'test'}  
                        cleanEntry = {tr_clear_entry}
                        entryChange   = {tr_entry_input}
                            />

                    <EntryInput
                        titleLabel = 'Número asignado'
                        inputType  = 'text'
                        name       = 'client_name'
                        value      = {'test'}  
                        cleanEntry = {tr_clear_entry}
                        entryChange   = {tr_entry_input}
                            />

                    <EntryInput
                        titleLabel = 'Placas'
                        inputType  = 'text'
                        name       = 'client_name'
                        value      = {'test'}  
                        cleanEntry = {tr_clear_entry}
                        entryChange   = {tr_entry_input}
                            />

                    <EntryInput
                        titleLabel = 'Modelo / Año'
                        inputType  = 'text'
                        name       = 'client_name'
                        value      = {'test'}  
                        cleanEntry = {tr_clear_entry}
                        entryChange   = {tr_entry_input}
                            />

                    <EntryInput
                        titleLabel = 'Color'
                        inputType  = 'text'
                        name       = 'client_name'
                        value      = {'test'}  
                        cleanEntry = {tr_clear_entry}
                        entryChange   = {tr_entry_input}
                            />

                    <EntryInput
                        titleLabel = 'Número de serie'
                        inputType  = 'text'
                        name       = 'client_name'
                        value      = {'test'}  
                        cleanEntry = {tr_clear_entry}
                        entryChange   = {tr_entry_input}
                            />

                    <EntryInput
                        titleLabel = 'Número de motor'
                        inputType  = 'text'
                        name       = 'client_name'
                        value      = {'test'}  
                        cleanEntry = {tr_clear_entry}
                        entryChange   = {tr_entry_input}
                            />

                    <EntryInput
                        titleLabel = 'Compañía de seguros'
                        inputType  = 'text'
                        name       = 'client_name'
                        value      = {'test'}  
                        cleanEntry = {tr_clear_entry}
                        entryChange   = {tr_entry_input}
                            />

                    <EntryInput
                        titleLabel = 'Número de poliza'
                        inputType  = 'text'
                        name       = 'client_name'
                        value      = {'test'}  
                        cleanEntry = {tr_clear_entry}
                        entryChange   = {tr_entry_input}
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