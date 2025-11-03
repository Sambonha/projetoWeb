import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-autenticar-usuario',
  imports: [
    CommonModule, //Funções básicas do Angular
    FormsModule, //Funções para formulários
    ReactiveFormsModule //Funções para formulários reativos
  ],
  templateUrl: './autenticar-usuario.html',
  styleUrl: './autenticar-usuario.css'
})
export class AutenticarUsuario {

  private http = inject(HttpClient);

  //Programando o formulário
  formulario = new FormGroup({
    //Definir os campos do formulário
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)])

  });

  autenticarUsuario() {

    this.http.post('http://localhost:8082/api/v1/usuarios/autenticar', this.formulario.value)
      .subscribe({
        next: (data: any) => {
          //salvar o token no localStorage
          sessionStorage.setItem('usuario', JSON.stringify(data));
          
          location.href = '/dashboard';
        },
        error: (e) => {

          alert("erro ao autenticar o usuário");
          
        }
      });
  }

}
