import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  errorDuration = 5;

  constructor() {}

  showErrorMessage = (error: any, title: string = 'Hata') => {
    let errorMessage =
      error != undefined && error.message
        ? error.message
        : 'Bilinmeyen bir hata oluştu';
    Swal.fire({
      title: title,
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Tamam',
    }).then(() => {});
  };

  showSuccessMessage = (
    success: string,
    title: string = 'İşlem Tamamlandı'
  ) => {
    Swal.fire({
      title: title,
      text: success,
      icon: 'success',
      confirmButtonText: 'Tamam',
    }).then(() => {});
  };

  showWarningMessage = (warning: string, title: string = 'Uyarı!') => {
    Swal.fire({
      title: title,
      text: warning,
      icon: 'warning',
      confirmButtonText: 'Tamam',
    }).then(() => {});
  };
}
