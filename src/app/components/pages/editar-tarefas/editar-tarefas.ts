import { Component, inject, signal } from '@angular/core';
import { Menu } from '../../shared/menu/menu';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-tarefas',
  imports: [
    Menu,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './editar-tarefas.html',
  styleUrl: './editar-tarefas.css'
})
export class EditarTarefas {

  //Atributos
    categorias = signal<any[]>([]); //array vazio
  
    //Criando um objeto do tipo HttpClient
    private http = inject(HttpClient);
  
    //Objeto para capturar o id da tarefa a ser editada
    private activatedRoute = inject(ActivatedRoute);

    //função para, ao abrir a página, consultar as categorias na API
    ngOnInit() {
      //capturar o id da tarefa a ser editada
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      //fazendo uma chamada para o serviço de consulta da tarefa na API
      this.http.get('http://localhost:8081/api/v1/tarefas/' + id)
               .subscribe((dados: any) => {
                 //preenchendo o formulário com os dados da tarefa retornada pela API
                 this.formulario.setValue({
                    idTarefa: dados.id as string,
                    nomeTarefa: dados.nome as string,
                    dataTarefa: dados.data as string,
                    prioridadeTarefa: dados.prioridade as string,
                    finalizado: dados.finalizado as boolean,
                    idCategoria: dados.categoria.id as string
                 });
               });

      //fazendo uma chamada para o serviço de consulta de categorias
      this.http.get('http://localhost:8081/api/v1/categorias')
               .subscribe((dados) => this.categorias.set(dados as any[]));
    }
  
    //Estrutura do formulário
    formulario = new FormGroup({
      idTarefa: new FormControl('', [Validators.required]),
      nomeTarefa: new FormControl('', [Validators.required]),
      dataTarefa: new FormControl('', [Validators.required]),
      prioridadeTarefa: new FormControl('', [Validators.required]),
      finalizado: new FormControl(false),
      idCategoria: new FormControl('', [Validators.required]),      
    });
  
    //função para executar o cadasto da tarefa
    atualizarTarefa() {  
      //fazendo uma requisição para o serviço de cadastro da API
      this.http.put('http://localhost:8081/api/v1/tarefas', this.formulario.value, { responseType: 'text' })
        .subscribe((resposta) => { //capturando o retorno da API
          alert(resposta); //exibindo a resposta da API
          location.href = '/consultar-tarefas';
        });
    }
}
