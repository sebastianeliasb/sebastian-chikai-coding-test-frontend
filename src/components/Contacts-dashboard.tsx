import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Import components
import { ContactList } from './Contacts-list'

// Import styles

// Create Contact component
export const ContactDashboard = () => {
    // Prepare states
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [avatar, setAvatar] = useState('')
    const [link, setLink] = useState('')
    const [tags, setTags] = useState('')
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)

    // Fetch all bcontacts on initial render
    useEffect(() => {
        fetchContacts()
    }, [])

    // Fetch all bcontacts
    const fetchContacts = async () => {
        // Send GET request to 'bcontacts/all' endpoint
        axios
            .get('http://localhost:4001/contacts/all')
            .then(response => {
                // Update tcontacts state
                setContacts(response.data)

                // Update loading state
                setLoading(false)
            })
            .catch(error => console.error(`There was an error retrieving the contacts: ${error}`))
    }

    // Reset all input fields
    const handleInputsReset = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setAge('')
        setPhoneNumber('')
        setAvatar('')
        setLink('')
        setTags('')
    }

    // Create new contacts
    const handleContactCreate = () => {
        // Send POST request to 'bcontacts/create' endpoint
        axios
            .post('http://localhost:4001/contacts/create', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                age: age
            })
            .then(res => {
                console.log(res.data)

                // Fetch all contactss to refresh
                // the contacts on the row 
                fetchContacts()
            })
            .catch(error => console.error(`There was an error creating the ${firstName} error: ${error}`))
    }

    // Submit new contact
    const handleContactSubmit = () => {
        // Check if all fields are filled
        if (firstName.length > 0 && lastName.length > 0 && email.length > 0 && age.length > 0) {
            // Create new contact
            handleContactCreate()

            console.info(`Contact ${firstName} ${lastName} added.`)

            // Reset all input fields
            handleInputsReset()
        }
    }

    // Remove contact
    const handleContactRemove = (id: number, firstName: string) => {
        // Send PUT request to 'contacts/delete' endpoint
        axios
            .put('http://localhost:4001/contacts/delete', { id: id })
            .then(() => {
                console.log(`Contact ${firstName} removed.`)

                // Fetch all contacts to refresh
                // the contacts on the row 
                fetchContacts()
            })
            .catch(error => console.error(`There was an error removing the ${firstName} error: ${error}`))
    }

    // Reset contacts list (remove all contacts)
    const handleListReset = () => {
        // Send PUT request to 'contacts/reset' endpoint
        axios.put('http://localhost:4001/contacts/reset')
            .then(() => {
                // Fetch all contacts to refresh
                // the contacts on the row
                fetchContacts()
            })
            .catch(error => console.error(`There was an error resetting the contact list: ${error}`))
    }

    return (
        <div className="contact-list-wrapper">
            {/* Form for creating new contact */}
            <div className="contact-list-form">
                <div className="form-wrapper" onSubmit={handleContactSubmit}>
                    <div className="form-row">
                        <fieldset>
                            <label className="form-label" htmlFor="firstName">Enter first name:</label>
                            <input className="form-input" type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.currentTarget.value)} />
                        </fieldset>

                        <fieldset>
                            <label className="form-label" htmlFor="lastName">Enter last name:</label>
                            <input className="form-input" type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.currentTarget.value)} />
                        </fieldset>
                    </div>

                    <div className="form-row">
                        <fieldset>
                            <label className="form-label" htmlFor="email">Enter email:</label>
                            <input className="form-input" type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
                        </fieldset>

                        <fieldset>
                            <label className="form-label" htmlFor="age">Enter age:</label>
                            <input className="form-input" type="text" id="age" name="age" value={age} onChange={(e) => setAge(e.currentTarget.value)} />
                        </fieldset>

                        <fieldset>
                            <label className="form-label" htmlFor="phoneNumber">Enter phone number:</label>
                            <input className="form-input" type="text" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.currentTarget.value)} />
                        </fieldset>

                        <fieldset>
                            <label className="form-label" htmlFor="avatar">Enter avatar:</label>
                            <input className="form-input" type="text" id="avatar" name="avatar" value={avatar} onChange={(e) => setAvatar(e.currentTarget.value)} />
                        </fieldset>

                        <fieldset>
                            <label className="form-label" htmlFor="link">Enter personal website:</label>
                            <input className="form-input" type="text" id="link" name="link" value={link} onChange={(e) => setLink(e.currentTarget.value)} />
                        </fieldset>

                        <fieldset>
                            <label className="form-label" htmlFor="tags">Enter tags:</label>
                            <input className="form-input" type="text" id="tags" name="tags" value={tags} onChange={(e) => setTags(e.currentTarget.value)} />
                        </fieldset>

                    </div>
                </div>

                <button onClick={handleContactSubmit} className="btn btn-add">Add a contact</button>
            </div>

            {/* Render contacts list component */}
            <ContactList contacts={contacts} loading={loading} handleContactRemove={handleContactRemove} />

            {/* Show reset button if list contains at least one contact */}
            {contacts.length > 0 && (
                <button className="btn btn-reset" onClick={handleListReset}>Reset Contacts list.</button>
            )}
        </div>

    )
}