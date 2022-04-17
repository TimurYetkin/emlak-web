import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { IsletmeListComponent } from './isletme/isletme-list.component';
import { MusteriListComponent } from './musteri/musteri-list/musteri-list.component';
import { MegaMenuModule } from 'primeng/megamenu';
import { TableModule } from 'primeng/table';
import { FieldPipe } from './pipe/field.pipe';
import { IsletmeService } from './service/isletme.service';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { PopupService } from './service/popup.service';
import { IsletmeFormComponent } from './isletme/isletme-form/isletme-form.component';
import { IsletmeEditFormComponent } from './isletme/isletme-edit-form/isletme-edit-form.component';
import { IsletmeNewFormComponent } from './isletme/isletme-new-form/isletme-new-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MusteriFormComponent } from './musteri/musteri-form/musteri-form.component';
import { MusteriNewFormComponent } from './musteri/musteri-new-form/musteri-new-form.component';
import { MusteriEditFormComponent } from './musteri/musteri-edit-form/musteri-edit-form.component';
import { IsletmeMusteriListComponent } from './isletme-musteri/isletme-musteri.component';
import { DialogModule } from 'primeng/dialog';
import { EmlakListComponent } from './emlak/emlak-list/emlak-list.component';
import { EmlakFormComponent } from './emlak/emlak-form/emlak-form.component';
import { EmlakNewFormComponent } from './emlak/emlak-new-form/emlak-new-form.component';
import { EmlakEditFormComponent } from './emlak/emlak-edit-form/emlak-edit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    IsletmeListComponent,
    MusteriListComponent,
    FieldPipe,
    IsletmeFormComponent,
    IsletmeEditFormComponent,
    IsletmeNewFormComponent,
    MusteriListComponent,
    MusteriFormComponent,
    MusteriNewFormComponent,
    MusteriEditFormComponent,
    IsletmeMusteriListComponent,
    EmlakListComponent,
    EmlakNewFormComponent,
    EmlakEditFormComponent,
    EmlakFormComponent,
  ],
  exports: [FieldPipe],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    AppRoutingModule,
    MegaMenuModule,
    TableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    FieldsetModule,
    InputNumberModule,
    InputTextModule,
    DialogModule,
  ],
  providers: [IsletmeService, PopupService],
  bootstrap: [AppComponent],
})
export class AppModule {}
