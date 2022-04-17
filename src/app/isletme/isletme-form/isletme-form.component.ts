import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IsletmeService } from 'src/app/service/isletme.service';
import { PopupService } from 'src/app/service/popup.service';

@Component({
  selector: 'app-isletme-form',
  templateUrl: './isletme-form.component.html',
  styleUrls: ['./isletme-form.component.css'],
})
export class IsletmeFormComponent implements OnInit, OnChanges {
  @Input() formData: any;
  @Input() formType: string;

  public isletmeForm: FormGroup;
  constructor(
    private isletmeService: IsletmeService,
    private popupService: PopupService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createIsletmeForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.formData && this.formData) {
      this.isletmeForm.patchValue(this.formData);
    }
  }

  private createIsletmeForm() {
    this.isletmeForm = this.fb.group({
      id: null,
      isletmeAdi: [null, Validators.required],
      yetkiliKisi: [null, Validators.required],
      adres: [null, Validators.required],
      fax: null,
      telefon: [null, Validators.required],
    });
  }

  public isNewForm() {
    return this.formType === 'new';
  }

  public onSubmit() {
    if (!this.isletmeForm.valid) {
      this.popupService.showWarningMessage(
        'Girilmesi gereken zorunlu alanlar mevcuttur.',
        'Zorunlu Alan Uyarısı'
      );
    } else {
      if (this.isNewForm()) {
        this.isletmeService
          .saveIsletme(this.isletmeForm.getRawValue())
          .subscribe(
            (res) => {
              if (res) {
                this.popupService.showSuccessMessage(
                  'Kayıt başarılı bir şekilde oluşturulmuştur.',
                  undefined
                );
                this.router.navigate(['/isletme']);
              }
            },
            (err) => {
              this.popupService.showErrorMessage(err.error, undefined);
            }
          );
      } else {
        this.isletmeService
          .updateIsletme(this.isletmeForm.getRawValue())
          .subscribe(
            (res) => {
              if (res) {
                this.popupService.showSuccessMessage(
                  'Kayıt başarılı bir şekilde güncellenmiştir.',
                  undefined
                );
                this.router.navigate(['/isletme']);
              }
            },
            (err) => {
              this.popupService.showErrorMessage(err.error, undefined);
            }
          );
      }
    }
  }
}
