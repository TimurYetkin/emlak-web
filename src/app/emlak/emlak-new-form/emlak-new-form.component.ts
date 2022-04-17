import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-emlak-new-form',
  templateUrl: './emlak-new-form.component.html',
  styleUrls: ['./emlak-new-form.component.css'],
})
export class EmlakNewFormComponent {
  public formType: string = 'new';

  @ViewChild('formRef') formRef;
}
