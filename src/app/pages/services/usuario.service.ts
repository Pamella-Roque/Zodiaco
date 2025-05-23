import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Usuario {
  nome: string;
  email?: string;
  plano?: string;
  dataNascimento?: string;
  senha?: string;
  nickname?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);
  usuario$ = this.usuarioSubject.asObservable();

  constructor() {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.usuarioSubject.next(JSON.parse(usuario));
    }
  }

  setUsuario(usuario: Usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuarioSubject.next(usuario);
  }

  getUsuario(): Usuario | null {
    return this.usuarioSubject.getValue();
  }

  limparUsuario() {
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null);
  }
}
