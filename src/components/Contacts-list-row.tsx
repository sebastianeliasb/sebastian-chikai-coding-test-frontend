// Import deps
import React from 'react';

// Creation of interface
interface ContactsListRowUI {
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
    handleView: (id: number) => void;
    handleContactRemove: (id: number, firstName: string) => void;
}

export const ContactsListRow = (props: ContactsListRowUI) => (
    <tr className="table-row" onClick={() => props.handleView(props.contact.id)}>
        {/* <td className="table-item">
            {props.position}
        </td> */}

        <td className="table-item">
            {props.contact.firstName}
        </td>

        <td className="table-item">
            {props.contact.lastName}
        </td>

        <td className="table-item">
            {props.contact.email}
        </td>

        <td className="table-item">
            {props.contact.age}
        </td>
        <td className="table-item">
            {props.contact.phoneNumber}
        </td>
        <td className="table-item">
            {props.contact.avatar}
        </td>
        <td className="table-item">
            {props.contact.link}
        </td>
        <td className="table-item">
            {props.contact.tags}
        </td>


        <td className="table-item option">
            <div className="btn-remove"
                onClick={() => props.handleContactRemove(props.contact.id, props.contact.firstName)}>

            </div>
            <div className="btn-edit"
            >
            </div>
        </td >
    </tr >

)

