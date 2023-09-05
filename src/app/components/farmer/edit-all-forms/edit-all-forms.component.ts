import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-edit-all-forms',
    templateUrl: './edit-all-forms.component.html',
    styleUrls: ['./edit-all-forms.component.css'],
})
export class EditAllFormsComponent {
    @Output() enableFields = new EventEmitter<void>();
    @Output() saveData = new EventEmitter<any>();
    @Output() cancelData = new EventEmitter<any>();
    myForm!: FormGroup;

    onEditClicked() {
        this.enableFields.emit();
    }

    onSaveClicked() {
        this.saveData.emit(this.myForm.value);
    }

    onCancelClicked() {
        this.cancelData.emit(this.myForm.value);
    }
}
