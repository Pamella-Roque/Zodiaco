import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-mensagem-plano-basico',
  imports: [CommonModule], 
  template: `
    <div *ngIf="mensagem" class="alert alert-warning">
      {{ mensagem }}
      <button (click)="onUpgrade.emit()" class="btn-base update-button" style="margin-left: 10px;">
        Fazer Upgrade
      </button>
    </div>
  `
})
export class MensagemPlanoBasicoComponent {
  @Input() mensagem: string = '';
  @Output() onUpgrade = new EventEmitter<void>();
}
