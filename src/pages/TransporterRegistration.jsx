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

    //⚑ UI conditional control...
    const [form_display, set_form_display]       = useState(false)
    const [disable_control, set_disable_control] = useState(false)
    const [display_subform, set_display_subform] = useState(false) 

    //⚑ Form default values; MUST be initialized to feed text entries...!
    const [tr_form, set_tr_form] = useState(ph_tr)
    const [op_form, set_op_form] = useState(ph_op)
    const [ec_form, set_ec_form] = useState(ph_ec)

   //⚑ Dropdown options list default values; MUST be initialized as array to send data to dropdown controls...!
    const [transporters, setTransporters] = useState([ph_tr]) 
    const [operators, setOperators]       = useState([ph_op])
    const [ecos, setEcos]                 = useState([ph_op])

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

                //⚑ Reset ECOS...
                setEcos([ph_ec])
                set_ec_form(ph_ec)
                
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
                throw new Error("Error al procesar en el servidor...");
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
            const deleteTransporterResponse = await fetch('/api/transporters/transporter', 
            {
                method:  'DELETE',
                headers: {'Content-Type': 'application/json',},
                body:    JSON.stringify(tr_form),
            });

            if (!deleteTransporterResponse.ok) 
            {
                toast.error('No se pudo almacenar la información!',{duration:4000,position:'top-center'});
                throw new Error("Error al procesar en el servidor...");
            }

            toast.success('Transportista eliminado',{duration:4000,position:'top-center'});
            
            //⚑ API based re-render...
            await getTransporters()
            
        } catch (error) { console.log(error) }
    }

    const saveOperator = async () =>
    {   
        const updatedOperatorData = 
        {
            ...op_form,
            operator_tr_id:tr_form.transporter_id
        }
     
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

    const deleteOperator = async () =>
    {
        const updatedOperatorData = 
        {
            ...op_form,
            operator_tr_id:tr_form.transporter_id
        }
     
        set_op_form(updatedOperatorData)

        try 
        {
            const deleteOperatorResponse = await fetch('/api/transporters/operator', 
            {
                method:  'DELETE',
                headers: {'Content-Type': 'application/json',},
                body:    JSON.stringify(updatedOperatorData),
            });

            if (!deleteOperatorResponse.ok) 
            {
                toast.error('No se pudo procesar la información!',{duration:4000,position:'top-center'});
                throw new Error("Error al procesar en el servidor...");
            }

            toast.success('Operador eliminado',{duration:4000,position:'top-center'});
            
            //⚑ API based re-render...
            await getTransporters()
            
        } catch (error) { console.log(error) }
    }

    const saveEco = async () =>
    {   
        const updatedEcoData = 
        {
            ...ec_form,
            eco_tr_id:tr_form.transporter_id
        }
     
        set_ec_form(updatedEcoData)

        try 
        {
            const saveEcoResponse = await fetch('/api/transporters/eco', 
            {
                method:  'POST',
                headers: {'Content-Type': 'application/json',},
                body:    JSON.stringify(updatedEcoData),
            });

            if (!saveEcoResponse.ok) 
            {
                toast.error('No se pudo almacenar la información!',{duration:4000,position:'top-center'});
                throw new Error("Error al procesar en el servidor...");
            }else
            {
                toast.success('Datos de ECO guardados exitosamente!',{duration:4000,position:'top-center'});

                //⚑ Re-render dropdowns...
                await getTransporters()
            }
        } 
        catch (error) { openModal(['No hay conexión con el servidor ⛟', 'Por favor inténtalo más tarde ⛟'],0 ) } 
    }

    const deleteEco = async () =>
    {
        const updatedEcoData = 
        {
            ...ec_form,
            eco_tr_id:tr_form.transporter_id
        }
     
        set_ec_form(updatedEcoData)

        try 
        {
            const deleteEcoResponse = await fetch('/api/transporters/eco', 
            {
                method:  'DELETE',
                headers: {'Content-Type': 'application/json',},
                body:    JSON.stringify(updatedEcoData),
            });

            if (!deleteEcoResponse.ok) 
            {
                toast.error('No se pudo procesar la información!',{duration:4000,position:'top-center'});
                throw new Error("Error al procesar en el servidor...");
            }

            toast.success('ECO eliminado',{duration:4000,position:'top-center'});
            
            //⚑ API based re-render...
            await getTransporters()
            
        } catch (error) { console.log(error) }
    }

//#endregion [ API FUNCTIONS ]

    useEffect
    (() => { getTransporters() },[])

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

        //⚑ Update ECOS list...
        setEcos(prev => [prev[0], ...selectedTransporter.transporter_equipment])

        //⚑ Every time there is a change, set to default values...
        set_ec_form(ph_ec)
         
        set_display_subform(event.target.value == 'NUEVO TRANSPORTISTA'? false:true)
    }

    function tr_clear_entry(fieldToClean) { set_tr_form(prev => ({...prev,[fieldToClean]: ''})) }
    function tr_entry_input(event)        { set_tr_form(prev => ({...prev,[event.target.name]: event.target.value})) }

//#endregion [ TRANSPORTER FUNCTIONS ]

//#region [ OPERATOR FUNCTIONS]

    function operatorSelection(event)
    {
        //⚑ First find the transporter who belongs to and then find it by iterating subarray...
        if (event.target.value != 'NUEVO OPERADOR') 
        {
            let selectedOperator = operators.find(operator => operator.operator_name == event.target.value)

            set_op_form(selectedOperator) 
        } 
        else { set_op_form(ph_op) } //⚑ Avoid crashing by setting to default form values...
    }

    function op_clear_entry(fieldToClean) {set_op_form(prev => ({...prev,[fieldToClean]: ''}))}
    function op_entry_input(event)        {set_op_form(prev => ({...prev,[event.target.name]: event.target.value}))}

//#endregion [ OPERATOR FUNCTIONS ]

//#region [ ECO FUNCTIONS]

    function ecoSelection(event)
    {
        //⚑ First find the transporter who belongs to and then find it by iterating subarray...
        if (event.target.value != 'NUEVO ECO') 
        {
            let selectedEco = ecos.find(eco => eco.eco_name == event.target.value)

            set_ec_form(selectedEco) 
        } 
        else { set_ec_form(ph_ec) } //⚑ Avoid crashing by setting to default form values...
    }

    function ec_clear_entry(fieldToClean) {set_ec_form(prev => ({...prev,[fieldToClean]: ''}))}
    function ec_entry_input(event)        {set_ec_form(prev => ({...prev,[event.target.name]: event.target.value}))}

//#endregion [ ECO FUNCTIONS ]

    return(
        <form className = {form_display ? 'TR_container' : 'hidden'}>

            <span>Registro de transportista.</span> 

            <section className='TR_subform_container'>

                <div className='TR_left_subform_container'>

                    <div className='TR_maindata'>
                        <DropdownInput
                            titleLabel     = 'Selección de TRANSPORTISTA'
                            options_master = {transporters} 
                            accessProperty = {'transporter_name'}
                            onChange       = {transporterSelection}      
                        />
                
                        <EntryInput
                            titleLabel    = 'Nombre.'
                            inputType     = 'text'
                            name          = 'transporter_name'
                            value         = {tr_form.transporter_name}  
                            cleanEntry    = {tr_clear_entry}
                            entryChange   = {tr_entry_input}
                        />
                
                        <EntryInput
                            titleLabel    = 'CAAT'
                            inputType     = 'text'
                            name          = 'transporter_caat'
                            value         = {tr_form.transporter_caat}  
                            cleanEntry    = {tr_clear_entry}
                            entryChange   = {tr_entry_input}
                        />

                        <div className = {disable_control ? 'hidden':'TR_Btns'}>
                            <button
                                type     = 'button'
                                onClick  = {saveTransporter}
                                disabled = {disable_control}
                            >
                                Guardar  
                                <img src={SaveLogo}   alt="Save transporter" />
                            </button>

                            <button
                                type     = 'button'
                                onClick  = {deleteTransporter}
                                disabled = {disable_control}
                            >
                                Eliminar  
                                <img src={DeleteLogo}   alt="Delete transporter" />
                            </button>
                        </div>
                    </div>

                    <div className={display_subform?'TR_ops':'hidden'}>
                        <DropdownInput
                            titleLabel     = 'Selección de OPERADOR'
                            options_master = {operators} 
                            accessProperty = {'operator_name'}
                            onChange       = {operatorSelection}      
                        />

                        <EntryInput
                            titleLabel    = 'Nombre'
                            inputType     = 'text'
                            name          = 'operator_name'
                            value         = {op_form.operator_name}  
                            cleanEntry    = {op_clear_entry}
                            entryChange   = {op_entry_input}
                        />
                
                        <EntryInput
                            titleLabel    = 'RFC'
                            inputType     = 'text'
                            name          = 'operator_rfc'
                            value         = {op_form.operator_rfc}  
                            cleanEntry    = {op_clear_entry}
                            entryChange   = {op_entry_input}
                        />

                        <EntryInput
                            titleLabel    = 'NSS'
                            inputType     = 'text'
                            name          = 'operator_nss'
                            value         = {op_form.operator_nss}  
                            cleanEntry    = {op_clear_entry}
                            entryChange   = {op_entry_input}
                        />

                        <EntryInput
                            titleLabel    = 'Licencia'
                            inputType     = 'text'
                            name          = 'operator_license'
                            value         = {op_form.operator_license}  
                            cleanEntry    = {op_clear_entry}
                            entryChange   = {op_entry_input}
                        />

                        <EntryInput
                            titleLabel    = 'Dirección'
                            inputType     = 'text'
                            name          = 'operator_address'
                            value         = {op_form.operator_address}  
                            cleanEntry    = {op_clear_entry}
                            entryChange   = {op_entry_input}
                        />

                        <div className='TR_Btns'>
                            <button
                                type     = 'button'
                                onClick  = {saveOperator}
                                disabled = {disable_control}
                            >
                                Guardar  
                                <img src = {SaveLogo}   alt="Save operator" />
                            </button>

                            <button
                                type     = 'button'
                                onClick  = {deleteOperator}
                                disabled = {disable_control}
                            >
                                Eliminar  
                                <img src={DeleteLogo}   alt="Delete operator" />
                            </button>
                        </div>
                    </div>
                
                </div>

                <div className={display_subform?'TR_ecos':'hidden'}>
                    <DropdownInput
                        titleLabel     = 'Selección del ECO'
                        options_master = {ecos} 
                        accessProperty = {'eco_name'}
                        onChange       = {ecoSelection}      
                    />

                    <EntryInput
                        titleLabel = 'Nombre'
                        inputType  = 'text'
                        name       = 'eco_name'
                        value      = {ec_form.eco_name}  
                        cleanEntry = {ec_clear_entry}
                        entryChange= {ec_entry_input}
                    />

                    <EntryInput
                        titleLabel = 'Número asignado'
                        inputType  = 'text'
                        name       = 'eco_number'
                        value      = {ec_form.eco_number}  
                        cleanEntry = {ec_clear_entry}
                        entryChange= {ec_entry_input}
                    />

                    <EntryInput
                        titleLabel = 'Placas'
                        inputType  = 'text'
                        name       = 'eco_plates'
                        value      = {ec_form.eco_plates}  
                        cleanEntry = {ec_clear_entry}
                        entryChange= {ec_entry_input}
                    />

                    <EntryInput
                        titleLabel = 'Modelo / Año'
                        inputType  = 'text'
                        name       = 'eco_model'
                        value      = {ec_form.eco_model}  
                        cleanEntry = {ec_clear_entry}
                        entryChange= {ec_entry_input}
                    />

                    <EntryInput
                        titleLabel = 'Color'
                        inputType  = 'text'
                        name       = 'eco_color'
                        value      = {ec_form.eco_color}  
                        cleanEntry = {ec_clear_entry}
                        entryChange= {ec_entry_input}
                    />

                    <EntryInput
                        titleLabel = 'Número de serie'
                        inputType  = 'text'
                        name       = 'eco_serial_number'
                        value      = {ec_form.eco_serial_number}  
                        cleanEntry = {ec_clear_entry}
                        entryChange= {ec_entry_input}
                    />

                    <EntryInput
                        titleLabel = 'Número de motor'
                        inputType  = 'text'
                        name       = 'eco_motor_number'
                        value      = {ec_form.eco_motor_number}  
                        cleanEntry = {ec_clear_entry}
                        entryChange= {ec_entry_input}
                    />

                    <EntryInput
                        titleLabel = 'Compañía de seguros'
                        inputType  = 'text'
                        name       = 'eco_insurance_company'
                        value      = {ec_form.eco_insurance_company}  
                        cleanEntry = {ec_clear_entry}
                        entryChange= {ec_entry_input}
                    />

                    <EntryInput
                        titleLabel = 'Número de poliza'
                        inputType  = 'text'
                        name       = 'eco_insurance_policy'
                        value      = {ec_form.eco_insurance_policy}  
                        cleanEntry = {ec_clear_entry}
                        entryChange= {ec_entry_input}
                    />

                    <div className='TR_Btns'>
                        <button
                            type     = 'button'
                            onClick  = {saveEco}
                            disabled = {disable_control}
                        >
                            Guardar  
                            <img src = {SaveLogo}   alt="Save eco" />
                        </button>
                        <button
                            type     = 'button'
                            onClick  = {deleteEco}
                            disabled = {disable_control}
                        >
                            Eliminar  
                            <img src={DeleteLogo}   alt="Delete eco" />
                        </button>
                    </div>
                </div>
                
            </section>
        </form>
    )
}