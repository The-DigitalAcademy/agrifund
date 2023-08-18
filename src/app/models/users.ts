/* ------------------------------------------------------------------------------------------------
    AUTHOR: Ntokozo Radebe
    CREATE DATE: 24 Jul 2023
    UPDATED DATE: 17 Aug 2023 

    DESCRIPTION:
     Define an interface to represent user data

-------------------------------------------------------------------------------------------------*/

export interface Users {
    // userId
    id: number;
    // User's first name
    firstName: string;

    // User's last name
    lastName: string;

    // User's email address
    email: string;

    // User's cell phone number
    cellNumber: number;

    // User's password
    password: string;

    // User's ID number
    idNumber: string;
}
