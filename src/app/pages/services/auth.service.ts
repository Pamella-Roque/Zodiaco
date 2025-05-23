
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Salva o token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Pega o token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Salva o nickname
  setNickname(nickname: string) {
    localStorage.setItem('nickname', nickname);
  }

  // Pega o nickname
  getNickname(): string | null {
    return localStorage.getItem('nickname');
  }

  // Salva o objeto usuário
  setUsuario(usuario: any) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  // Pega o objeto usuário
  getUsuario(): any {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  // Limpa tudo (Logout)
  logout() {
    localStorage.clear();
  }
}  