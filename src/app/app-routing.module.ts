import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsletmeEditFormComponent } from './isletme/isletme-edit-form/isletme-edit-form.component';
import { IsletmeNewFormComponent } from './isletme/isletme-new-form/isletme-new-form.component';
import { IsletmeListComponent } from './isletme/isletme-list.component';
import { MusteriListComponent } from './musteri/musteri-list/musteri-list.component';
import { MusteriNewFormComponent } from './musteri/musteri-new-form/musteri-new-form.component';
import { MusteriEditFormComponent } from './musteri/musteri-edit-form/musteri-edit-form.component';
import { IsletmeMusteriListComponent } from './isletme-musteri/isletme-musteri.component';
import { EmlakNewFormComponent } from './emlak/emlak-new-form/emlak-new-form.component';
import { EmlakEditFormComponent } from './emlak/emlak-edit-form/emlak-edit-form.component';
import { EmlakListComponent } from './emlak/emlak-list/emlak-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/emlak',
    pathMatch: 'full',
  },
  { path: 'isletme/new', component: IsletmeNewFormComponent },
  { path: 'isletme/:id/edit', component: IsletmeEditFormComponent },
  { path: 'isletme/:id/musteri', component: MusteriListComponent },
  { path: 'isletme', component: IsletmeListComponent },
  { path: 'musteri/new', component: MusteriNewFormComponent },
  { path: 'musteri/:id/edit', component: MusteriEditFormComponent },
  { path: 'musteri', component: MusteriListComponent },
  { path: 'emlak/new', component: EmlakNewFormComponent },
  { path: 'emlak/:id/edit', component: EmlakEditFormComponent },
  { path: 'emlak', component: EmlakListComponent },
  { path: 'isletme-musteri/:id', component: IsletmeMusteriListComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
