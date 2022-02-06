import { Directive, ElementRef, Input, Renderer2, AfterViewInit } from '@angular/core';
import { AuthorizationService } from './authorization.service';


/**
 * @author Etaure TI & Automação
 */
@Directive({
  selector: '[appAuthorized]'
})
export class TxAuthorizedDirective implements AfterViewInit {

  @Input('appAuthorized') permission: string | string[];

  @Input()
  disabled: boolean;

  private initialDisplayValue: string;
  private shouldDisable: boolean;

  constructor(
    private el: ElementRef,
    private renderer2: Renderer2,
    private authorizationService: AuthorizationService,
  ) { }

  ngAfterViewInit() {
    const nativeElement: HTMLElement = this.el.nativeElement;
    this.shouldDisable = this.notAllowed() || this.disabled;
    if (nativeElement instanceof HTMLButtonElement) {
      this.handleButton(nativeElement, this.shouldDisable);
    } else {
      this.handleElement(nativeElement, this.shouldDisable);
    }
  }

  /**
   * Determina se um usuário pode realizar determinada ação de acordo com a(s) permissão(ões) passadas como input.
   * @return boolean True caso o usuário não tenha a(s) permissão(ões) e false caso contrário.
   */
  private notAllowed(): boolean {
    if (typeof this.permission[0] === 'string') {
      return this.authorizationService.notAllowed(this.permission[0]);
    }
    if (Array.isArray(this.permission)) {
      return this.permission.every(p => this.authorizationService.notAllowed(p));
    }
  }

  /**
   * Faz o tratamento de permissão de um botão.
   * Caso o botão deva ser desativado, sua propriedade 'disabled' é atribuída com true.
   */
  private handleButton(button: HTMLButtonElement, shouldDisable: boolean) {

    if (shouldDisable) {
      this.renderer2.setAttribute(button, 'disabled', 'true');
      this.renderer2.setStyle(button, 'opacity', '50%');
      this.renderer2.setStyle(button, 'cursor', 'not-allowed');
    } else {
      this.renderer2.removeAttribute(button, 'disabled');
    }
  }

  /**
   * Faz o tratamento de permissão de um elemento HTML.
   * Caso o elemento deva ser desativado, sua propriedade 'display' é atribuída com 'none', escondendo-o da tela.
   */
  private handleElement(element: HTMLElement, shouldDisable: boolean) {
    if (shouldDisable) {
      this.initialDisplayValue = this.initialDisplayValue || element.style.display;
      this.renderer2.setStyle(element, 'display', 'none');
    } else {
      this.renderer2.setStyle(element, 'display', this.initialDisplayValue || 'revert');
    }
  }

}
