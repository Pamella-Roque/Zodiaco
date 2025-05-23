import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para ngModel
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.html'
})
export class PerfilComponent implements OnInit {
  nome: string = '';
  email: string = '';
  plano: string = '';
  dataNascimento: string = '';
  senha: string = '';
  token: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Buscar dados do usuário e token do localStorage (ou outro lugar)
    this.token = localStorage.getItem('token') || '';
    this.nome = localStorage.getItem('nome') || '';
    this.email = localStorage.getItem('email') || '';
    this.plano = localStorage.getItem('plano') || '';
    this.dataNascimento = localStorage.getItem('dataNascimento') || '';
    // NÃO carregue a senha direto do storage, por segurança!
  }

  atualizarUsuario() {
    if (!this.token) {
      alert('Usuário não autenticado');
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    const body = {
      nome: this.nome,
      email: this.email,
      plano: this.plano,
      dataNascimento: this.dataNascimento,
      senha: this.senha
    };

    this.http.put('/api/usuario/atualizar', body, { headers }).subscribe({
      next: (res) => {
        alert('Dados atualizados com sucesso!');

        // Atualizar localStorage para manter os dados sincronizados
        localStorage.setItem('nome', this.nome);
        localStorage.setItem('email', this.email);
        localStorage.setItem('plano', this.plano);
        localStorage.setItem('dataNascimento', this.dataNascimento);

        // Opcional: limpar senha do campo
        this.senha = '';

        // Navegar para o Feed com os dados atualizados
        this.router.navigate(['/showFeed']);
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao atualizar os dados. Tente novamente.');
      }
    });
  }

  deslogar() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  navegarParaFeed() {
    this.router.navigate(['/showFeed'], {
      queryParams: {
        nome: this.nome,
        email: this.email,
        plano: this.plano,
        dataNascimento: this.dataNascimento,
        senha: this.senha
      }
    });
  }
  excluirConta() {
    if (!this.token) {
      alert('Usuário não autenticado');
      return;
    }

    if (confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível!')) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

      this.http.delete('/api/usuario/excluir', { headers }).subscribe({
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
}
