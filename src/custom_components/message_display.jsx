import './message_display.css'
import SuccessLogo from '../assets/ok_white.svg'
import ErrorLogo   from '../assets/error_white.svg'
import WarningLogo from '../assets/warning_white.svg'

export default function MessageDisplay({ isOpen, messages, displayCode, onClose})
{
    //When not open nothing will be rendered...
    if(!isOpen) return null

    let custom_class = ''
    let custom_img   = ''
    switch (displayCode) 
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

    return (
        <section className='MD_container'>
        
            <div className={custom_class}>
                <div className='MD_display_img'><img src={custom_img} alt=""/></div>
              
                <div className='MD_data'>
                    {
                        messages.map((msg, i) => (<span key={i}>{msg}</span>))
                    }
                    <button onClick={onClose}>Entendido </button>
               </div>
            </div>

        </section>
    )
}