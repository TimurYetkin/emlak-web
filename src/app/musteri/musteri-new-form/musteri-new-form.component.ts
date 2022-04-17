import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-musteri-new-form',
  templateUrl: './musteri-new-form.component.html',
  styleUrls: ['./musteri-new-form.component.css'],
})
export class MusteriNewFormComponent {
  public formType: string = 'new';

  @ViewChild('formRef') formRef;
}
