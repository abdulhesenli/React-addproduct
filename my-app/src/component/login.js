import React, { useContext } from "react";
import './register.css'
import { useFormik } from "formik";
import validationSchema from './SigninValidation'
import { LoginUser } from "../store";
import { AuthContext } from "../Context/authContext";

const SignIn = () => {
    const { Login } = useContext(AuthContext)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',

        },

        validationSchema,
        onSubmit: async (values, bags) => {
            //  console.log(values);
            try {
                let resrponseData = await LoginUser(values);
                Login(resrponseData);
            } catch (e) {
                //  console.log(e);
                bags.setErrors({ general: 'An error occurred' });
            }
        },
    });

    return (
        <div className="container">
            <div id="signup">
                <div className="signup-screen">
                    <div className="space-bot text-center">
                        <h1> SignIn </h1>
                        <div className="divider"></div>
                    </div>


                    <form onSubmit={formik.handleSubmit} className="form-register" method="post" name="register" >



                        <div className="input-field col s6">
                            <input id="email" type="email" name="email" placeholder="Email" ng-model="email" className={` ${formik.touched.email && formik.errors.email && 'is-invalid'}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />

                        </div>

                        <div className="input-field col s6">
                            <input id="password" type="password" placeholder="Password" name="password" className={` ${formik.touched.password && formik.errors.password && 'is-invalid'}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />

                        </div>

                        <div className="space-top text-center">
                            <button className="btn btn-dark"> L O G I N</button>

                        </div>
                    </form>

                </div>

            </div>
        </div>



    )
};

export default SignIn;