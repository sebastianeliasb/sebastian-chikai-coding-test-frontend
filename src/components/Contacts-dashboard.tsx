import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Import components
import { ContactList } from './Contacts-list'

// Import styles
import "./style/contacts-dashboard/style.scss"
import { ContactView } from './Contacts-view'


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
    const [modal, setModal] = useState(false)
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)
    const [viewInfo, setViewInfo] = useState(false)
    const [contact, setContact] = useState({})

    const emptyContactToEdit = {
        id: 0,
        firstName: '',
        lastName: '',
        email: ''
    }

    // Fetch all contacts on initial render
    useEffect(() => {
        fetchContacts()


    }, [])
    useEffect(() => {



    }, [])
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [selectedContact, setSelectedContact] = useState(emptyContactToEdit)

    // Fetch all contacts
    const fetchContacts = async () => {
        // Send GET request to 'contacts/all' endpoint
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

    const handleGetContact = (id: number) => {
        axios
            .put('http://localhost:4001/contacts/contact', {
                id: id,
                firstName: firstName,

            })
            .then(response => {
                const contactResponse = (response.data.contactData[0])
                console.log(contactResponse)
                setSelectedContact(contactResponse)
                console.log(contact)

            })
            .catch(error => console.error(`There was an error retrieving the contacts: ${error}`))


    }

    // TODO: axios getContact request
    const handleContactSearchById = (id: number) => {

        // fake response to test that the id is changing

        const contactToEdit = {
            id: id,
            firstName: "",
            lastName: '',
            email: ''
        }

        return contactToEdit
    }
    const handleView = (id: number) => {
        handleGetContact(id)
        setViewInfo(!viewInfo)
        id !== 0 ? handleOpenEditModal(true, id) : handleOpenEditModal(false)
        console.log(id)
    }

    const handleOpenEditModal = (isOpened: boolean, contactId?: number) => {
        setIsOpenModal(isOpened)
        if (contactId) {
            const contactById = handleContactSearchById(contactId)
            setSelectedContact(contactById)
        }
    }
    const handleCloseModal = () => {
        setIsOpenModal(false)
        setSelectedContact(emptyContactToEdit)
    }


    const handleSaveContactInfo = () => {
        // get input values
        //  close the modal
        // put of the contact based on selectecContactToEdit stored on useState
        // refresh view (I guess)
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

    const handleToggleModal = () => setModal(!modal);


    // Create new contacts
    const handleContactCreate = () => {
        // Send POST request to 'contacts/create' endpoint
        axios
            .post('http://localhost:4001/contacts/create', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                age: age,
                phoneNumber: phoneNumber,
                avatar: avatar,
                link: link,
                tags: tags
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
            handleToggleModal()
        }
    }




    const handleContactRemove = (id: number, firstName: string) => {
        // Send PUT request to 'contacts/delete' endpoint
        axios
            .put('http://localhost:4001/contacts/delete', { id: id })
            .then((response) => {
                console.log(`Contact ${firstName} removed.`)
                console.log(response.data)

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
            {modal ?
                <div className='backlash'>
                    <div className="contact-list-form" onSubmit={handleContactSubmit}>


                        <fieldset className='firstName'>
                            <label className="form-label" htmlFor="firstName">Enter first name:</label>
                            <input className="form-input" type="text" id="firstName" name="firstName" value={firstName}
                                onChange={(e) => setFirstName(e.currentTarget.value)} />
                        </fieldset>
                        <fieldset className='lastName'>
                            <label className="form-label" htmlFor="lastName">Enter last name:</label>
                            <input className="form-input" type="text" id="lastName" name="lastName" value={lastName}
                                onChange={(e) => setLastName(e.currentTarget.value)} />
                        </fieldset>
                        <fieldset className='email'>
                            <label className="form-label" htmlFor="email">Enter email:</label>
                            <input className="form-input" type="text" id="email" name="email" value={email}
                                onChange={(e) => setEmail(e.currentTarget.value)} />
                        </fieldset>
                        <fieldset className='phoneNumber'>
                            <label className="form-label" htmlFor="phoneNumber">Enter phone number:</label>
                            <input className="form-input" type="text" id="phoneNumber" name="phoneNumber"
                                value={phoneNumber} onChange={(e) => setPhoneNumber(e.currentTarget.value)} />
                        </fieldset>


                        <fieldset className='age'>
                            <label className="form-label" htmlFor="age">Enter age:</label>
                            <input className="form-input" type="text" id="age" name="age" value={age}
                                onChange={(e) => setAge(e.currentTarget.value)} />
                        </fieldset>
                        <fieldset className='link'>
                            <label className="form-label" htmlFor="link">Enter personal website:</label>
                            <input className="form-input" type="text" id="link" name="link" value={link}
                                onChange={(e) => setLink(e.currentTarget.value)} />
                        </fieldset>


                        <fieldset className='avatar'>
                            <label className="form-label" htmlFor="avatar">Enter avatar:</label>
                            <input className="form-input" type="text" id="avatar" name="avatar" value={avatar}
                                onChange={(e) => setAvatar(e.currentTarget.value)} />
                        </fieldset>


                        <fieldset className='tags'>
                            <label className="form-label" htmlFor="tags">Enter tags:</label>
                            <input className="form-input" type="text" id="tags" name="tags" value={tags}
                                onChange={(e) => setTags(e.currentTarget.value)} />
                        </fieldset>

                        <div className='add-btn-wrapper add'>
                            <button onClick={handleContactSubmit} className="btn btn-add">Add contact</button>
                        </div>
                        <div className='close-modal-wrapper close'>
                            <button onClick={handleToggleModal} className="btn btn-close">Close</button>
                        </div>
                    </div>


                </div> : null
            }
            {!isOpenModal &&
                <div className='btn-wrapper'>
                    <div>
                        <button onClick={handleToggleModal} className="btn btn-add">Add a contact</button>
                    </div>

                    {
                        contacts.length > 0 && (
                            <div>
                                <button className="btn btn-reset" onClick={handleListReset}>Reset Contacts list.</button>
                            </div>

                        )

                    }
                </div>
            }
            {/* Show reset button if list contains at least one contact */}


            {/* Render contacts list component */}
            {isOpenModal ?
                (
                    <>
                        <div className='btn-wrapper'>
                            <div>
                                <button className="btn btn-add" onClick={handleSaveContactInfo}>Save contact info</button>
                            </div>
                            <div>
                                <button className="btn btn-reset" onClick={handleCloseModal}>Exit editing modal</button>
                            </div>
                        </div>
                        {selectedContact?.id > 0 &&
                            <>
                                <h3>Contact Id: {selectedContact?.id}</h3>
                                <input type="text" defaultValue={selectedContact?.firstName}></input>
                                <input type="text" defaultValue={selectedContact?.lastName}></input>
                                <input type="text" defaultValue={selectedContact?.email}></input>
                            </>
                        }
                    </>
                ) :
                <ContactList contacts={contacts} loading={loading} handleContactRemove={handleContactRemove}
                    handleView={handleView} />
            }


        </div>

    )
}
