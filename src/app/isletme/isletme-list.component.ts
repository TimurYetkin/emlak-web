import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { PageOptions } from '../model/page-options.model';
import { IsletmeService } from '../service/isletme.service';
import { PopupService } from '../service/popup.service';

@Component({
  selector: 'app-isletme-list',
  templateUrl: './isletme-list.component.html',
  styleUrls: ['./isletme-list.component.css'],
})
export class IsletmeListComponent implements OnInit {
  public isletmeGridData: any[];
  public isletmeGridCols: any[];
  public selectedIsletmeGridRow: any[];
  public loading: boolean;
  public pageOptions: PageOptions;
  public totalRecords: number;

  constructor(
    private isletmeService: IsletmeService,
    private popupService: PopupService,
    private router: Router
  ) {
    this.isletmeGridCols = [
      { field: 'isletmeAdi', header: 'İşletme Adı' },
      { field: 'yetkiliKisi', header: 'Yetkili Kişi' },
      { field: 'adres', header: 'Adres' },
      { field: 'fax', header: 'Fax' },
      { field: 'telefon', header: 'Telefon' },
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

    this.isletmeService
      .getAllIsletmeList(this.pageOptions)
      .subscribe(
        (res: any) => {
          this.isletmeGridData = res.content;
          this.totalRecords = res.totalElements;
        },
        (err) => {
          (err) => {
            this.popupService.showErrorMessage(err.error, undefined);
          };
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
      '/isletme/' + this.selectedIsletmeGridRow[0].id + '/edit',
    ]);
  }

  public onMusteriList() {
    this.router.navigate([
      '/isletme-musteri/' + this.selectedIsletmeGridRow[0].id,
    ]);
  }

  public onDelete() {
    this.isletmeService
      .removeIsletme(this.selectedIsletmeGridRow[0].id)
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

    this.selectedIsletmeGridRow = [];
  }

  public checkRows() {
    return this.selectedIsletmeGridRow
      ? this.selectedIsletmeGridRow.length !== 1
      : true;
  }
}
