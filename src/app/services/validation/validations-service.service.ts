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
  
  //Custom positive number validator function
  positiveNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValidPositiveNumber = this.validatePositiveNumber(control.value);
      return isValidPositiveNumber ? null : { invalidPositiveNumber: true };
    };
  }

  //Method to validate numbers
   // The method below to checks if a number is positive.
   validatePositiveNumber(value: number): boolean {
    return value > 0;
  }

  // Custom isNumeric validator function
  isNumericValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValidNumeric = this.isNumeric(control.value);
      return isValidNumeric ? null : { invalidNumeric: true };
    };
  }

    //This method below only accepts numbers
   isNumeric(value: any): boolean {
    if (typeof value === 'number') {
      // Check if the value is a valid number (not NaN)
      return !isNaN(value);
    } else if (typeof value === 'string') {
      // Convert the string to a number and check if it's a valid number (not NaN)
      const numericValue = Number(value);
      return !isNaN(numericValue);
    } else {
      // Not a number or a string, so it's not valid
      return false;
    }
  }
 
  //Custom ID number validators function
  idNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValidID = this.validateIDno(control.value);
      return isValidID ? null : { invalidID: true };
    };
  }
  //Method to validate ID number
  validateIDno(id: string): boolean {
    const idRegex = /^\d{13}$/;
    return idRegex.test(id);
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
