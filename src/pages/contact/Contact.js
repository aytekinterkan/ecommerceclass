//// contact us kısmı burada yazılır
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import styles from "./Contact.module.scss"
import Card from '../../components/card/Card'
import { FaEnvelope, FaPhoneAlt, FaTwitter } from 'react-icons/fa'
import { GoLocation } from 'react-icons/go'
import { toast } from 'react-toastify';


const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault()
    emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID,'template_ss7ntlq', form.current , 'yvdb7d3eUOau1ME2s')
    .then(()=> {
      toast.success("Message sent successfully")
    }, (error) => {
      toast.error(error.message)
    });
    e.target.reset();
  }

  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Contact Us</h2>
        <div className={styles.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label>Name:</label>
              <input type="text" name="user_name" placeholder="Full Name" required/>
              <label>Email:</label>
              <input type="email" name="user_email" placeholder="Your active email" required/>
              <label>Subject:</label>
              <input type="text" name="subject" placeholder="Subject" required/>
              <label>Your Message:</label>
              <textarea name="message" cols="30" rows="10" required />
              <button className="--btn --btn-primary">Send Message</button>
            </Card>
          </form>
          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Our Contact Information</h3>
              <p>Fill the form or contact us via other channels listed below</p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt/>
                  <p>+90 555 555 55 55</p>
                </span>
                <span>
                  <FaEnvelope/>
                  <p>Support@eshop.com</p>
                </span>
                <span>
                  <GoLocation/>
                  <p>Izmir,Turkey</p>
                </span>
                <span>
                  <FaTwitter/>
                  <p>@mustafaselman</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

// https://www.emailjs.com/docs/sdk/installation/

// https://www.emailjs.com/docs/examples/reactjs/


// https://dashboard.render.com/