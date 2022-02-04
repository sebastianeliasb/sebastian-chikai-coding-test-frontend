
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    handleError
} from '../errorHandling/errorHandling'



import { ContactList } from './Contacts-list'
import { ContactModalEdit } from './Contact-modal-edit'

import "./style/contacts-dashboard/style.scss"

import avatar1 from "../assets/avatars/avatar1.png"
import avatar2 from "../assets/avatars/avatar2.png"

type ContactInfo = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    phoneNumber: string;
    avatar: string
    link: string;
    tags: string;
}

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


    const [contact, setContact] = useState(contactDetails)
    const [selectedContact, setSelectedContact] = useState<ContactInfo>(contactDetails)
    const [modalAdd, setModalAdd] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [contacts, setContacts] = useState([])
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
        axios
            .post('http://localhost:4001/contacts/create', {
                firstName: selectedContact.firstName,
                lastName: selectedContact.lastName,
                email: selectedContact.email,
                age: selectedContact.age,
                phoneNumber: selectedContact.phoneNumber,
                avatar: selectedContact.avatar,
                link: selectedContact.link,
                tags: selectedContact.tags
            })
            .then(res => {
                handleError.successCreate()
                fetchContacts()

            })
            .catch(error => handleError.errorCreate())
    }


    const handleContactSubmit = () => {

        if (selectedContact.firstName.length > 0 && selectedContact.email.length > 0
            && selectedContact.phoneNumber.length > 0 && selectedContact.avatar.length > 0 && selectedContact.age > 0) {
            handleContactCreate()
            handleInputsReset()
            handleToggleModal()
        } else {
            handleError.errorSchema()
        }

    }

    const fetchContacts = async () => {
        axios
            .get('http://localhost:4001/contacts/all')
            .then(response => {
                setContacts(response.data)


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
                setSelectedContact(contactResponse)

            })
            .catch(error => console.error(`There was an error retrieving the contacts: ${error}`))


    }

    const handleEditContactDb = (contact: ContactInfo) => {
        axios
            .put('http://localhost:4001/contacts/edit', {
                contact
            })
            .then(res => {
                handleError.sucessEdit()
                console.log(res.data)
                fetchContacts()

            })
            .catch(error => handleError.errorEdit())

    }

    const handleEditContact = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (selectedContact.firstName.length > 0 && selectedContact.email.length > 0 && selectedContact.phoneNumber.length > 0
            && selectedContact.avatar.length > 0 && selectedContact.age > 0) {
            setModalEdit(!modalEdit)
            handleEditContactDb(selectedContact)


        }
        else {
            handleError.errorSchema()
        }

    }


    const handleContactRemove = (id: number, firstName: string) => {
        axios
            .put('http://localhost:4001/contacts/delete', { id: id })
            .then((response) => {
                handleError.successDelete()

                fetchContacts()
            })
            .catch(error => handleError.errorDelete())
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

    const handleCloseEditModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log("Entering");
        setModalEdit(!modalEdit);
        setSelectedContact(contactDetails);

    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;
        setSelectedContact((selectedContact) => ({ ...selectedContact, [name]: value }))

    }
    const handleOnSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSelectedContact((selectedContact) => ({ ...selectedContact, [name]: value }))
    }
    const handleInputsReset = () => {

        setContact({ ...contactDetails })
    }

    const handleToggleModal = () => {
        setModalAdd(!modalAdd)
        setSelectedContact({ ...contactDetails })

    };

    const handleListReset = () => {
        axios.put('http://localhost:4001/contacts/reset')
            .then(() => {
                fetchContacts()
            })
            .catch(error => console.error(`There was an error resetting the contact list: ${error}`))
    }




    return (
        <div className="contact-list-wrapper">
            {modalAdd ?
                <div className='backlash'>
                    <div className="contact-list-form" onSubmit={handleContactSubmit}>


                        <fieldset className='firstName'>
                            <label className="form-label" htmlFor="firstName">Enter first name*:</label>
                            <input className="form-input" type="text" id="firstName" name="firstName"
                                onChange={handleOnChange} />


                        </fieldset>
                        <fieldset className='lastName'>
                            <label className="form-label" htmlFor="lastName">Enter last name:</label>
                            <input className="form-input" type="text" id="lastName" name="lastName"
                                onChange={handleOnChange} />
                        </fieldset>
                        <fieldset className='email'>
                            <label className="form-label" htmlFor="email">Enter email*:</label>
                            <input className="form-input" type="text" id="email" name="email"
                                onChange={handleOnChange} />
                        </fieldset>
                        <fieldset className='phoneNumber'>
                            <label className="form-label" htmlFor="phoneNumber">Enter phone number*:</label>

                            <input className="form-input" type="text" id="phoneNumber" name="phoneNumber"
                                onChange={handleOnChange} />
                        </fieldset>


                        <fieldset className='age'>
                            <label className="form-label" htmlFor="age">Enter age*:</label>
                            <input className="form-input age-input" type="number" id="age" name="age"
                                onChange={handleOnChange} />
                        </fieldset>
                        <fieldset className='link'>
                            <label className="form-label" htmlFor="link">Enter personal website:</label>
                            <input className="form-input" type="text" id="link" name="link"
                                onChange={handleOnChange} />
                        </fieldset>


                        <fieldset className='avatar'>
                            <label className="form-label" htmlFor="avatar">Choose avatar*:</label>
                            <div>
                                <label className="avatars">
                                    <input type="radio" name="avatar" value="avatar1" onChange={handleOnChange} id="avatar" />
                                    <img src={avatar1} alt='avatar' style={{ height: 50, width: 50 }} ></img>
                                </label>
                                <label className="avatars">
                                    <input type="radio" name="avatar" value="avatar2" id="avatar" onChange={handleOnChange} />
                                    <img src={avatar2} alt='avatar' style={{ height: 50, width: 50 }} ></img>
                                </label>
                            </div>

                        </fieldset>
                        <fieldset className='tags'>
                            <label className="form-label" htmlFor="tags">Enter tags:</label>
                            <select className="form-select" id="tags" name="tags"
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
                        <p>* Requiered Fields</p>
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
                                <button className="btn btn-reset" onClick={handleListReset}>Delete all contacts</button>
                            </div>

                        )

                    }
                </div>
            }


            {modalEdit ?
                (
                    <>


                        {selectedContact?.id &&

                            <ContactModalEdit selectedContact={selectedContact} handleCloseEditModal={handleCloseEditModal} handleEditContact={handleEditContact} handleOnChange={handleOnChange} handleOnSelect={handleOnSelect} />

                        }
                    </>
                ) :
                <ContactList contacts={contacts} loading={loading} handleContactRemove={handleContactRemove}
                    handleView={handleView} />
            }


        </div>


    )
}
