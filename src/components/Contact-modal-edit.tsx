
import React from 'react';

import avatar1 from "../assets/avatars/avatar1.png"
import avatar2 from "../assets/avatars/avatar2.png"



type contactModalEditUI = {

    selectedContact: {
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
    handleCloseEditModal: (e: React.MouseEvent<HTMLButtonElement>) => void
    handleEditContact: (e: React.MouseEvent<HTMLButtonElement>) => void
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleOnSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void

}


export const ContactModalEdit = ({ selectedContact, handleCloseEditModal, handleEditContact, handleOnChange, handleOnSelect }: contactModalEditUI) => {
    return (<div className="contact-list-wrapper" >


        <div className='backlash'>
            <div className="contact-list-form">

                <fieldset className='firstName'>
                    <label className="form-label" htmlFor="firstName">Enter first name:</label>
                    <input className="form-input" type="text" id="firstName" name="firstName" defaultValue={selectedContact.firstName} onChange={handleOnChange} />
                </fieldset>
                <fieldset className='lastName'>
                    <label className="form-label" htmlFor="lastName">Enter last name:</label>
                    <input className="form-input" type="text" id="lastName" name="lastName" defaultValue={selectedContact.lastName} onChange={handleOnChange} />
                </fieldset>
                <fieldset className='email'>
                    <label className="form-label" htmlFor="email">Enter email:</label>
                    <input className="form-input" type="text" id="email" name="email" defaultValue={selectedContact.email} onChange={handleOnChange} />
                </fieldset>
                <fieldset className='phoneNumber'>
                    <label className="form-label" htmlFor="phoneNumber">Enter phone number:</label>
                    <input className="form-input" type="text" id="phoneNumber" name="phoneNumber" defaultValue={selectedContact.phoneNumber} onChange={handleOnChange} />
                </fieldset>


                <fieldset className='age'>
                    <label className="form-label" htmlFor="age">Enter age:</label>
                    <input className="form-input age-input" type="number" id="age" name="age" value={selectedContact.age} onChange={handleOnChange} />
                </fieldset>
                <fieldset className='link'>
                    <label className="form-label" htmlFor="link">Enter personal website:</label>
                    <input className="form-input" type="text" id="link" name="link" defaultValue={selectedContact.link} onChange={handleOnChange} />
                </fieldset>

                <fieldset className='avatar'>
                    <label className="form-label" htmlFor="avatar">Enter avatar:</label>
                    <div>
                        <label className="avatars">
                            <input type="radio" checked={selectedContact.avatar === "avatar1" ? true : false} name="avatar" value="avatar1" onChange={handleOnChange} id="avatar" />
                            <img src={avatar1} alt='avatar' style={{ height: 50, width: 50 }} ></img>
                        </label>
                        <label className="avatars">
                            <input type="radio" checked={selectedContact.avatar === "avatar2" ? true : false} name="avatar" value="avatar2" id="avatar" onChange={handleOnChange} />
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
                    <button className="btn btn-add" onClick={handleEditContact}>Save</button>
                </div>
                <div className='close-modal-wrapper close'>
                    <button onClick={handleCloseEditModal} className="btn btn-close">Close</button>
                </div>




            </div>
        </div>
    </div >

    )
}














