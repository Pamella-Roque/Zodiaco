import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsuarioService, Usuario } from '../services/usuario.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.html',
})
export class PerfilComponent implements OnInit {
  nome = '';
  email = '';
  plano = '';
  nascimento = '';
  senha = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.consultarDadosUsuario();
  }

  consultarDadosUsuario() {
    const token = this.authService.getToken();
    const nickname = this.authService.getNickname();

    if (!token || !nickname) {
      alert('Usuário não autenticado');
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>(`/api/usuario/consultar/${nickname}`, { headers }).subscribe({
      next: (res) => {
        this.nome = res.nome || '';
        this.email = res.email || '';
        this.plano = res.plano || '';
        this.nascimento = res.nascimento ? res.nascimento.substring(0, 10) : ''; // corta o timestamp para ficar só data
    console.log('Dados perfil:', res);
      },
      error: (err) => {
        console.error('Erro ao consultar dados do usuário:', err);
        alert('Erro ao carregar dados do usuário, faça login novamente.');
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }


  atualizarUsuario() {
    const token = this.authService.getToken();
    const nickname = this.authService.getNickname();
  
    if (!token || !nickname) {
      alert('Usuário não autenticado');
      this.router.navigate(['/login']);
      return;
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    const body: any = {
      nome: this.nome,
      email: this.email,
      plano: this.plano,
      nascimento: this.nascimento,
    };
  
    if (this.senha.trim()) {
      body.senha = this.senha;
    }
  
    this.http.put(`/api/usuario/atualizar/${nickname}`, body, { headers }).subscribe({
      next: () => {
        alert('Dados atualizados com sucesso! Por segurança, realize o login novamente para atualizar suas permissões.');
  
        // Força logout após atualização de dados sensíveis
        this.authService.logout();
        this.usuarioService.limparUsuario();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro ao atualizar os dados:', err);
        alert('Erro ao atualizar os dados. Tente novamente.');
      }
    });
  }
  






  excluirConta() {
    const token = this.authService.getToken();
    const nickname = this.authService.getNickname();

    if (!token || !nickname) {
      alert('Usuário não autenticado');
      return;
    }

    if (confirm('Tem certeza que deseja excluir sua conta? Esta ação não poderá ser desfeita.')) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.delete(`/api/usuario/excluir/${nickname}`, { headers }).subscribe({
        next: () => {
          alert('Conta excluída com sucesso.');
          this.authService.logout();
          this.usuarioService.limparUsuario();
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
    this.authService.logout();
    this.usuarioService.limparUsuario();
    this.router.navigate(['/login']);
  }

  navegarParaFeed() {
    this.router.navigate(['/showFeed']);
  }
}
