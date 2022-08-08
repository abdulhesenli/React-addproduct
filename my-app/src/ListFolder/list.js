import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ComingRealDb, DeleteProduct } from '../store';
import Swal from 'sweetalert2'
import './Table.css'

function List() {


  const [ single, setSingle ] = useState('')
  const { isLoading, error, data } = useQuery('repoData', ComingRealDb)



  const [products, setProducts] = useState(data);



  useEffect(() => {
    setProducts(data)
  }, [data])



  if (isLoading) return 'Loading...';
  if (error) return 'An error has occurred:'


  // console.log(products);
  const ViewFun = (id) => {

    let SingleData = data.find((item) => {

      return item.id === id
    })

    console.log(SingleData);
    setSingle(SingleData)
  };





  const Delete = (id, index) => {

    DeleteProduct(id);
    let productsFilter = products.filter((item) => {
      return item.id != id;

    });
    try {

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Product Delete',
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

    setProducts(productsFilter);

  }



  return (
    <div>
      <section>

        <h1>Addproduct List</h1>
        <div className="tbl-header">
          <table border="0">
            <thead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>PRICE</th>
                <th>IMAGES </th>
                <th>Status </th>
                <th>Operation </th>

              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table border="0">
            <tbody>
              {
                products &&
                products.map((item, index) => {

                  return (
                    <tr key={index}>
                      <th scope="row"> {index + 1} </th>
                      <td>{item.title} </td>
                      <td>{item.price}</td>
                      <td> <img className='dataimg' width='100px' src={item.images} alt="" /> </td>
                      <td> {item.status == 0 && <p style={{ color: "yellow" }}>Gozlemededir...</p>}
                        {item.status == 1 && <p style={{ color: "green" }}> Aktiv</p>}
                        {item.status == 2 && <p style={{ color: "red" }}>Legv edildi...</p>}</td>
                      <td>

                        <button onClick={() => { ViewFun(item.id) }} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"> View</button>
                        <NavLink to={`/products/${item.id}`}> <button className='btn btn-warning btn-sm me-1'>Edit</button></NavLink>
                        <button onClick={() => { Delete(item.id, index) }} className='btn btn-danger btn-sm' > Delete</button>

                      </td>
                    </tr>
                  )

                })


              }
            </tbody>
          </table>




        </div>
      </section>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <h1 className='modalwiew' > <span>NAME :</span> {single.title}</h1>
              <h2 className='modalwiew'>ABOUT : {single.about}</h2>
              <h2 className='modalwiew'> PRICE : {single.price}</h2>
              <img className='modalimage' src={single.images} width="400px" alt="" />

            </div>
  
          </div>
        </div>
      </div>


    </div>
  )
}

export default List;