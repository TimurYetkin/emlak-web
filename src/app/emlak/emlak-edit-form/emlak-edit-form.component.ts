import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmlakService } from 'src/app/service/emlak.service';
import { MusteriService } from 'src/app/service/musteri.service';
import { PopupService } from 'src/app/service/popup.service';

@Component({
  selector: 'app-emlak-edit-form',
  templateUrl: './emlak-edit-form.component.html',
  styleUrls: ['./emlak-edit-form.component.css'],
})
export class EmlakEditFormComponent {
  public formType: string = 'edit';
  public formData: any;
  private emlakId: number;
  private routingSubscription: Subscription;
  @ViewChild('formRef') formRef;

  constructor(
    private route: ActivatedRoute,
    private emlakService: EmlakService,
    private popupService: PopupService
  ) {
    this.routingSubscription = this.route.params.subscribe((params: any) => {
      this.emlakId = +params.id;
      this.getData();
    });
  }

  private getData() {
    this.emlakService.getEmlak(this.emlakId).subscribe(
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
