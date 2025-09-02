import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { NotificacaoComponent } from './notificacao/notificacao.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([{ path: '', component: NotificacaoComponent }]),
    provideHttpClient()
  ]
};