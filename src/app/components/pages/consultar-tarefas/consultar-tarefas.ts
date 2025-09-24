import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consultar-tarefas',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './consultar-tarefas.html',
  styleUrl: './consultar-tarefas.css'
})
export class ConsultarTarefas {

  tarefas = signal<any[]>([]);

  private http = inject(HttpClient);

  ngOnInit() {
    this.http.get('http://localhost:8081/api/v1/tarefas')
      .subscribe((dados) => {this.tarefas.set(dados as any[]);
      })
  }

  excluirTarefa(id : String) {

    if(confirm('Deseja realmente excluir esta tarefa?')){
      this.http.delete('http://localhost:8081/api/v1/tarefas/'+ id, { responseType: 'text'})
      .subscribe((resposta) =>{
        alert(resposta);
        this.ngOnInit();
      }
      )
    }

  }




}

