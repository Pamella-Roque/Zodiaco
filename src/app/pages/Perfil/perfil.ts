import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.html',
})
export class PerfilComponent implements OnInit {
  nome: string = '';
  email: string = '';
  plano: string = '';
  dataNascimento: string = '';
  senha: string = ''; // Começa vazia, só para nova senha
  token: string = '';
  nickname: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    this.nickname = localStorage.getItem('nickname') || '';

    if (!this.token || !this.nickname) {
      alert('Usuário não autenticado');
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    this.http.get<any>(`/api/usuario/consultar/${this.nickname}`, { headers }).subscribe({
      next: (res) => {
        this.nome = res.nome;
        this.email = res.email;
        this.plano = res.plano;
        this.dataNascimento = res.dataNascimento; 
        
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao carregar os dados. Faça login novamente.');
        this.router.navigate(['/login']);
      }
    });
  }

 

  atualizarUsuario() {
    if (!this.token || !this.nickname) {
      alert('Usuário não autenticado');
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    const body: any = {
      nome: this.nome,
      email: this.email,
      plano: this.plano,
      dataNascimento: this.dataNascimento,
    };

    
    if (this.senha && this.senha.trim() !== '') {
      body.senha = this.senha;
    }

    this.http.put(`/api/usuario/atualizar/${this.nickname}`, body, { headers }).subscribe({
      next: () => {
        alert('Dados atualizados com sucesso!');

        localStorage.setItem('nome', this.nome);
        localStorage.setItem('email', this.email);
        localStorage.setItem('plano', this.plano);
        localStorage.setItem('dataNascimento', this.dataNascimento);
        
        

        this.router.navigate(['/showFeed']);
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao atualizar os dados. Tente novamente.');
      }
    });
  }

  excluirConta() {
    if (!this.token || !this.nickname) {
      alert('Usuário não autenticado');
      return;
    }

    if (confirm('Tem certeza que deseja excluir sua conta? Esta ação não poderá ser desfeita.')) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      this.http.delete(`/api/usuario/excluir/${this.nickname}`, { headers }).subscribe({
        next: () => {
          alert('Conta excluída com sucesso.');
          localStorage.clear();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao excluir conta. Tente novamente.');
        }
      });
    }
  }

  deslogar() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  navegarParaFeed() {
    this.router.navigate(['/showFeed']);
  }
}
