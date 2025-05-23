import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './Login.html'
})
export class LoginComponent {
  nickname = '';
  senha = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    if (!this.nickname || !this.senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }
  
    const dadosLogin = {
      nickname: this.nickname,
      senha: this.senha
    };
  
    console.log('Dados enviados:', dadosLogin);
  
    this.http.post(`/api/login`, dadosLogin).subscribe({
      next: (res) => {
        alert('Login realizado com sucesso!');
        console.log(res);
        this.router.navigate(['/showFeed']);
      },
      error: (err) => {
        alert('Erro ao fazer login!');
        console.error(err);
      }
    });
  }
}  