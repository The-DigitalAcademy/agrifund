 /* --------------------------------
      Created by Nkadimeng Kamogelo
    ---------------------------------*/
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProgressService } from 'src/app/services/portfolio/progress.service';

@Component({
    selector: 'app-enableform-crop-info',
    templateUrl: './edit-all-form.component.html',
    styleUrls: ['./edit-all-form.component.css'],
})
export class EnableformCropInfoComponent {
    // Declare Output properties to emit events
    @Output() enableFields = new EventEmitter<void>();
    @Output() saveData = new EventEmitter<any>();
    @Output() cancelData = new EventEmitter<any>();
    
    myForm!: FormGroup;

    constructor(private progressService: ProgressService) {}

    // Emit the enableFields event when "Edit" is clicked
    onEditClicked() {
        this.enableFields.emit();
       
    }

    // Emit the saveData event with myForm value when "Save" is clicked
    onSaveClicked() {
        this.saveData.emit(this.myForm.value);
    }

    // Emit the cancelData event with myForm value when "Cancel" is clicked
    onCancelClicked() {
        this.cancelData.emit(this.myForm.value);
    }
}
