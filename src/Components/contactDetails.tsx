import { Component, createSignal, Show, createResource, Match, Switch } from "solid-js";


interface ContactDetailsProps {
    userId: number;
}

interface IContactDetails {
    Id: number;
    Email: string;
    PhoneNumber: string;
    LinkedInUrl: string;
}

export const ContactDetails: Component<ContactDetailsProps> = (props) => {
    const [contactInfo] = createResource(props.userId, fetchContactDetails);

    // TODO - Implement fetching from backend
    async function fetchContactDetails(id: number) {

        const contact: IContactDetails = {
            Id: 2,
            Email: "Test",
            PhoneNumber: "212",
            LinkedInUrl: ""
        }

        return contact
    }

    return (
        <>
            <div>
                
            </div>
        </>
    )
}