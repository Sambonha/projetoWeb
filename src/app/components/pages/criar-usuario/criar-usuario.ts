import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-usuario',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './criar-usuario.html',
  styleUrl: './criar-usuario.css'
})
export class CriarUsuario {

  //Atributos
  private http = inject(HttpClient);

  //Estrutura do formulário
  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)]),
    senhaConfirmacao: new FormControl('', [Validators.required]),
  });

  //Função para criar o usuário
  criarUsuario() {
    
    //Verificar se a senha do usuário é igual a senha de confirmação
    if(this.formulario.value.senha == this.formulario.value.senhaConfirmacao) {

      //Enviar os dados do formulário para o backend
      this.http.post('http://localhost:8082/api/v1/usuarios/criar', this.formulario.value)
        .subscribe({ //capturar a resposta do backend
          next: (data: any) => { //sucesso
            alert(`Parabéns ${data.nome}, sua conta foi criada com sucesso!`);
            this.formulario.reset(); //limpar o formulário
          },
          error: (e) => { //erro
            alert(e.error); //mensagem de erro vinda do backend
          }
        });
    } 
    else {
      alert("As senhas não coincidem!");
    }
  }
}
