import React from 'react'
import { render } from 'react-dom'
import "./index.scss"
// Import components
import { ContactDashboard } from './components/Contacts-dashboard'
import { ToastContainer } from 'react-toastify'

// Import styles

// Find div container
const rootElement = document.getElementById('root')

// Render Contacts component in the DOM
render(<><ContactDashboard /><ToastContainer position="top-center"
    toastStyle={{
        backgroundColor: "#171717",
        color: "#fff",
        fontSize: "12px",
    }}
    autoClose={1500}
    // hideProgressBar
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover /></>, rootElement)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
