import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MensagemPlanoBasicoComponent } from './mensagem-plano-basico';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-feed',
  imports: [CommonModule, RouterModule,MensagemPlanoBasicoComponent],
  templateUrl: './showFeed.html'
})
export class FeedComponent implements OnInit {
  nickname: string = '';
  signo: string = '';
  elemento: string = '';
  plano: string = '';
  frase_do_dia: string = '';
  animal: string = '';
  numero: string = '';
  token: string = '';
  planoBasico: string = '';

  resultado: { signo: string; data: string; texto: string } = { signo: '', data: '', texto: '' };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const storedNickname = localStorage.getItem('nickname');
    const storedToken = localStorage.getItem('token');

    if (storedNickname && storedToken) {
      this.nickname = storedNickname;
      this.token = storedToken;
   
      this.consultardadosUser();

      this.consultarSigno(this.nickname);

      this.gerarFrasedoDia();

    } else {
      alert('Usuário não logado');
      this.router.navigate(['/login']);
    }
  }

  consultardadosUser() {
    const headers = { Authorization: `Bearer ${this.token}` };

    this.http.get(`/api/usuario/consultar/${this.nickname}`, { headers }).subscribe({
      next: (res: any) => {
        this.nickname = res.nickname;
        this.plano = res.plano;
        this.signo = res.signo;
        this.elemento = res.elemento;

        // Atualiza localStorage para manter sincronizado
        localStorage.setItem('plano', this.plano);
        localStorage.setItem('signo', this.signo);
        localStorage.setItem('elemento', this.elemento);

        if (this.plano === 'Avançado') {
          this.gerarNumBicho(this.nickname);
          this.gerarHoroscopo(this.nickname);
        } else {
          this.planoBasico = 'Funcionalidade disponível apenas para o plano Avançado';
          // Limpa dados do plano avnçado
          this.animal = '';
          this.numero = '';
          this.resultado = { signo: '', data: '', texto: '' };
        }

        console.log('Dados atualizados:', res);
      },
      error: (err) => {
        console.error('Erro na consulta dos dados do usuário', err);
        if (err.status === 401) {
          alert('Sessão expirada! Faça login novamente.');
          this.router.navigate(['/login']);
        } else {
          alert('Erro ao consultar dados do usuário.');
        }
      }
    });
  }

  fazerUpgrade() {
    this.router.navigate(['/showperfil']);
  }

  consultarSigno(nickname: string) {
    const headers = { Authorization: `Bearer ${this.token}` };

    this.http.get<any>(`/api/funcionalidades/signo/${nickname}`, { headers }).subscribe({
      next: (res) => {
        this.signo = res.signo;
        this.elemento = res.elemento;
        // Atualiza localStorage também
        localStorage.setItem('signo', this.signo);
        localStorage.setItem('elemento', this.elemento);
      },
      error: (err) => {
        console.error('Erro ao consultar signo', err);
        alert('Erro ao consultar signo!');
      }
    });
  }

  gerarFrasedoDia() {
    this.http.get('/api/funcionalidades/frase').subscribe({
      next: (res: any) => {
        if (res && typeof res === 'object' && 'frase_do_dia' in res) {
          this.frase_do_dia = res.frase_do_dia;
        } else if (typeof res === 'string') {
          this.frase_do_dia = res;
        } else {
          this.frase_do_dia = JSON.stringify(res);
        }
      },
      error: (err) => {
        console.error('Erro ao gerar frase_do_dia', err);
        alert('Erro ao gerar frase_do_dia!');
      }
    });
  }

  gerarNumBicho(nickname: string) {
    const headers = { Authorization: `Bearer ${this.token}` };

    this.http.get<any>(`/api/funcionalidades/bicho/${nickname}`, { headers }).subscribe({
      next: (res) => {
        this.animal = res.animal;
        this.numero = res.numero;
      },
      error: (err) => {
        console.error('Erro ao consultar num do bicho', err);
        alert('Erro ao consultar num do bicho!');
      }
    });
  }

  gerarHoroscopo(nickname: string) {
    const headers = { Authorization: `Bearer ${this.token}` };

    this.http.get<any>(`/api/funcionalidades/horoscopo/${nickname}`, { headers }).subscribe({
      next: (res) => {
        this.resultado = res;
      },
      error: (err) => {
        console.error('Erro ao consultar horóscopo', err);
        alert('Erro ao consultar horóscopo!');
      }
    });
  }
}