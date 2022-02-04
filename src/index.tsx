import React from 'react'
import { render } from 'react-dom'
import "./index.scss"
// Import components
import { ContactDashboard } from './components/Contacts-dashboard'
import { ToastContainer } from 'react-toastify'


const rootElement = document.getElementById('root')

render(<><ContactDashboard /><ToastContainer position="top-center"
    toastStyle={{
        backgroundColor: "#171717",
        color: "#fff",
        fontSize: "12px",
    }}
    autoClose={1800}
    // hideProgressBar
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover /></>, rootElement)

