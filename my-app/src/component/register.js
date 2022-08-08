import React ,{useContext} from "react";
import { useFormik } from 'formik';
import './register.css'
import validationSchema from './validations/validation'
import {Signup} from '../store'
import {AuthContext} from '../Context/authContext'

const Register = () => {

    const{Login}=useContext(AuthContext)
    // const {register} = useContext(AuthContext)

    const formik = useFormik({
        initialValues: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
         
        },

        validationSchema,
        onSubmit: async (values) => {
         let Response = await Signup(values);
         Login(Response)
         console.log(Response);
          
        },
      });

    return (
        <div className="container">
            <div id="signup">
                <div className="signup-screen">
                    <div className="space-bot text-center">
                        <h1> Please Register</h1>
                        <div className="divider"></div>
                    </div>


                    <form onSubmit={formik.handleSubmit} className="form-register" name="register" >

                        <div className="input-field col s6">
                            <input type="text" id="first-name" name="firstName" className={`${formik.touched.firstName && formik.errors.firstName && 'is-invalid'}`} placeholder="Frist Name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstName}  />
                          
                        </div>

                        <div className="input-field col s6">
                            <input id="last-name" type="text" name="lastName" className={`${formik.touched.lastName && formik.errors.lastName && 'is-invalid'}`} placeholder="Last Name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastName} />
                    
                        </div>

                        <div className="input-field col s6">
                            <input id="email" type="email" name="email" ng-model="email" className={` ${formik.touched.email && formik.errors.email && 'is-invalid'}`}  placeholder="Email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
                           
                        </div>

                        <div className="input-field col s6">
                            <input id="password" type="password" name="password" className={`${formik.touched.password && formik.errors.password && 'is-invalid'}`} placeholder="Password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                         
                        </div>

                        <div className="space-top text-center">
                            <button className="btn btn-warning"  id="btn" type="submit"> R E G I S T E R</button>
                       
                        </div>
                    </form>

                </div>

            </div>
        </div>



    )
};

export default Register;