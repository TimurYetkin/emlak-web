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
import { EmlakService } from 'src/app/service/emlak.service';
import { IsletmeService } from 'src/app/service/isletme.service';
import { MusteriService } from 'src/app/service/musteri.service';
import { PopupService } from 'src/app/service/popup.service';

@Component({
  selector: 'app-emlak-form',
  templateUrl: './emlak-form.component.html',
})
export class EmlakFormComponent implements OnInit, OnChanges {
  @Input() formData: any;
  @Input() formType: string;

  public emlakForm: FormGroup;
  public emlakTuruList: SelectItem[];
  public isletmeList: SelectItem[];
  public musteriList: SelectItem[];
  public odaSayisiList: SelectItem[];
  public isinmaTuruList: SelectItem[];

  constructor(
    private emlakService: EmlakService,
    private isletmeService: IsletmeService,
    private musteriService: MusteriService,
    private popupService: PopupService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.emlakTuruList = [
      { value: 'SATILIK', label: 'Satılık' },
      { value: 'KIRALIK', label: 'Kiralık' },
    ];

    this.odaSayisiList = [
      { value: 'BIR_ARTI_BIR', label: '1+1' },
      { value: 'IKI_ARTI_BIR', label: '2+1' },
      { value: 'UC_ARTI_BIR', label: '3+1' },
      { value: 'DORT_ARTI_BIR', label: '4+1' },
      { value: 'BES_ARTI_IKI', label: '5+2' },
      { value: 'ON_VE_UZERI', label: '10 ve Üzeri' },
    ];

    this.isinmaTuruList = [
      { value: 'SOBA', label: 'Soba' },
      { value: 'DOGALGAZ', label: 'Doğalgaz' },
      { value: 'MERKEZI', label: 'Merkezi' },
    ];

    this.isletmeService.getIsletmeListValueLabel().subscribe(
      (res: any) => {
        this.isletmeList = res;
      },
      (err) => {
        this.popupService.showErrorMessage(err.error, undefined);
      }
    );
  }

  ngOnInit(): void {
    this.createEmlakForm();
  }

  private createEmlakForm() {
    this.emlakForm = this.fb.group({
      id: null,
      isletmeId: [null, Validators.required],
      musteriId: [null, Validators.required],
      emlakTuru: [null, Validators.required],
      odaSayisi: [null, Validators.required],
      metreKare: [null, Validators.required],
      balkonSayisi: null,
      binaKati: [null, Validators.required],
      isinmaTuru: [null, Validators.required],
      satildi: null,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.formData && this.formData) {
      this.emlakForm.patchValue(this.formData);
    }
    this.onIsletmeChange();
  }

  public isNewForm() {
    return this.formType === 'new';
  }

  onIsletmeChange() {
    this.musteriList = [];
    if (this.emlakForm && this.emlakForm.value.isletmeId)
      this.musteriService
        .getMusteriByIsletmeListValueLabel(this.emlakForm.value.isletmeId)
        .subscribe(
          (res: any) => {
            this.musteriList = res;
          },
          (err) => {
            this.popupService.showErrorMessage(err.error, undefined);
          }
        );
  }

  onSubmit() {
    if (!this.emlakForm.valid) {
      this.popupService.showWarningMessage(
        'Girilmesi gereken zorunlu alanlar mevcuttur.',
        'Zorunlu Alan Uyarısı'
      );
    } else {
      if (this.isNewForm()) {
        this.emlakService.saveEmlak(this.emlakForm.getRawValue()).subscribe(
          (res) => {
            if (res) {
              this.popupService.showSuccessMessage(
                'Kayıt başarılı bir şekilde oluşturulmuştur.',
                undefined
              );
              this.router.navigate(['/emlak']);
            }
          },
          (err) => {
            this.popupService.showErrorMessage(err.error, undefined);
          }
        );
      } else {
        this.emlakService.updateEmlak(this.emlakForm.getRawValue()).subscribe(
          (res) => {
            if (res) {
              this.popupService.showSuccessMessage(
                'Kayıt başarılı bir şekilde güncellenmiştir.',
                undefined
              );
              this.router.navigate(['/emlak']);
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
