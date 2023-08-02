import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationsServiceService {

  constructor() { }

// Custom password validator function
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValidPassword = this.validatePassword(control.value);
      return isValidPassword ? null : { invalidPassword: true };
    };
  }
  //Method to validates password
  // We are checking if the password meets minimum requirements such as length, uppercase, lowercase, digits, special characters)
  validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

// Custom email validator function
   emailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isValidEmail = this.validateEmail(control.value);
    return isValidEmail ? null : { invalidEmail: true };
  };
}
  //Method to validates email address
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  //Custom date validator function
  dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValidDate = this.validateDateFormat(control.value);
      return isValidDate ? null : { invalidDate: true };
    };
  }
  //Method to validate date
  //It checks if the date is in the format of 'YYYY/MM/DD'.
  validateDateFormat(date: string): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date);
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
 

// Custom phone number validator function
  phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValidPhoneNumber = this.validatePhoneNumber(control.value);
      return isValidPhoneNumber ? null : { invalidPhoneNumber: true };
    };
  }
  validatePhoneNumber(phoneNumber: string): boolean {
    const phoneRegex = /^(\+27|0)\d{9}$/;
    return phoneRegex.test(phoneNumber);
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


    //Method to validate address to ensure the it's not an empty field
    isAddressNotEmpty(address: any): boolean {
      // Check if all address fields (street, city, state, and zip) are not empty
      return !!address?.street && !!address?.city && !!address?.state && !!address?.zip;
    }
  
  
}
