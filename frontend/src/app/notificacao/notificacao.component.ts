import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificacaoService, Notificacao } from './notificacao.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'app-notificacao',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './notificacao.component.html',
    styleUrls: ['./notificacao.component.css']
})
export class NotificacaoComponent {
    mensagem: string = '';
    notificacoes: Notificacao[] = [];

    constructor(private notificacaoService: NotificacaoService) { }

    enviar() {
        const id = uuidv4();
        const novaNotificacao: Notificacao = {
            id,
            mensagem: this.mensagem,
            status: 'AGUARDANDO PROCESSAMENTO'
        };

        this.notificacoes.push(novaNotificacao);

        this.notificacaoService.enviarNotificacao(this.mensagem).subscribe({
            next: () => {
                const notif = this.notificacoes.find(n => n.id === id);
                if (notif) notif.status = 'ENVIADA';
            },
            error: () => {
                const notif = this.notificacoes.find(n => n.id === id);
                if (notif) notif.status = 'ERRO';
            }
        });

        this.mensagem = '';
    }
}