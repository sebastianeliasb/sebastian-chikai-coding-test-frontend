import React from 'react';

import { ContactsListRow } from "./Contacts-list-row"

import "./style/contacts-list/style.scss"

interface ContactUI {
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

interface ContactListUI {
    contacts: ContactUI[];
    loading: boolean;
    handleView: (id: number, firstName: string) => void;
    handleContactRemove: (id: number, firstName: string) => void;

}

export const ContactList = (props: ContactListUI) => {
    if (props.loading) return <p>Contacts are loading...</p>

    return (
        <table className="table">
            <thead>
                <tr>


                    <th className="table-head-item">First Name</th>

                    <th className="table-head-item">Last Name</th>

                    <th className="table-head-item">Email</th>

                    <th className="table-head-item">Age</th>

                    <th className="table-head-item">Phone Number</th>

                    <th className="table-head-item">Avatar</th>

                    <th className="table-head-item">Personal Website</th>

                    <th className="table-head-item">Tags</th>
                    <th className="table-head-item"></th>


                </tr>
            </thead >

            <tbody className="table-body" >
                {
                    props.contacts.length > 0 ? (
                        props.contacts.map((contact: ContactUI, idx) => (

                            <ContactsListRow
                                key={contact.id}
                                contact={contact}
                                position={idx + 1}
                                handleContactRemove={props.handleContactRemove}

                                handleView={props.handleView}
                            />
                        )
                        )
                    ) : (
                        <tr className="table-row info">
                            <td className="table-item " style={{ textAlign: 'center' }} colSpan={6}>There are no contacts to show. Create one!</td>
                        </tr>
                    )
                }
            </tbody >
        </table >
    )
}