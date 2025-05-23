import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

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
    localStorage.removeItem('token');
    localStorage.removeItem('nickname');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
