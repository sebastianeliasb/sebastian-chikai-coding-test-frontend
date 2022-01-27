// Import deps
import React from 'react';

// Creation of interface
interface ContactModalUI {
    position: number;
    contact: {
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
}

export const ContactModal = (props: ContactModalUI) => (

    <>

        <div> {props.contact.firstName}</div>
        <div>{props.contact.lastName}</div>
        <div>  {props.contact.email}</div>
        <div> {props.contact.age}</div>
        <div> {props.contact.phoneNumber}</div>
        <div> {props.contact.avatar}</div>
    </>

)