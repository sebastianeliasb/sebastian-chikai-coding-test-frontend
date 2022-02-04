import React from 'react';
import { ContactModalEdit } from "./Contact-modal-edit"

interface ContactViewUI {
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

interface Contact {
    contacts: ContactViewUI[];
    loading: boolean;
    handleCloseEditModal: (e: React.MouseEvent<HTMLButtonElement>) => void
    handleEditContact: (e: React.MouseEvent<HTMLButtonElement>) => void
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleOnSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void




}


export const ContactView = (props: Contact) => {
    if (props.loading) return <p>Contacts are loading...</p>
    return (
        <>
            {

                props.contacts.length > 0 ? (
                    props.contacts.map((contact: ContactViewUI, idx) => (

                        <ContactModalEdit
                            handleOnSelect={props.handleOnSelect}
                            handleOnChange={props.handleOnChange}
                            handleCloseEditModal={props.handleCloseEditModal}
                            handleEditContact={props.handleEditContact}
                            key={contact.id}
                            selectedContact={contact}


                        />

                    )

                    )
                ) : null

            }
        </>

    )
}