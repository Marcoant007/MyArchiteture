import { Injectable } from '@angular/core';
/**
 * Classe responsável por gardas as informações da sessão do usuário
 * @author silas.moraes
 */
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }
  /**
   * Adiciona um valor na sessão
   *
   * @param key Identidicador único que será usado posteriormente para recuperar o valor salvo na sessão.
   * @param value Valor que será gravado na sessao, esse valor poder ser um Objeto qualquer, ou uma string.
   */
  setItem(key: string, value: string | any): void {
    sessionStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  }
  /**
   * Recupera o valor de uma chave da sessão
   *
   * @param key Identidicador único
   */
  getItem(key: string): any {
    const object = sessionStorage.getItem(key);
    return object ? JSON.parse(sessionStorage.getItem(key)) : null;
  }
  /**
   * Remove o valor de uma chave da sessão
   *
   * @param key Identidicador único
   */
  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }
  /**
   * Verifica se uma chave existe na sessão
   *
   * @param key Identidicador único
   */
  hasItem(key: string): boolean {
    return sessionStorage.getItem(key) !== null;
  }
  /**
   * Limpa a sessão
   */
  clear(): void {
    sessionStorage.clear();
  }
}
