// Import deps
import React from 'react';

// Creation of interface
type contactModalEditUI = {
    // position: number;
    selectedContact: {
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
    handleCloseModal: (e: React.MouseEvent<HTMLButtonElement>) => void
    handleEditContact: (e: React.MouseEvent<HTMLButtonElement>) => void
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    // handleSaveContactInfo: (editedContact) => void
}


export const ContactModalEdit = ({ selectedContact, handleCloseModal, handleEditContact, handleOnChange }: contactModalEditUI) => {
    return (<div className="contact-list-wrapper" >


        <div className='backlash'>
            <div className="contact-list-form">

                {/* onChange={(e) => handleSaveContactInfo({ key: selectedContact.firstName, value: e.target.value })} */}
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
                    <input className="form-input" type="number" id="age" name="age" value={selectedContact.age} onChange={handleOnChange} />
                </fieldset>
                <fieldset className='link'>
                    <label className="form-label" htmlFor="link">Enter personal website:</label>
                    <input className="form-input" type="text" id="link" name="link" defaultValue={selectedContact.link} onChange={handleOnChange} />
                </fieldset>


                <fieldset className='avatar'>
                    <label className="form-label" htmlFor="avatar">Enter avatar:</label>
                    <input className="form-input" type="text" id="avatar" name="avatar" defaultValue={selectedContact.avatar} onChange={handleOnChange} />
                </fieldset>


                <fieldset className='tags'>
                    <label className="form-label" htmlFor="tags">Enter tags:</label>
                    <input className="form-input" type="text" id="tags" name="tags" defaultValue={selectedContact.tags} onChange={handleOnChange} />
                </fieldset>
                <div className='add-btn-wrapper add'>
                    <button className="btn btn-add" onClick={handleEditContact}>Save</button>
                </div>
                <div className='close-modal-wrapper close'>
                    <button onClick={handleCloseModal} className="btn btn-close">Close</button>
                </div>




            </div>
        </div>
    </div >

    )
}














