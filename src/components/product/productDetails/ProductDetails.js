//// home sayfasındaki ürünlere tıkladığımızda çıkan product details componenti
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import useFetchDocument from '../../../customHooks/useFetchDocument';

const ProductDetails = () => {
  const {id} = useParams();
  const [product,setProduct] = useState(null)
  const document = useFetchDocument("products",id)



  return (
    <div>{JSON.stringify(document)}</div>
  )
}

export default ProductDetails