import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-about-the-farm',
  templateUrl: './about-the-farm.component.html',
  styleUrls: ['./about-the-farm.component.css']
})
export class AboutTheFarmComponent {
  formSlides = [
    {
      formGroup: this.fb.group({
        name: ['', Validators.required],
        // Add more form controls specific to the first slide
      })
    },
    {
      formGroup: this.fb.group({
        age: ['', Validators.required],
        // Add more form controls specific to the second slide
      })
    },
    // Add more form slides as needed
  ];

  constructor(private fb: FormBuilder) {}

  onSubmit(formGroup: FormGroup) {
    if (formGroup.valid) {
      // Handle form submission
      const formData = formGroup.value;
      console.log(formData);
    }
  }
}

