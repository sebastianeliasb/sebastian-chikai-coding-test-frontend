// Import deps
import React from 'react';

// Import components
import { ContactModalEdit } from "./Contact-modal-edit"

interface ContactViewUI {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    phoneNumber: string;
    avatar: string;
    link: string;
    tags: string;

}

interface Contact {
    contacts: ContactViewUI[];
    loading: boolean;
    handleCloseModal: (e: React.MouseEvent<HTMLButtonElement>) => void


}


export const ContactView = (props: Contact) => {
    // Show loading message
    if (props.loading) return <p>Contacts are loading...</p>
    return (
        <>
            {

                props.contacts.length > 0 ? (
                    props.contacts.map((contact: ContactViewUI, idx) => (

                        <ContactModalEdit
                            handleCloseModal={props.handleCloseModal}
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