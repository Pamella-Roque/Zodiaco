import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private usuarioService: UsuarioService) {}

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setNickname(nickname: string) {
    localStorage.setItem('nickname', nickname);
  }

  getNickname(): string | null {
    return localStorage.getItem('nickname');
  }

  logout() {
    // localStorage.removeItem('token');
    // localStorage.removeItem('nickname');
    this.usuarioService.limparUsuario();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
