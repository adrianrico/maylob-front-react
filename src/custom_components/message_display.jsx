import './message_display.css'
import SuccessLogo from '../assets/ok_white.svg'
import ErrorLogo   from '../assets/error_white.svg'
import WarningLogo from '../assets/warning_white.svg'


export default function registration_form(props)
{
//#region    [ LOGIC AND STATES ]

let messages = []

messages = props.messages.map((ind_message) =>
{
    return(<span key={ind_message+Math.floor(Math.random() * 255)}>{ind_message}</span>)
})

let custom_class = ''
let custom_img   = ''
switch (props.displayCode) 
{
    case 0:
        custom_class = 'MD_display MD_error'
        custom_img   = ErrorLogo
    break;

    case 1:
        custom_class = 'MD_display MD_success'
        custom_img   = SuccessLogo
    break;

    case 2:
        custom_class = 'MD_display MD_warning'
        custom_img   = WarningLogo
    break;
}
//#endregion [ LOGIC AND STATES ]

    return (
        <section className='MD_container'>
        
            <div className={custom_class}>
                <div className='MD_display_img'><img src={custom_img} alt=""/></div>
              
                <div className='MD_data'>
                    {messages}
                    <button>close</button>
               </div>
            </div>

        </section>
    )
}