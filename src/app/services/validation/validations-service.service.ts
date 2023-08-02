import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationsServiceService {

  constructor() { }

  //Method to validates password
  validatePassword(password: string): boolean {
    // This is the method to implement the  password strength validation.
    // We are checking if the password meets minimum requirements such as length, uppercase, lowercase, digits, special characters)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  //Method to validates email address
  validateEmail(email: string): boolean {
    // Use regular expression to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  //Method to validate date
  
}
