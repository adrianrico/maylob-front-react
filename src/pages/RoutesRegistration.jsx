import './RoutesRegistration.css'
import EntryInput              from '../custom_components/entry_input.jsx'
import DropdownInput           from '../custom_components/dropdown_input.jsx'
import ActionButton            from '../custom_components/custom_button.jsx'
import CheckInput              from '../custom_components/check_input.jsx'
import Maneuver                from '../custom_components/maneuver.jsx'
import { isValid }             from '../common_functions.js'
import { useEffect, useState } from 'react'

export default function ManeuversPage ()
{

   
    return(
        <section className=''>
            <article className='card'>
                <h2>Registrar ruta</h2>

                <DropdownInput
                    titleLabel     = 'Selección de RUTA'
                    options_master = {['Nueva','RUTA A']} 
                /*     accessProperty = {'operator_name'}
                    onChange       = {operatorSelection}      
                 *//>
                 
                <EntryInput
                    titleLabel    = 'Nombre.'
                    inputType     = 'text'
                    name          = 'transporter_name'
/*                  value         = {tr_form.transporter_name}  
                    cleanEntry    = {tr_clear_entry}
                    entryChange   = {tr_entry_input} */
                />
                 
                <label>
                    <input type="radio" name="route_type" id="" /> 
                    <h4>Local</h4>
                </label>

                <label>
                    <input type="radio" name="route_type" id="" />
                    <h4>Foránea</h4>
                </label>

                <div className='rp_route points'>
                                    <ActionButton
                                        type   = ''
                                        text   = ''
                                        color  = 'blue'
                                        action = 'navigation'
                                    />
                </div>

            </article>

        </section>
    )
}