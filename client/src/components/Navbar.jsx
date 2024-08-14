import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";

export const Navbar = () => {
  const { isLoggedIn , toggleTheme, darkMode } = useAuth();
 
  return (
    <>
      <header className={darkMode ? 'dark-mode' : 'light-mode'}> 
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/">RoyalX</NavLink>
          </div>

          <nav>
            <ul>
              <li>
                <NavLink to="/"> Home </NavLink>
              </li>
              <li>
                <NavLink to="/about"> About </NavLink>
              </li>
              <li>
                <NavLink to="/service"> Services </NavLink>
              </li>
              <li>
                <NavLink to="/contact"> Contact </NavLink>
              </li>
              {isLoggedIn ? (
                <><li>
                  <NavLink to="/logout">Logout</NavLink>
                </li><li>
                    <NavLink to="/payment">Payment</NavLink>
                  </li>
                  <li>
                    <NavLink to="/Chat">Chat</NavLink>
                  </li></>
              ) : (
                <>
                  <li>
                    <NavLink to="/register"> Register </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login"> Login </NavLink>
                  </li>
                </>
              )}
            </ul>
            
          </nav>
          <button className="togglebutton"onClick={toggleTheme}> {darkMode ? 'OFF' : 'ON'} Light Mode </button>
        </div>
      </header>
    </>
  );
};
