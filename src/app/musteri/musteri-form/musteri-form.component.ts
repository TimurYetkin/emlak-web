import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { MusteriService } from 'src/app/service/musteri.service';
import { PopupService } from 'src/app/service/popup.service';

@Component({
  selector: 'app-musteri-form',
  templateUrl: './musteri-form.component.html',
})
export class MusteriFormComponent implements OnInit, OnChanges {
  @Input() formData: any;
  @Input() formType: string;

  public musteriForm: FormGroup;
  public musteriTipiList: SelectItem[];

  constructor(
    private musteriService: MusteriService,
    private popupService: PopupService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.musteriTipiList = [
      { value: 'ALICI', label: 'Alıcı' },
      { value: 'SATICI', label: 'Satıcı' },
    ];
  }

  ngOnInit(): void {
    this.createMusteriForm();
  }

  private createMusteriForm() {
    this.musteriForm = this.fb.group({
      id: null,
      ad: [null, Validators.required],
      soyad: [null, Validators.required],
      cepNo: [null, Validators.required],
      evNo: null,
      email: null,
      musteriTipi: [null, Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.formData && this.formData) {
      this.musteriForm.patchValue(this.formData);
    }
  }

  public isNewForm() {
    return this.formType === 'new';
  }

  onSubmit() {
    if (!this.musteriForm.valid) {
      this.popupService.showWarningMessage(
        'Girilmesi gereken zorunlu alanlar mevcuttur.',
        'Zorunlu Alan Uyarısı'
      );
    } else {
      if (this.isNewForm()) {
        this.musteriService
          .saveMusteri(this.musteriForm.getRawValue())
          .subscribe(
            (res) => {
              if (res) {
                this.popupService.showSuccessMessage(
                  'Kayıt başarılı bir şekilde oluşturulmuştur.',
                  undefined
                );
                this.router.navigate(['/musteri']);
              }
            },
            (err) => {
              this.popupService.showErrorMessage(err.error, undefined);
            }
          );
      } else {
        this.musteriService
          .updateMusteri(this.musteriForm.getRawValue())
          .subscribe(
            (res) => {
              if (res) {
                this.popupService.showSuccessMessage(
                  'Kayıt başarılı bir şekilde güncellenmiştir.',
                  undefined
                );
                this.router.navigate(['/musteri']);
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
