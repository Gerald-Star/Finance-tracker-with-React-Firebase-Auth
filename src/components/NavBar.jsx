import { Link } from "react-router-dom"
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from "../hooks/useAuthContext"

// styles
import styles from './Navbar.module.css'

export default function Navbar() {
  const {logout } = useLogout()
  {/*place a fragment here*/}
  const { user } = useAuthContext()


  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>MoneyMarket</li>

        {/*place a fragment here so that when a user is not login, this will show
        */  }
        {!user && (
          
          <>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          </>
        )}
           {/*place a fragment here
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        */}
            
        {/*place a fragment here so that when a user is login, this will show*/}


        {user && (
          <>
          <li>hello, {user.displayName}</li>
          <li>
            <button className="btn"onClick={logout}  >Logout</button>
          </li>
          </>
        )}    
        
      </ul>
    </nav>
  )
}