import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { NotificacaoComponent } from './app/notificacao/notificacao.component';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));