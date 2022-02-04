import React from 'react';
import avatar1 from "../assets/avatars/avatar1.png"
import avatar2 from "../assets/avatars/avatar2.png"

interface ContactsListRowUI {
    position: number;
    contact: {
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
    handleView: (id: number, firstName: string) => void;
    handleContactRemove: (id: number, firstName: string) => void;

}

export const ContactsListRow = (props: ContactsListRowUI) => (
    <tr className="table-row" >


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
        <td className="table-item" >
            <img src={props.contact.avatar === "avatar1" ? avatar1 : avatar2} alt="avatar" />
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
                onClick={() => props.handleView(props.contact.id, props.contact.firstName)}
            >
            </div>
        </td >
    </tr >

)

