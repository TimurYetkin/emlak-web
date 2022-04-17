import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { PageOptions } from 'src/app/model/page-options.model';
import { IsletmeService } from 'src/app/service/isletme.service';
import { EmlakService } from 'src/app/service/emlak.service';
import { PopupService } from 'src/app/service/popup.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MusteriService } from 'src/app/service/musteri.service';

@Component({
  selector: 'app-emlak-list',
  templateUrl: './emlak-list.component.html',
  styleUrls: ['./emlak-list.component.css'],
})
export class EmlakListComponent implements OnInit {
  public emlakGridData: any[];
  public emlakGridColumns: any[];
  public selectedEmlakGridRows: any[];
  public loading: boolean;
  public pageOptions: PageOptions;
  public totalRecords: number;

  public emlakFilterForm: FormGroup;
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
    private router: Router,
    private fb: FormBuilder
  ) {
    this.emlakGridColumns = [
      { field: 'isletme.isletmeAdi', header: 'İşletme Adı' },
      { field: 'emlakTuru', header: 'Emlak Türü' },
      { field: 'odaSayisi', header: 'Oda Sayısı' },
      { field: 'metreKare', header: 'Metrekare' },
      { field: 'balkonSayisi', header: 'Balkon Sayısı' },
      { field: 'binaKati', header: 'Bina Katı' },
      { field: 'isinmaTuru', header: 'Isınma Türü' },
    ];

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

    this.musteriService.getMusteriListValueLabel().subscribe(
      (res: any) => {
        this.musteriList = res;
      },
      (err) => {
        this.popupService.showErrorMessage(err.error, undefined);
      }
    );
  }

  ngOnInit(): void {
    this.createEmlakFilterForm();
    this.pageOptions = {
      page: 0,
      size: 5,
    };
    this.totalRecords = 0;
    this.loading = true;
  }

  private createEmlakFilterForm() {
    this.emlakFilterForm = this.fb.group({
      isletmeId: null,
      musteriId: null,
      emlakTuru: null,
      odaSayisi: null,
      metreKare: null,
      balkonSayisi: null,
      binaKati: null,
      isinmaTuru: null,
      satildi: null,
    });
  }

  public onFilter(lazyEvent?: LazyLoadEvent) {
    this.loading = true;

    if (lazyEvent) {
      this.pageOptions.page = Math.round(lazyEvent.first / lazyEvent.rows);
      this.pageOptions.size = lazyEvent.rows;
    }

    this.emlakService
      .getAllEmlakList(this.emlakFilterForm.getRawValue(), this.pageOptions)
      .subscribe(
        (res: any) => {
          this.emlakGridData = res.content;
          this.totalRecords = res.totalElements;
        },
        (err) => {
          this.popupService.showErrorMessage(err.error, undefined);
        }
      )
      .add(() => {
        this.loading = false;
      });
  }

  public onRefresh(): void {
    this.onFilter();
  }

  public onEdit() {
    this.router.navigate([
      '/emlak/' + this.selectedEmlakGridRows[0].id + '/edit',
    ]);
  }

  public onDelete() {
    this.emlakService.removeEmlak(this.selectedEmlakGridRows[0].id).subscribe(
      (res: any) => {
        this.onRefresh();
        this.popupService.showSuccessMessage(
          'Kayıt başarılı bir şekilde silindi.',
          undefined
        );
      },
      (err) => {
        this.popupService.showErrorMessage(err.error, undefined);
      }
    );

    this.selectedEmlakGridRows = [];
  }

  public checkRows() {
    return this.selectedEmlakGridRows
      ? this.selectedEmlakGridRows.length !== 1
      : true;
  }
}
