import '../pages/Home.css'
import TruckLogo from '../assets/main_logo.jpg'

export default function Home() 
{
  return(
    <section className='HP_container'>
      <img src={TruckLogo} className='HP_logo'/>

      <span>¡Bienvenido!</span>
    </section>
  )
}

