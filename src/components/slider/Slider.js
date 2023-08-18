//// home sayfasındaki slider i yapacağımız yer
import React from 'react'
import "./Slider.scss"
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai"

const Slider = () => {
  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev"/>
      <AiOutlineArrowRight className="arrow next"/>

    </div>
  )
}

export default Slider