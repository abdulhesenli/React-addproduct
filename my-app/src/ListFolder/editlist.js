import React, { useState } from "react";
import { Formik } from 'formik';
import { useParams } from "react-router-dom";
import { useQuery } from 'react-query';
import { eData, UpdateData } from "../store";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import './Table.css'

const Editlist = () => {

    let navigate = useNavigate()

    // const { isLoading, error, data }  = useQuery('repoData', ComingRealDb)

    let { id } = useParams();

    const { isLoading, error, data } = useQuery(['todos', id], () => eData(id))

    if (isLoading) return 'Loading...';

    if (error) return 'An error has occurred:'




    return (
        <div className="container">
            <h1>Update list</h1>
            <Formik initialValues={{
                title: data.title,
                about: data.about,
                price: data.price,
                images: data.images,
                userid : localStorage.getItem('localId'),
                status: 0,
            }}

                onSubmit={async (values) => {

                    try {
                        let gelenData = await UpdateData({ id, values });
                        
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Deyesiklik ugurlu',
                            showConfirmButton: false,
                            timer: 2000
                        })


                    } catch (e) {
                      
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Xeta bas verdi!',
                           
                        })

                    }



                }} >

                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, /* and other goodies */ }) => (
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="title" onChange={handleChange} onBlur={handleBlur} value={values.title} />
                        {errors.title && touched.title && errors.title}

                        <input type="text" name="about" onChange={handleChange} onBlur={handleBlur} value={values.about} />
                        {errors.about && touched.about && errors.about}

                        <input type="number" name="price" onChange={handleChange} onBlur={handleBlur} value={values.price} />
                        {errors.price && touched.price && errors.price}


                        <div className="form-floating mb-3 d-flex  justify-content-between align-items-center">
                            <div>
                                <button className="btn btn-warning" type="button"  > Random Image </button>

                            </div>
                            <img src={values.images} id='editimg' width="100px" alt="" />
                        </div>



                        <button className="btn btn-dark" id="editbtn" type="submit"> Submit </button>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default Editlist;