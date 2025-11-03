import { Component, inject, signal } from '@angular/core';
import { Menu } from '../../shared/menu/menu';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-consultar-movimentacoes',
  imports: [
    Menu,
    RouterLink,
    CommonModule
  ],
  templateUrl: './consultar-movimentacoes.html',
  styleUrls: ['./consultar-movimentacoes.css']
})
export class ConsultarMovimentacoes {

  movimentacoes = signal<any[]>([]);

  private http = inject(HttpClient);
  private router = inject(Router);

  ngOnInit() {
    this.carregarMovimentacoes();
  }

  carregarMovimentacoes() {
    this.http.get('http://localhost:8083/api/v1/movimentacoes')
      .subscribe((dados) => this.movimentacoes.set(dados as any[]));
  }

  excluirMovimentacao(id: string) {
    if (confirm('Deseja realmente excluir esta movimentação?')) {
      this.http.delete(`http://localhost:8083/api/v1/movimentacoes/${id}`, { responseType: 'text' })
        .subscribe((resposta) => {
          alert(resposta);
          this.carregarMovimentacoes(); // recarrega os dados
        });
    }
  }

  editarMovimentacao(id: string) {
    this.router.navigate(['/editar-movimentacao', id]);
  }
}
