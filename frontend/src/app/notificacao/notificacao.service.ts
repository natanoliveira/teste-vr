import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Notificacao {
    id: string;
    mensagem: string;
    status: string;
}

@Injectable({ providedIn: 'root' })
export class NotificacaoService {
    private apiUrl = 'http://localhost:4000/api/notificar';

    constructor(private http: HttpClient) { }

    enviarNotificacao(conteudoMensagem: string): Observable<any> {
        return this.http.post(this.apiUrl, { conteudoMensagem });
    }
}