import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationsServiceService {

  constructor() { }

  //Method to validates password
  validatePassword(password: string): boolean {
    // We are checking if the password meets minimum requirements such as length, uppercase, lowercase, digits, special characters)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  //Method to validates email address
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  //Method to validate date
  //It checks if the date is in the format of 'YYYY/MM/DD'.
  validateDateFormat(date: string): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    return dateRegex.test(date);
  }
  
  //Method to validate numbers
   // The method below to checks if a number is positive.
   validatePositiveNumber(value: number): boolean {
    return value > 0;
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
 
  //Method to validate ID number
  //It contains only digits
  //South African ID contains 13 digits
  validateIDno(id: string): boolean {
    const idRegex = /^\d{13}$/;
    return idRegex.test(id);
  }
 
   // Method to validate a phone number (10 digits)
   validatePhoneNumber(phoneNumber: string): boolean {
    // Remove any non-numeric characters (e.g., whitespace, dashes, parentheses)
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
    // Checks if the cleaned phone number is exactly 10 digits long
    return cleanedPhoneNumber.length === 10;
  }

    // Method to validate a dropdown selection (not empty)
    validateDropdownSelection(value: any): boolean {
      return value !== null && value !== undefined && value !== '';
    }  

    // Method to validate text and not accept numbers
    validateTextWithoutNumbers(text: string): boolean {
      const containsNumbers = /\d/.test(text); // Check if the text contains any numeric character
      return !containsNumbers;
    }

}
