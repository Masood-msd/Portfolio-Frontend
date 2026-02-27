import '../styles/about.css'
import { useAuth } from '../store/auth'
//import { useEffect, useState } from 'react'

export default function About() {

    // const [details, setDetails] = useState({ username: ""})
     const {user} = useAuth()

     //  useEffect(()=>{
     //      if(user){
     //           // eslint-disable-next-line react-hooks/set-state-in-effect
     //           setDetails({username: user.username})
     //      }
     // },[user])
     return (
          <>
            <main className="about-page">
               <section className="grid-two-cols">
                    <div>
                         <h2>Welcome, {user ? `${user.username} to my website `: `to our website`}</h2> 
                         <h3>Let's Connect</h3>
                         <p>I'm a fresher full-stack developer, actively looking for opportunities to learn, grow, and contribute to real-world projects. Feel free to reach out for collaboration, feedback, or job opportunities.</p>
                         <a href="/Contact" className='about-btn'>Contact Me</a>
                    </div>
                    <div className="about-img">
                         <img src="/about.png" alt="About us image" />
                    </div>
               </section>
            </main>
          </>
     )
}