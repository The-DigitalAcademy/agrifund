import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationsServiceService {

  constructor() { }

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

      if (value.length < minLength || !hasUppercase || !hasLowercase || !hasNumbers) {
        return { invalidPassword: true };
      }

      return null;
    };
  }
  emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
      const idNumberPattern = /^\d{12}$/;

      if (idNumberPattern.test(value)) {
        return null; // Return null if the ID number matches the pattern
      }

      return { idNumber: true }; // Return validation error
    };
  }

 

  phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phoneNumberRegex = /^\d{10}$/;
      if (!phoneNumberRegex.test(control.value)) {
        return { invalidPhoneNumber: true };
      }
      return null;
    };
  }
 
  
  //Custom dropdown selection validator function
  dropdownSelectionValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValidSelection = this.validateDropdownSelection(control.value);
      return isValidSelection ? null : { invalidDropdownSelection: true };
    };
  }

    // Method to validate a dropdown selection (not empty)
    validateDropdownSelection(value: any): boolean {
      return value !== null && value !== undefined && value !== '';
    }  

// Custom validator function for validating text without numbers
textWithoutNumbersValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValidText = this.validateTextWithoutNumbers(control.value);
    return isValidText ? null : { containsNumbers: true };
  };
}

    // Method to validate text and not accept numbers
    validateTextWithoutNumbers(text: string): boolean {
      const containsNumbers = /\d/.test(text); // Check if the text contains any numeric character
      return !containsNumbers;
    }

// Custom validator function for validating a non-empty address
addressNotEmptyValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValidAddress = this.isAddressNotEmpty(control.value);
    return isValidAddress ? null : { addressEmpty: true };
  };
}
    //Method to validate address to ensure the it's not an empty field
    isAddressNotEmpty(address: any): boolean {
      // Check if all address fields (street, city, state, and zip) are not empty
      return !!address?.street && !!address?.city && !!address?.state && !!address?.zip;
    }
  
  
}
