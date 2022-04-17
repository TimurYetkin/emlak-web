import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusteriService } from 'src/app/service/musteri.service';
import { PopupService } from 'src/app/service/popup.service';

@Component({
  selector: 'app-musteri-edit-form',
  templateUrl: './musteri-edit-form.component.html',
  styleUrls: ['./musteri-edit-form.component.css'],
})
export class MusteriEditFormComponent {
  public formType: string = 'edit';
  public formData: any;
  private musteriId: number;
  private routingSubscription: Subscription;
  @ViewChild('formRef') formRef;

  constructor(
    private route: ActivatedRoute,
    private musteriService: MusteriService,
    private popupService: PopupService
  ) {
    this.routingSubscription = this.route.params.subscribe((params: any) => {
      this.musteriId = +params.id;
      this.getData();
    });
  }

  private getData() {
    this.musteriService.getMusteri(this.musteriId).subscribe(
      (res: any) => {
        this.formData = res;
      },
      (err) => {
        this.popupService.showErrorMessage(err.error, undefined);
        this.formData = {};
      }
    );
  }
}
