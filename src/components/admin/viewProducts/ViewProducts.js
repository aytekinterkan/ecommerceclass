//// admin panelindeki allproducts componenti
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../../../firebase/config'
import Loader from '../../loader/Loader'
import styles from "./ViewProducts.module.scss"
import { Link } from 'react-router-dom'
import {FaEdit,FaTrashAlt} from "react-icons/fa"

const ViewProducts = () => {
  const [products,setProducts] = useState([])
  const [isLoading,setIsLoading] = useState(false)

  useEffect(()=>{
    getProducts()
  },[])

  const getProducts = () => {
    setIsLoading(true)
    try {
      const productsRef = collection(db,"products")
      const q = query(productsRef, orderBy("createdAt","desc"))
      onSnapshot(q, (snapshot) => {
        const allProducts = snapshot.docs.map((doc)=>({
          id: doc.id,
          ...doc.data()

        }))
        setProducts(allProducts)
        setIsLoading(false)
    })
  }
    catch (error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  }



  return (
    <>
     {isLoading && <Loader/>}
     <div className={styles.table}>
     <h2>All Products</h2>
     {products.length === 0 ? (<p>No product found</p>) : (
      <table>
        <thead>
          <tr>
              <th>s/n</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {products.map((product,index)=>{
              const {id,name,price,imageURL,category} = product
              return(
                <tr key={id}>
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    <img src={imageURL} alt={name} style={{width:"100px"}}/>
                  </td>
                  <td>
                    {name}
                  </td>
                  <td>
                    {category}
                  </td>
                  <td>
                    {`$${price}`}
                  </td>
                  <td className={styles.icons}>
                    <Link to={`/admin/add-product/${id}`}>
                      <FaEdit size={20} color="green"/>
                    </Link>
                    &nbsp;
                    <FaTrashAlt size={18} color="red"/>
                  </td>
                </tr>
              )
            })}


        </tbody>



      </table>

     )}




     </div>
    
    
    
    </>
  )
}

export default ViewProducts












// https://firebase.google.com/docs/firestore/query-data/get-data?hl=en&authuser=5#example_data

// https://firebase.google.com/docs/firestore/query-data/order-limit-data?hl=en&authuser=5#order_and_limit_data


// https://firebase.google.com/docs/firestore/query-data/listen?hl=en&authuser=5#listen_to_multiple_documents_in_a_collection

// delete için
// https://firebase.google.com/docs/firestore/manage-data/delete-data?hl=en&authuser=5#delete_documents


// https://firebase.google.com/docs/storage/web/delete-files?hl=en&authuser=5#delete_a_file



// Notiflix.Confirm.show(
//   'Notiflix Confirm',
//   'Do you agree with me?',
//   'Yes',
//   'No',
//   function okCb() {
//     alert('Thank you.');
//   },
//   function cancelCb() {
//     alert('If you say so...');
//   },
//   {
//     width: '320px',
//     borderRadius: '8px',
//     // etc...
//   },
// );



// zamaanlama ile ilgili firestone iptali

// https://redux-toolkit.js.org/api/getDefaultMiddleware#customizing-the-included-middleware


// setdoc, güncelleme
// https://firebase.google.com/docs/firestore/manage-data/add-data#set_a_document



// dosyayı sil
// https://firebase.google.com/docs/storage/web/delete-files#delete_a_file


