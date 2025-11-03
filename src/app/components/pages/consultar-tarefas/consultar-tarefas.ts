import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Menu } from '../../shared/menu/menu';

@Component({
  selector: 'app-consultar-tarefas',
  imports: [
    CommonModule,
    RouterLink,
    Menu
  ],
  templateUrl: './consultar-tarefas.html',
  styleUrls: ['./consultar-tarefas.css']
})
export class ConsultarTarefas {
  tarefas = signal<any[]>([]);

  private http = inject(HttpClient);
  private router = inject(Router);

  ngOnInit() {
    this.carregarTarefas();
  }

  carregarTarefas() {
    this.http.get('http://localhost:8081/api/v1/tarefas')
      .subscribe((dados) => this.tarefas.set(dados as any[]));
  }

  excluirTarefa(id: string) {
    if (confirm('Deseja realmente excluir esta tarefa?')) {
      this.http.delete(`http://localhost:8081/api/v1/tarefas/${id}`, { responseType: 'text' })
        .subscribe((resposta) => {
          alert(resposta);
          this.carregarTarefas();
        });
    }
  }

  editarTarefa(id: number | string) {
    this.router.navigate(['/editar-tarefas', id]);
  }
}
