import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-enabledform-farm-info',
  templateUrl: './enabledform-farm-info.component.html',
  styleUrls: ['./enabledform-farm-info.component.css']
})
export class EnabledformFarmInfoComponent {


  @Output() enableFields = new EventEmitter<void>();

  onEditClicked() {
    this.enableFields.emit();
  }
}
