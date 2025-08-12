import React from "react"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import AddBike from "./pages/AddBike"
import AllBikes from "./pages/AllBikes"
import BikeDetails from "./pages/BookDetails"
import MyBookings from "./pages/MyBooking"
import Dashboard from "./components/Dashboard"
import MyReviews from "./pages/MyReviews"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import TermsAndConditions from "./pages/TermsAndCondition"
import PaymentPage from "./pages/PaymentPage"

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-bike" element={<AddBike />} />
        <Route path="/get-all-bikes" element={<AllBikes />} />
        <Route path="/bike/:bikeId" element={<BikeDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/my-reviews" element={<MyReviews />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-condition" element={<TermsAndConditions />} />
        <Route path="//payment/:paymentId" element={<PaymentPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
