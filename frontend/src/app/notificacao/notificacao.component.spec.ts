import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NotificacaoComponent } from './notificacao.component';
import { NotificacaoService } from './notificacao.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('NotificacaoComponent', () => {
    let component: NotificacaoComponent;
    let fixture: ComponentFixture<NotificacaoComponent>;
    let service: NotificacaoService;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NotificacaoComponent],
            imports: [HttpClientTestingModule],
            providers: [NotificacaoService],
        }).compileComponents();

        fixture = TestBed.createComponent(NotificacaoComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(NotificacaoService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => httpMock.verify());

    it('É necessário adicionar notificação e atualizar status para sucesso', fakeAsync(() => {
        component.enviar('Teste');
        const mensagemId = component.notificacoes[0].mensagemId;

        const req = httpMock.expectOne('http://localhost:4000/api/notificar');
        expect(req.request.method).toBe('POST');
        expect(req.request.body.mensagemId).toBe(mensagemId);

        req.flush({ mensagemId, conteudoMensagem: 'Teste' });
        tick();

        expect(component.notificacoes[0].status).toBe('PROCESSADO_SUCESSO');
    }));

    it('É necessário atualizar status para falha se API falhar', fakeAsync(() => {
        component.enviar('Teste erro');
        const mensagemId = component.notificacoes[0].mensagemId;

        const req = httpMock.expectOne('http://localhost:4000/api/notificar');
        req.error(new ErrorEvent('Network error'));
        tick();

        expect(component.notificacoes[0].status).toBe('FALHA_PROCESSAMENTO');
    }));
});