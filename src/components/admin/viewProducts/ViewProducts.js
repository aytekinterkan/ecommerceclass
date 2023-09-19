//// admin panelindeki allproducts componenti
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db, storage } from '../../../firebase/config'
import Loader from '../../loader/Loader'
import styles from "./ViewProducts.module.scss"
import { Link } from 'react-router-dom'
import {FaEdit,FaTrashAlt} from "react-icons/fa"
import { deleteObject, ref } from 'firebase/storage'
import Notiflix from 'notiflix'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_PRODUCTS, selectProducts } from '../../../redux/slice/productSlice'
import useFetchCollection from '../../../customHooks/useFetchCollection'
import { FILTER_BY_SEARCH, selectFilteredProducts } from '../../../redux/slice/filterSlice'
import Search from '../../search/Search'
import Pagination from '../../pagination/Pagination'

const ViewProducts = () => {

  const {data,isLoading} = useFetchCollection("products")
  const products = useSelector(selectProducts)

  const [search,setSearch] = useState("")
  const filteredProducts = useSelector(selectFilteredProducts)
  const dispatch = useDispatch();

  const [currentPage,setCurrentPage] = useState(1)
  const productsPerPage = 9

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = (currentPage - 1) * productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct,indexOfLastProduct)

  useEffect(()=>{
    dispatch(STORE_PRODUCTS({products: data}))
  },[dispatch,data])
  
  useEffect(()=>{
    dispatch(FILTER_BY_SEARCH({products, search}))
  },[dispatch,products,search])

  const deleteProduct = async(id,imageURL) => {
    try {
      await deleteDoc(doc(db,"products",id))
      const storageRef = ref(storage,imageURL)
      await deleteObject(storageRef)
      toast.success("Product deleted successfully")
    } 
    catch(error) {
      toast.error(error.message)
    }
  }

  const confirmDelete = (id,imageURL) => {
    Notiflix.Confirm.show(
      'Delete Product!!!',
      'You are about to delete this product?',
      'Delete',
      'Cancel',
      function okCb() {
        deleteProduct(id,imageURL);
      },
      function cancelCb() {
      },
      {
        width: '320px',
        borderRadius: '3px',
        titleColor: 'orangered',
        okButtonBackground:'orangered',
        cssAnimationStyle:'zoom'
      },
    );
  }
  return (
    <>
    {isLoading && <Loader/>}
    <div className={styles.table}>
      <h2>All Products</h2>
      <div className={styles.search}>
        <p>
          <b>{filteredProducts.length}</b> products found
        </p>
        <Search value={search} onChange={(e)=>setSearch(e.target.value)}/>
      </div>
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
            {currentProducts.map((product,index)=>{
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
                    <FaTrashAlt size={18} color="red" onClick={()=> confirmDelete(id,imageURL)}/>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} productsPerPage={productsPerPage} totalProducts={filteredProducts.length}/>
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







// zamaanlama ile ilgili firestone iptali

// https://redux-toolkit.js.org/api/getDefaultMiddleware#customizing-the-included-middleware


// setdoc, güncelleme
// https://firebase.google.com/docs/firestore/manage-data/add-data#set_a_document



// dosyayı sil
// https://firebase.google.com/docs/storage/web/delete-files#delete_a_file


