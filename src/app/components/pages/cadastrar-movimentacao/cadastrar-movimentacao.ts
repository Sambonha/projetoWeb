import { Component, inject, signal } from '@angular/core';
import { Menu } from '../../shared/menu/menu';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastrar-movimentacao',
  imports: [
    Menu,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-movimentacao.html',
  styleUrl: './cadastrar-movimentacao.css'
})
export class CadastrarMovimentacao {

    //Atributos
  categorias = signal<any[]>([]); //array vazio
  mensagem = signal<string>(''); //texto vazio

  //Criando um objeto do tipo HttpClient
  private http = inject(HttpClient);

  //função para, ao abrir a página, consultar as categorias na API
  ngOnInit() {
    //fazendo uma chamada para o serviço de consulta de categorias
    this.http.get('http://localhost:8083/api/v1/categorias')
             .subscribe((dados) => this.categorias.set(dados as any[]));
  }

  //Estrutura do formulário
  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    data: new FormControl('', [Validators.required]),
    valor: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    categoriaId: new FormControl('', [Validators.required])
  });

  //função para executar o cadasto da tarefa
  cadastrarMovimentacao() {

    //fazendo uma requisição para o serviço de cadastro da API
    this.http.post('http://localhost:8083/api/v1/movimentacoes', this.formulario.value)
      .subscribe((resposta: any) => { //capturando o retorno da API
        //guardar o valor da variável resposta no atributo mensagem da classe
        this.mensagem.set(`Movimentação ${resposta.nome} cadastrada com sucesso!`);
        //limpar os campos do formulário
        this.formulario.reset();
      });
  }

}
