import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor() {}
  items: MegaMenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      {
        label: 'İşletme Listesi',
        icon: 'pi pi-fw pi-th-large',
        routerLink: '/isletme',
        preserveFragment: true,
      },
      {
        label: 'Müşteri Bilgileri',
        icon: 'pi pi-fw pi-users',
        routerLink: '/musteri',
      },
      {
        label: 'Emlak Verileri',
        icon: 'pi pi-fw pi-home',
        routerLink: '/emlak',
      },
    ];
  }
}
