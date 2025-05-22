import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-create-account',
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './CreateAccount.html'
})
export class CreateAccountComponent {
  nickname = '';
  nome = '';
  email = '';
  senha = '';
  plano = '';
  dataNascimento = '';
  codigoPix: string = '';

  apiUrl = 'https://apizodiaco.onrender.com';

  constructor(private http: HttpClient, private router: Router) {}

  gerarCodigoPix() {
    this.http.get(`${this.apiUrl}/api/pagamento/gerar`).subscribe({
      next: (res: any) => {
        console.log('PIX gerado:', res);
        // Verifica se vem como objeto com chave "codigo" ou direto como string
        this.codigoPix = res.codigo || res || JSON.stringify(res);
      },
      error: (err) => {
        console.error('Erro ao gerar código PIX', err);
        alert('Erro ao gerar código PIX!');
      }
    });
  }
  



  cadastrar() {
    if (!this.nickname || !this.nome || !this.email || !this.senha || !this.plano || !this.dataNascimento) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const dados = {
      nickname: this.nickname,
      senha: this.senha,
      nome: this.nome,
      plano: this.plano,
      dataNascimento: this.dataNascimento,
      email: this.email
    };

    this.http.post(`${this.apiUrl}/api/usuario/cadastro`, dados).subscribe({
      next: (res) => {
        alert('Cadastro realizado com sucesso!');
        console.log(res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('Erro ao cadastrar!');
        console.error(err);
      }
    });
  }
}
