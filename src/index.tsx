import React from 'react'
import { render } from 'react-dom'
import "./index.scss"

// Import components
import { ContactDashboard } from './components/Contacts-dashboard'

// Import styles

// Find div container
const rootElement = document.getElementById('root')

// Render Contacts component in the DOM
render(<ContactDashboard />, rootElement)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
