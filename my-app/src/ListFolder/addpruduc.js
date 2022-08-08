import React, {useState} from "react";
import { useFormik } from 'formik';
import { useQuery } from "react-query";
import Addvalidation from "./Addvalidation";
import DefultImage from '../images/default_image.jpg'
import LoadigImage from '../images/Loading.gif'
import { RandomImage, AddRealDb, GetCategory } from "../store";
import './add.css'

const AddProducts = () => {

    const [downcategorydata, setDowncategorydata]=useState('')
    const [ picture, setPicture]= useState(DefultImage)


    const Image = async () => {
        setPicture(LoadigImage)
        let img = await RandomImage();
        formik.values.images = img
        setPicture(img)
        


    }



    const formik = useFormik({
        initialValues: {
            title: '',
            about: '',
            price: '',
            images: '',
            status: 0,
            Ustcategoryid: '',
            AltCategory: '',
            favoriteProduct:0,
            userid: localStorage.getItem('localId'),

        },

        validationSchema: Addvalidation,


        onSubmit: async (values, { resetForm }) => {

            let coming = await AddRealDb(values);
            resetForm({ values: '' })

        },
    });

    const { isLoading, error, data } = useQuery("repoData", GetCategory);

    if (isLoading) return "Loading...";
    if (error) return "An error has occurred: " + error.message;

    const Ustkateqoriya = data.filter((item)=>{
        return item.TopMenu ==0
    })

    const Downcategory=(e)=>{
        const altcategorydata= data.filter((item)=>{
            return item.TopMenu == e.target.value
        })

        setDowncategorydata(altcategorydata)

    }




    return (
        <div className="container">

            <div className="row">
                <div className="col-6 offset-3">

                    <form onSubmit={formik.handleSubmit}>
                        <label> Add Products </label>


                        <select className="form-control" name="Ustcategoryid" onChange={formik.handleChange}   onInput={Downcategory}  >
                            <option>Kategoriya secin</option>
                            {
                                Ustkateqoriya.map((item, i) => ( 
                                    <option value={item.id} key={i}>{item.Category}</option>
                                ))

                            }
                        </select>

                        {
                            downcategorydata && 
                          <div className=' mt-4 '>
                              <select className="form-control altcategory" name="AltCategory" onChange={formik.handleChange}   value={formik.values.AltCategory}  >
                            <option > Alt kategoriya secin</option>
                            {
                                downcategorydata.map((item, i) => (
                                    <option value={item.id} key={i}>{item.Category}</option>
                                ))

                            }
                        </select>
                          </div>
                        }



                        <input type="text" placeholder="Product title" name="title" className={` form-control ${formik.touched.title && formik.errors.title && 'is-invalid'}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} />
                        <input type="text" placeholder="Product About" name="about" className={` form-control ${formik.touched.about && formik.errors.about && 'is-invalid'}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.about} />
                        <input type="number" placeholder="Product  price" name="price" className={` form-control ${formik.touched.price && formik.errors.price && 'is-invalid'}`} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.price} />


                        <div className="form-floating mb-3 d-flex  justify-content-between align-items-center">
                            <div className="d-flex justify-content-between my-3 ">
                                <div><button className="btn btn-warning btn-w" type="button" onClick={Image}> Random Image </button></div>
                                
                                <div><img src={picture} width="100px" alt="" /></div>

                            </div>
                            
                        </div>


                        <button className="btn btn-dark add-btn" > Add</button>



                    </form>



                </div>
            </div>





        </div>
    )
}

export default AddProducts;