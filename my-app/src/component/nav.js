import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../Context/authContext'
import './menu.css'


const Nav = () => {
    const { isLogin } = useContext(AuthContext)
    const { Logout } = useContext(AuthContext)

    return (





        <nav className="main-menu">
            <ul>
                <li>
                    <NavLink to='/'>
                        <i className="fa fa-home fa-2x"></i>
                        <span className="nav-text">Dashboard </span>
                    </NavLink>


                </li>

                <li>
                    <NavLink to='list'>
                        <i className="fa fa-table fa-2x"></i>
                        <span className="nav-text"> ListProduct</span>
                    </NavLink>

                </li>

                <li>
                    <NavLink to='/addproduct'>
                        <i className="fa fa-product-hunt fa-2x"></i>
                        <span className="nav-text"> AddProduct </span>
                    </NavLink>

                </li>



            </ul>

            <ul className="logout">

                <li>
                    <a href="#">

                        {!isLogin && <i className="fa fa-sign-in fa-2x" ></i>}
                        {!isLogin && <NavLink to='register' className='nav-href'><span className="nav-text"> Register </span></NavLink>}
                        {isLogin && <i className="fa fa-user fa-2x d-none" ></i>}
                        {isLogin && <NavLink to='profile' className='nav-href'><span className="nav-text d-none">  Profile </span></NavLink>}
                    </a>


                </li>





                <li>
                    {isLogin && <NavLink to='signin' className='nav-href '>

                        <i className="fa fa-sign-in fa-2x d-none" ></i>
                        <span className="nav-text d-none"> Login </span>
                    </NavLink>}
                    {!isLogin && <NavLink to='signin' className='nav-href '>

                        <i className="fa fa-sign-in fa-2x " ></i>
                        <span className="nav-text "> Login </span>
                    </NavLink>}
                </li>




                <li>
                
                    <button className="btn btn-danger btn-d" onClick={Logout}>Logout</button>


                </li>

            </ul>
        </nav>



    );



};

export default Nav;