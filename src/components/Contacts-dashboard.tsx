import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Import components
import { ContactList } from './Contacts-list'

// Import styles
import "./style/contacts-dashboard/style.scss"
import { ContactModalEdit } from './Contact-modal-edit'

type contactDetails1 = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    age?: number | string;
    phoneNumber?: string;
    avatar?: string;
    link?: string;
    tags?: string;
}

// Create Contact component
export const ContactDashboard = () => {
    // Prepare states

    let contactDetails = {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        age: 0,
        phoneNumber: "",
        avatar: "",
        link: "",
        tags: ""
    }


    const [contact, setContact] = useState(contactDetails) // Input contact => Disapears on refresh
    const [selectedContact, setSelectedContact] = useState<contactDetails1>(contactDetails) //Selected Contact to edit
    const [modalAdd, setModalAdd] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [contacts, setContacts] = useState([]) // All contacts => Response from DB, can't access
    const [loading, setLoading] = useState(true)
    const [viewInfo, setViewInfo] = useState(false)


    // Fetch all contacts on initial render
    useEffect(() => {
        fetchContacts()


    }, [])
    useEffect(() => {


    }, [selectedContact])



    // Create new contacts
    const handleContactCreate = () => {
        // Send POST request to 'contacts/create' endpoint
        axios
            .post('http://localhost:4001/contacts/create', {
                firstName: contact.firstName,
                lastName: contact.lastName,
                email: contact.email,
                age: contact.age,
                phoneNumber: contact.phoneNumber,
                avatar: contact.avatar,
                link: contact.link,
                tags: contact.tags
            })
            .then(res => {
                // console.log(res.data)

                // Fetch all contactss to refresh
                // the contacts on the row 
                fetchContacts()

            })
            .catch(error => console.error(`There was an error creating the ${contact.firstName} error: ${error}`))


    }
    // Submit new contact
    const handleContactSubmit = () => {
        // Check if all fields are filled
        if (contact.firstName.length > 0 && contact.lastName.length > 0 && contact.email.length > 0) {
            // Create new contact
            handleContactCreate()

            console.info(`Contact ${contact.firstName} ${contact.lastName} added.`)

            // Reset all input fields
            handleInputsReset()
            handleToggleModal()
        }
    }

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
                firstName: contact.firstName,

            })
            .then(response => {
                const contactResponse = (response.data.contactData[0])
                // console.log(contactResponse)
                setSelectedContact(contactResponse)

            })
            .catch(error => console.error(`There was an error retrieving the contacts: ${error}`))


    }

    const editContactDb = (contact: contactDetails1) => {
        axios
            .put('http://localhost:4001/contacts/edit', {
                contact
            })
            .then(res => {
                // console.log(res.data)

                console.log(res.data)
                // Fetch all contactss to refresh
                // the contacts on the row 
                fetchContacts()

            })
            .catch(error => console.error(`There was an error creating the ${contact.firstName} error: ${error}`))


    }

    const handleEditContact = (e: React.MouseEvent<HTMLButtonElement>) => {


        setModalEdit(!modalEdit)
        // console.log(contact)
        console.log(selectedContact);

        editContactDb(selectedContact)


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

    const handleContactSearchById = (id: number) => {


        const contactToEdit = {
            id: id,
            firstName: "",
            lastName: '',
            email: '',
            age: 0,
            phoneNumber: "",
            avatar: "",
            link: "",
            tags: "",
        }

        return contactToEdit
    }
    const handleView = (id: number) => {
        handleGetContact(id)
        setViewInfo(!viewInfo)
        id !== 0 ? handleOpenEditModal(true, id) : handleOpenEditModal(false)
    }

    const handleOpenEditModal = (isOpened: boolean, contactId?: number) => {
        setModalEdit(isOpened)
        if (contactId) {
            const contactById = handleContactSearchById(contactId)
            setSelectedContact(contactById)
            console.log(selectedContact);
        }
    }

    const handleCloseModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log("Entering");
        setModalEdit(!modalEdit);
        setSelectedContact(contactDetails);

    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // let newValue = name === 'age' ? parseFloat(value) : value

        console.log({ selectedContact });

        setSelectedContact((selectedContact) => ({ ...selectedContact, [name]: value }))
        console.log({ selectedContact });

        console.log(e.target.value);

        console.log(e.target);


    }
    const handleOnSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setContact((prevState) => ({ ...prevState, [name]: value }))

    }
    // Reset all input fields
    const handleInputsReset = () => {

        setContact({ ...contactDetails })
    }

    const handleToggleModal = () => setModalAdd(!modalAdd);











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



    // type valuesToUpdateProps = {
    //     key: string, value: string | number
    // }
    //TODO Create type CONTACT
    // const handleSaveContactInfo = (valuesToUpdate: valuesToUpdateProps) => {

    //     const { key, value } = valuesToUpdate;
    //     setEditedContact((prevContact) => ({
    //         ...prevContact,
    //         [key]: value
    //     }));

    // }



    return (
        <div className="contact-list-wrapper">
            {/* Form for creating new contact */}
            {modalAdd ?
                <div className='backlash'>
                    <div className="contact-list-form" onSubmit={handleContactSubmit}>


                        <fieldset className='firstName'>
                            <label className="form-label" htmlFor="firstName">Enter first name:</label>
                            <input className="form-input" type="text" id="firstName" name="firstName"
                                onChange={handleOnChange} />
                        </fieldset>
                        <fieldset className='lastName'>
                            <label className="form-label" htmlFor="lastName">Enter last name:</label>
                            <input className="form-input" type="text" id="lastName" name="lastName"
                                onChange={handleOnChange} />
                        </fieldset>
                        <fieldset className='email'>
                            <label className="form-label" htmlFor="email">Enter email:</label>
                            <input className="form-input" type="text" id="email" name="email"
                                onChange={handleOnChange} />
                        </fieldset>
                        <fieldset className='phoneNumber'>
                            <label className="form-label" htmlFor="phoneNumber">Enter phone number:</label>

                            <input className="form-input" type="text" id="phoneNumber" name="phoneNumber"
                                onChange={handleOnChange} />
                        </fieldset>


                        <fieldset className='age'>
                            <label className="form-label" htmlFor="age">Enter age:</label>
                            <input className="form-input" type="text" id="age" name="age"
                                onChange={handleOnChange} />
                        </fieldset>
                        <fieldset className='link'>
                            <label className="form-label" htmlFor="link">Enter personal website:</label>
                            <input className="form-input" type="text" id="link" name="link"
                                onChange={handleOnChange} />
                        </fieldset>


                        <fieldset className='avatar'>
                            <label className="form-label" htmlFor="avatar">Enter avatar:</label>
                            <input className="form-input" type="text" id="avatar" name="avatar"
                                onChange={handleOnChange} />
                        </fieldset>


                        <fieldset className='tags'>
                            <label className="form-label" htmlFor="tags">Enter tags:</label>
                            <select className="form-input" id="tags" name="tags"
                                onChange={handleOnSelect}>
                                <option value="select">Tags: </option>
                                <option value="Family">Family</option>
                                <option value="Work">Work</option>
                                <option value="Personal">Personal</option>

                            </select>
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
            {!modalEdit &&
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
            {modalEdit ?
                (
                    <>


                        {selectedContact?.id &&

                            <ContactModalEdit selectedContact={selectedContact} handleCloseModal={handleCloseModal} handleEditContact={handleEditContact} handleOnChange={handleOnChange} />

                        }
                    </>
                ) :
                <ContactList contacts={contacts} loading={loading} handleContactRemove={handleContactRemove}
                    handleView={handleView} />
            }


        </div>

    )
}
