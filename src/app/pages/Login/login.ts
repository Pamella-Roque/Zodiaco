import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './Login.html',
  imports: [FormsModule,RouterModule,CommonModule]
})
export class LoginComponent {
  nickname: string = '';
  senha: string = '';
  erroMensagem: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  fazerLogin() {
    const dadosLogin = {
      nickname: this.nickname,
      senha: this.senha
    };
  
    this.erroMensagem = ''; // limpa mensagem anterior
  
    this.http.post('/api/login', dadosLogin).subscribe({
      next: (res: any) => {
        console.log('Resposta login:', res);
        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('nickname', res.nickname);
          this.router.navigate(['/showFeed']);
        } else {
          this.erroMensagem = res.mensagem || 'Nickname ou senha inválidos';
        }
      },
      error: (err) => {
        console.log('Erro completo:', err);
        this.erroMensagem = err.error?.mensagem || 'Erro na autenticação.';
      }
    });
  }
}   