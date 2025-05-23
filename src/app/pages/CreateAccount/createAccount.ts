import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient} from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-create-account',
  imports: [CommonModule, RouterModule, FormsModule],
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

 

  constructor(private http: HttpClient, private router: Router) {}

  gerarCodigoPix() {
    this.http.get('/api/pagamento/gerar').subscribe({
      next: (res: any) => {
        console.log('PIX gerado:', res);
        if (res && typeof res === 'object' && 'codigoPix' in res) {
          this.codigoPix = res.codigoPix;  // pega o codigo aleatorio gerado
        } else if (typeof res === 'string') {
          this.codigoPix = res;
        } else {
          this.codigoPix = JSON.stringify(res);
        }
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
  
    this.http.post<{ token: string }>('/api/usuario/cadastro', dados).subscribe({
      next: (res) => {
        console.log('Resposta da API:', res);
        
        // Armazenar token no localStorage
        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('nickname', this.nickname); // Salva nickname também
          alert('Cadastro realizado com sucesso!');
          this.router.navigate(['/login']); 
        } else {
          alert('Cadastro realizado, mas token não foi retornado.');
        }
      },
      error: (err) => {
        console.error('Erro ao cadastrar:', err);
        alert('Erro ao cadastrar!');
      }
    });
  }
}