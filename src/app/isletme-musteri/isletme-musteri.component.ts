import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { PageOptions } from 'src/app/model/page-options.model';
import { IsletmeService } from 'src/app/service/isletme.service';
import { MusteriService } from 'src/app/service/musteri.service';
import { PopupService } from 'src/app/service/popup.service';

@Component({
  selector: 'app-isletme-musteri',
  templateUrl: './isletme-musteri.component.html',
})
export class IsletmeMusteriListComponent implements OnInit {
  public musteriGridData: any[];
  public musteriGridColumns: any[];
  public selectedMusteriGridRows: any[];
  public loading: boolean;
  public pageOptions: PageOptions;
  public totalRecords: number;
  private isletmeId: number;
  private routingSubscription: Subscription;
  public displayBasic = false;
  public isletmeMusteriForm: FormGroup;
  public musteriList: SelectItem[];

  constructor(
    private musteriService: MusteriService,
    private isletmeService: IsletmeService,
    private popupService: PopupService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.musteriGridColumns = [
      { field: 'ad', header: 'Ad' },
      { field: 'soyad', header: 'Soyad' },
      { field: 'cepNo', header: 'Cep No' },
      { field: 'evNo', header: 'Ev No' },
      { field: 'email', header: 'E-Mail' },
    ];

    this.routingSubscription = this.route.params.subscribe((params: any) => {
      this.isletmeId = +params.id;
    });
  }

  ngOnInit(): void {
    this.pageOptions = {
      page: 0,
      size: 5,
    };
    this.totalRecords = 0;
    this.loading = true;
    this.createIsletmeMusteriForm();
  }

  public createIsletmeMusteriForm() {
    this.isletmeMusteriForm = this.fb.group({
      isletmeId: this.isletmeId,
      musteriId: null,
    });
  }

  public onFilter(lazyEvent?: LazyLoadEvent) {
    this.loading = true;

    if (lazyEvent) {
      this.pageOptions.page = Math.round(lazyEvent.first / lazyEvent.rows);
      this.pageOptions.size = lazyEvent.rows;
    }

    this.musteriService
      .getAllMusteriListByIsletmeId(this.isletmeId, this.pageOptions)
      .subscribe(
        (res: any) => {
          this.musteriGridData = res.content;
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
      '/musteri/' + this.selectedMusteriGridRows[0].id + '/edit',
    ]);
  }

  public onDelete() {
    this.isletmeService
      .removeIsletmeMusteri(this.selectedMusteriGridRows[0].id, this.isletmeId)
      .subscribe(
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

    this.selectedMusteriGridRows = [];
  }

  public checkRows() {
    return this.selectedMusteriGridRows
      ? this.selectedMusteriGridRows.length !== 1
      : true;
  }

  public openAktivasyonDialog() {
    this.displayBasic = true;
    this.musteriService.getMusteriListValueLabel().subscribe(
      (res: any) => {
        this.musteriList = res;
      },
      (err) => {
        this.popupService.showErrorMessage(err.error, undefined);
      }
    );
  }

  public closeAktivasyonDialog() {
    this.displayBasic = false;
  }

  public onSubmit() {
    this.isletmeService
      .saveIsletmeMusteri(this.isletmeMusteriForm.getRawValue())
      .subscribe(
        (res: any) => {
          this.isletmeMusteriForm.get('musteriId').reset();
          this.onRefresh();
          this.closeAktivasyonDialog();
          this.popupService.showSuccessMessage(
            'Kayıt başarılı bir şekilde oluşturulmuştur.',
            undefined
          );
        },
        (err) => {
          this.popupService.showErrorMessage(err.error, undefined);
        }
      );
  }
}
