// login.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private userService: UserService) {}

  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      const loginInfo = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      };

      this.userService.login(loginInfo).subscribe(
        (response) => {
          // Assuming the API returns a token upon successful login
          const token = response.token;
          this.userService.storeAuthToken(token);
          // Handle successful login, navigate to the appropriate page, etc.
        },
        (error) => {
          // Handle login error (e.g., show error message)
          console.error('Login Error:', error);
        }
      );
    }
  }
}
