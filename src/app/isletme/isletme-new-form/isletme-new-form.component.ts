import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-isletme-new-form',
  templateUrl: './isletme-new-form.component.html',
  styleUrls: ['./isletme-new-form.component.css'],
})
export class IsletmeNewFormComponent {
  public formType: string = 'new';

  @ViewChild('formRef') formRef;
}
