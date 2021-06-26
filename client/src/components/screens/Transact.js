import React, { useState, useEffect } from 'react'
import axios from 'axios';

import Navbar from '../parts/Navbar';
import InfoSection from '../parts/InfoSection';
import Footer from '../parts/Footer';

import { minerData } from '../parts/InfoSection/Data';

const Register = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      const config = {
        header: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authenticationToken")}`
        }
      };

      try {
        const { data } = await axios.get("/api/transactions", config);
        setTransactions(data.transactions);
      } catch (e) {
        localStorage.removeItem("authenticationToken");
        setError("You are not authorized to access this page. Please Login")
      }
    }

    fetchTransactions();
  },[]);

  return (
    <>
      <Navbar />
      <InfoSection {...minerData}/>
      <Footer />
    </>
  )
}

export default Register;
