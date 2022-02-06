import { ApplicationRef, ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageModalService } from '../ui/modal-dialog/modal-dialog/message-modal.service';
import { MessageModal } from '../ui/modal-dialog/modal-dialog/messageModal';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';
import { ProfileService } from '../services/profile.service';
import { isError } from 'util';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

  constructor(
    private injector: Injector,
    private sessionService: SessionService,
    // private profileService: ProfileService,
  ) { }

  private get messageService(): MessageModalService {
    return this.injector.get(MessageModalService);
  }

  private get profileService(): ProfileService {
    return this.injector.get(ProfileService);
  }

  private get router(): Router {
    return this.injector.get(Router);
  }

  private get applicationRef(): ApplicationRef {
    return this.injector.get(ApplicationRef);
  }

  /**
   * Função responsável por realizar o tratamento dos erros de acordo
   * com o objeto recebido.
   *
   * @param error Objeto de erro não capturado
   */
  public handleError(error: HttpErrorResponse | any): void {
    let erro = error.rejection;
    if (this.isBackendError(erro)) {
      switch (erro.status) {
        case 400:
          this.sendUIErrorMessages(erro, 'Dados inválidos');
          break;
        case 401:
          this.profileService.logout();
          this.sendUIErrorMessages(erro, 'Não autorizado!');
          break;
        case 403:
          this.profileService.logout();
          this.sendUIErrorMessages(erro, 'Não autorizado!');
          break;
        case 404:
          this.sendUIErrorMessages(erro, 'Página não encontrada (404)');
          break;
        case 500:
          this.sendUIErrorMessages(erro, 'Erro interno de servidor (500)');
          break;
        default:
          this.sendUIErrorMessages(erro);
          break;
      }
    }
  }

  /**
   * Determina se um erro capturado é um erro proveniente do backend ou não.
   *
   * @param error Erro capturado
   * @return True caso o erro seja do backend e false, caso contrário.
   */
  private isBackendError(error: any): boolean {
    return error instanceof HttpErrorResponse;
  }

  /**
   * Envia todas as mensagens de erro de um array para serem exibidas para o usuário.
   *
   * @param messages Array de mensagens a serem exibidas
   * @param title Título das mensagens
   */
  private sendUIErrorMessages(error: any, title?: string): void {
    const messages = [];
    try {

      if (error.error instanceof Blob) {
        this.processBlobError(error);
        return;
      }

      this.sendUIErrorMessage(error.error.message, error.error.title || title);
    } catch (err) {
      this.sendUIErrorMessage(undefined, undefined);
    }
  }

  /**
   * Quando a requisição espera um blob, é necessário tratar o erro de formar diferente,
   * para isso o blob é convertido para Json e a partir desse resultado pegamos a mensagem
   *
   * @param error erro devolvido pelo servidor
   */
  private processBlobError(error: any) {
    var lets = this;
    var reader = new FileReader();
    reader.onload = function () {
      lets.sendUIErrorMessage((JSON.parse(reader.result.toString()).message), 'Erro');
    };
    reader.readAsText(error.error);
  }

  /**
   * Envia uma mensagem de erro para ser exibida para o usuário.
   *
   * @param message Mensagem a ser exibida
   * @param title Título da mensagem
   */
  private sendUIErrorMessage(message: string, title?: string): void {
    let modal = new MessageModal(title || 'Erro', message || 'Por favor, contate o administrador do sistema.', true, 4100)
    this.messageService.showModal(modal);
  }
}

