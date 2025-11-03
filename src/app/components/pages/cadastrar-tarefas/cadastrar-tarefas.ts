import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Menu } from '../../shared/menu/menu';

@Component({
  selector: 'app-cadastrar-tarefas',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Menu
  ],
  templateUrl: './cadastrar-tarefas.html',
  styleUrl: './cadastrar-tarefas.css'
})
export class CadastrarTarefas {

  categorias = signal<any[]>([]);
  mensagem = signal<string>('');

  private http = inject(HttpClient);
 

  ngOnInit() {
    this.http.get('http://localhost:8081/api/v1/categorias')
      .subscribe((dados) => this.categorias.set(dados as any[]));
  }

  formulario = new FormGroup({
    nomeTarefa: new FormControl('', [Validators.required]),
    dataTarefa: new FormControl('', [Validators.required]),
    prioridadeTarefa: new FormControl('', [Validators.required]),
    idCategoria: new FormControl('', [Validators.required])
  });

  cadastrarTarefa() {
    this.http.post('http://localhost:8081/api/v1/tarefas',
      this.formulario.value, { responseType:'text'})
        .subscribe((resposta)=> {
          this.mensagem.set(resposta);
          this.formulario.reset();
        });
  }

}


