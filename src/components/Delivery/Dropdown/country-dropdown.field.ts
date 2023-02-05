export const personDetails = [
    {
        id: 1,
        name: "name",
        type: "text",
        placeholder: "Name",
        label: "Name",
        pattern: "^[A-Za-z0-9]{2,32}$",
        required: true,
    },
    {
        id: 2,
        name: "surname",
        type: "text",
        placeholder: "Surname",
        label: "Surname",
        pattern: "^[A-Za-z0-9]{2,64}$",
        required: true,
    },
    {
        id: 3,
        name: "email",
        type: "email",
        placeholder: "Email",
        errorMessage: "It should be a valid email address!",
        label: "Email",
        required: true,
    },
    {
        id: 4,
        name: "mobile",
        type: "text",
        placeholder: "Number",
        errorMessage: "It should be a valid number!",
        label: "Number",
        pattern: "^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$",
        required: true,
    }
];

export const countriesDropDown = {
    id: 4,
    name: "country",
    placeholder: "Select country",
    label: "Country",
    required: true,
}

export const deliveryAddress = [
    {
        id: 5,
        name: "place",
        type: "text",
        placeholder: "Place",
        label: "Place",
        required: true,
    },
    {
        id: 6,
        name: "address",
        type: "text",
        placeholder: "Address",
        label: "Address",
        required: true,
    },
];
