import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { Subscription } from 'rxjs';
import { PageOptions } from 'src/app/model/page-options.model';
import { IsletmeService } from 'src/app/service/isletme.service';
import { MusteriService } from 'src/app/service/musteri.service';
import { PopupService } from 'src/app/service/popup.service';

@Component({
  selector: 'app-musteri-list',
  templateUrl: './musteri-list.component.html',
  styleUrls: ['./musteri-list.component.css'],
})
export class MusteriListComponent implements OnInit {
  public musteriGridData: any[];
  public musteriGridColumns: any[];
  public selectedMusteriGridRows: any[];
  public loading: boolean;
  public pageOptions: PageOptions;
  public totalRecords: number;

  constructor(
    private musteriService: MusteriService,
    private isletmeService: IsletmeService,
    private popupService: PopupService,
    private router: Router
  ) {
    this.musteriGridColumns = [
      { field: 'ad', header: 'Ad' },
      { field: 'soyad', header: 'Soyad' },
      { field: 'cepNo', header: 'Cep No' },
      { field: 'evNo', header: 'Ev No' },
      { field: 'email', header: 'E-Mail' },
    ];
  }

  ngOnInit(): void {
    this.pageOptions = {
      page: 0,
      size: 5,
    };
    this.totalRecords = 0;
    this.loading = true;
  }

  public onFilter(lazyEvent?: LazyLoadEvent) {
    this.loading = true;

    if (lazyEvent) {
      this.pageOptions.page = Math.round(lazyEvent.first / lazyEvent.rows);
      this.pageOptions.size = lazyEvent.rows;
    }

    this.musteriService
      .getAllMusteriList(this.pageOptions)
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
    this.musteriService
      .removeMusteri(this.selectedMusteriGridRows[0].id)
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
}
