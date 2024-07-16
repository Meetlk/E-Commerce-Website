import {FaShoppingCart} from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../redux/Slices/AuthSlice"
import toast from "react-hot-toast";

const Navbar = () => {

  const dispatch = useDispatch();
  const {cart} = useSelector((state) => state);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged Out Successfully");
  }

  return (
    <div >
      <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto">

        <NavLink to="/">
          <div className="ml-5">
          <img src="../logo.png" className="h-14"/>
          </div>
        </NavLink>

          <div className="flex items-center font-medium text-slate-100 mr-5 space-x-6">
            <NavLink to="/">
              <p>Home</p>
            </NavLink>

            {
              isAuthenticated ? 
              (<NavLink onClick={handleLogout}>
                <p>Logout</p>
              </NavLink>) : 

              (<>
                <NavLink to="/login">
                  <p>Login</p>
                </NavLink>
    
                <NavLink to="/signup">
                  <p>SignUp</p>
                </NavLink>
              </>)
            }

            <NavLink to="/cart">
              <div className="relative">
                  <FaShoppingCart className="text-2xl"/>
                  {
                    cart.length > 0 &&
                    <span
                    className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex 
                    justify-center items-center animate-bounce rounded-full text-white" 
                    >{cart.length}</span>
                  }
                  
              </div>
            </NavLink>            
          </div>
      </nav>
    </div>
  )
};

export default Navbar;
