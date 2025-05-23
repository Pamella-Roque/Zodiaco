import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './Login.html',
  imports: [FormsModule]
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
  
    this.http.post('/api/login', dadosLogin).subscribe({
      next: (res: any) => {
        console.log('Resposta login:', res);
        if (res && res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('nickname', res.nickname);
          this.router.navigate(['/showFeed']);
        } else {
          this.erroMensagem = 'Email ou senha inválidaos';
        }
      },
      error: (err) => {
        this.erroMensagem = 'Erro na autenticação. Tente novamente.';
        console.error(err);
      }
    });
  }
}