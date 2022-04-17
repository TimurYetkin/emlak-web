import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IsletmeService } from 'src/app/service/isletme.service';
import { PopupService } from 'src/app/service/popup.service';

@Component({
  selector: 'app-isletme-edit-form',
  templateUrl: './isletme-edit-form.component.html',
  styleUrls: ['./isletme-edit-form.component.css'],
})
export class IsletmeEditFormComponent {
  public formType: string = 'edit';
  public formData: any;
  private isletmeId: number;
  private routingSubscription: Subscription;
  @ViewChild('formRef') formRef;

  constructor(
    private route: ActivatedRoute,
    private isletmeService: IsletmeService,
    private popupService: PopupService
  ) {
    this.routingSubscription = this.route.params.subscribe((params: any) => {
      this.isletmeId = +params.id;
      this.getData();
    });
  }

  private getData() {
    this.isletmeService.getIsletme(this.isletmeId).subscribe(
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
