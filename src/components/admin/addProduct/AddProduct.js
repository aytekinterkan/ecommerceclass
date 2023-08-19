//// admin panelindeki add product componenti
import React, { useState } from 'react'
import styles from "./AddProduct.module.scss"

const categories = [
  {id:1, name: "Laptop"},
  {id:2, name: "Electronics"},
  {id:3, name: "Fashion"},
  {id:4, name: "Phone"}
]

const AddProduct = () => {

  const [product,setProduct] = useState({
    name: "",
    imageURL: "",
    price: 0,
    category: "",
    brand: "",
    desc: "",
  })

  const handleInputChange = (e) => {}
  const handleImageChange = (e) => {}

  return (
    <div>AddProduct</div>
  )
}

export default AddProduct