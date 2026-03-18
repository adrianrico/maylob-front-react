import './ManeuversPage.css'
import EntryInput              from '../custom_components/entry_input.jsx'
import CheckInput              from '../custom_components/check_input.jsx'
import DropdownInput           from '../custom_components/dropdown_input.jsx'
import Maneuver from '../custom_components/maneuver.jsx'
import ManeuverActions from '../custom_components/maneuver_actions.jsx'
import ActionButton from '../custom_components/custom_button.jsx'
import ContainerComponent      from '../ContainerComponent.jsx'
export default function ManeuversPage ()
{

    let date = ''

    const getManeuvers = async () =>
    {
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

                 console.log(responseData.objectsFound)
                 date = responseData.objectsFound[0].man_dispatch_date

                
                //⚑ Set/Reset TRS...
                switch (responseData.code) 
                {
                    case '0':
                        console.log('No maneuvers')
                    break;

                    case '1':

                       
                        //⚑ At least 1 TRANSPORTER stored...
                        //setTransporters([ph_tr, ...responseData.transporters_data])
                    break;
                }
/* 
                set_tr_form(ph_tr)

                //⚑ Reset OPS...
                setOperators([ph_op])
                set_op_form(ph_op)

                //⚑ Reset ECOS...
                setEcos([ph_ec])
                set_ec_form(ph_ec)
                
                //⚑ Reset UI...
                set_form_display(true)
                set_display_subform(false) */
            }
        } 
        catch (error) { openModal(['No hay conexión con el servidor ⛟', 'Por favor inténtalo más tarde ⛟'],0 ) }
    }

    getManeuvers()



    function clientSelection(event)
    {
        console.log(event.target.value)
        console.log('Client changed')
    }

    function modeSelection(event)
    {
        console.log(event.target.value)
        console.log('Mode changed')
    }

    function dispatchChange(event)
    {
        console.log('Entry changed')
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
                    value       = {'test'}  
                    /* cleanEntry  = {clearEntry}
                    entryChange = {entryChange}  */
                />

                <EntryInput
                    titleLabel  = 'Hasta'
                    inputType   = 'datetime-local'
                    name        = ''
                    value       = {'test'}  
                    /*  cleanEntry  = {clearEntry}
                    entryChange = {entryChange}  */
                />
            </article>

            <article className='MP_main_content'>

                <aside className='MP_maneuvers'>
                    
                    <Maneuver
                        cont_1_ID = {'Test ID'}
                        m_advance = {'40%'}
                        onClientChange = {clientSelection}
                        onModeChange   = {modeSelection}
                        man_dispatch_date = {'2026-03-18T14:52'}
                        cleanEntry = {clear_entry}
                        entryChange = {dispatchChange}
                    />



                </aside>

                <aside className='MP_visuals'>
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