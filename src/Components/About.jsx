import me from '../assets/Me.png'
import "./About.css"
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className='me'>
        <h1>About Me</h1>
        <img src={me} alt="" />
        <h2>
        In the first half of my life, I was a performer, drawn to the stage and the art of expression. Yet, beyond the lights, I found another love: food. Eating, sleeping, exploring—it's my joy. And when day turns to night, there's nothing like the comfort of sleep, a time for renewal and rest. So, that's me: performer, food lover, and appreciator of sleep's embrace.
        </h2>

        <Link to={'/quiz'}>
            <button>Back</button>
        </Link>
    </div>
  )
}


export default About;