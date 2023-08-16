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
        
       
      })
    },
    {
      formGroup: this.fb.group({
        age: ['', Validators.required],
        location: ['', Validators.required],
        ID: ['', Validators.required],
        size:['', Validators.required],
        number:['', Validators.required],
        funding:['', Validators.required],
      })
    },
    {
      formGroup: this.fb.group({
        farmLocation: ['', Validators.required],
        farmSize: ['', Validators.required],
        date: ['', Validators.required],
       
      })
    },
    {
      formGroup: this.fb.group({
       seasonFarm: ['', Validators.required],
       cropType: ['', Validators.required],
        type: ['', Validators.required],
       
      })
    },
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

