// Import deps
import React from 'react';

// Import components
import { ContactModal } from "./Contact-modal"

interface ContactViewUI {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    age: string;
    phoneNumber: string;
    avatar: string;
    link: string;
    tags: string;
}
interface Contact {
    contacts: ContactViewUI[];
    loading: boolean;

}


export const ContactView = (props: Contact) => {
    // Show loading message
    if (props.loading) return <p>Contacts are loading...</p>
    return (
        <>
            <div>
                Unique Contact
            </div>
            <div>
                {

                    props.contacts.length > 0 ? (
                        props.contacts.map((contact: ContactViewUI, idx) => (

                            <ContactModal
                                key={contact.id}
                                contact={contact}
                                position={idx}


                            />

                        )

                        )
                    ) : null

                }
            </div>

        </>

    )
}