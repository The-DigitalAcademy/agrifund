import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-enableform-crop-info',
  templateUrl: './enableform-crop-info.component.html',
  styleUrls: ['./enableform-crop-info.component.css']
})
export class EnableformCropInfoComponent {
  @Output() enableFields = new EventEmitter<void>();

  onEditClicked() {
    this.enableFields.emit();
  }

}
