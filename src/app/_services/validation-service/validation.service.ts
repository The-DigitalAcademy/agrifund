import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class ValidationService {
    constructor() {}

    passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password')?.value;
        const cpassword = control.get('cpassword')?.value;

        if (password !== cpassword) {
            return { passwordsMatch: true };
        }

        return null;
    }

    passwordValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (!value) {
                return null; // Return null if the field is empty (optional validation)
            }

            // Check for password requirements here (e.g., minimum length, uppercase, lowercase, and numbers)
            const minLength = 8;
            const hasUppercase = /[A-Z]/.test(value);
            const hasLowercase = /[a-z]/.test(value);
            const hasNumbers = /\d/.test(value);

            if (
                value.length < minLength ||
                !hasUppercase ||
                !hasLowercase ||
                !hasNumbers
            ) {
                return { invalidPassword: true };
            }

            return null;
        };
    }
    emailValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const emailRegex =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(control.value)) {
                return { invalidEmail: true };
            }
            return null;
        };
    }

    //Custom date validator function
    dateValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(control.value)) {
                return { invalidDate: true };
            }
            return null;
        };
    }

    positiveNumberValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;

            if (value === null || value === undefined || value === '') {
                return null; // Return null for optional fields
            }

            // Convert value to a number and check if it is a positive number
            const numValue = parseFloat(value);
            if (!isNaN(numValue) && numValue >= 0) {
                return null; // Return null if it's a positive number
            }

            return { invalidPositiveNumber: true }; // Return validation error
        };
    }

    isNumericValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;

            if (value === null || value === undefined || value === '') {
                return null; // Return null for optional fields
            }

            // Use a regular expression to check if the value contains only numeric characters
            if (/^\d+$/.test(value)) {
                return null; // Return null if it contains only numeric characters
            }

            return { isNumeric: true }; // Return validation error
        };
    }

    idNumberValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;

            if (value === null || value === undefined || value === '') {
                return null; // Return null for optional fields
            }

            // Define the ID number pattern that you want to enforce (e.g., 12 digits)
            const idNumberPattern = /^\d{13}$/;

            if (idNumberPattern.test(value)) {
                return null; // Return null if the ID number matches the pattern
            }

            return { idNumber: true }; // Return validation error
        };
    }

    // phoneNumberValidator(): ValidatorFn {
    //   return (control: AbstractControl): ValidationErrors | null => {
    //     const phoneNumberRegex = /^(\+27|0)\d{9}$/;
    //     if (!phoneNumberRegex.test(control.value)) {
    //       return { invalidPhoneNumber: true };
    //     }
    //     return null;
    //   };
    // }
    phoneNumberValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const phoneNumberRegex = /^\+27\d{9}$/;
            if (!phoneNumberRegex.test(control.value)) {
                return { invalidPhoneNumber: true };
            }
            return null;
        };
    }

    dropdownSelectionValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;

            if (value !== null && value !== undefined) {
                return null; // Return null if the dropdown selection is not empty
            }

            return { dropdownSelection: true }; // Return validation error
        };
    }

    textWithoutNumbersValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;

            if (value === null || value === '') {
                return null; // Return null if the input is empty
            }

            // Use regular expression to check if the input contains any digits (numbers)
            const containsNumbers = /\d/.test(value);

            if (containsNumbers) {
                return { textWithoutNumbers: true }; // Return validation error if the input contains numbers
            }

            return null; // Return null if the input does not contain numbers
        };
    }

    addressContainsStreetValidator(
        control: AbstractControl
    ): ValidationErrors | null {
        const address = control.value as string;

        if (!address.includes('Street')) {
            return { addressContainsStreet: true };
        }

        return null;
    }
    fileTypeValidator(allowedTypes: string[]): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const file = control.value as File;

            if (!file) {
                // If no file is selected, consider it valid
                return null;
            }

            // Get the file extension from the file name
            const fileNameParts = file.name.split('.');
            const fileExtension = fileNameParts[fileNameParts.length - 1];

            // Convert the allowed MIME types to extensions for broader compatibility
            const allowedExtensions = allowedTypes.map(
                type => type.split('/')[1]
            );

            if (!allowedExtensions.includes(fileExtension)) {
                return { invalidFileType: true };
            }

            return null;
        };
    }
}
