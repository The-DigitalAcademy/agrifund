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
   isNumber(value: any): boolean {
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
}
