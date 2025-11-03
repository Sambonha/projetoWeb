import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [
    RouterLink,
    CommonModule,
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {

  nomeUsuario = signal<string>('');
  emailUsuario = signal<string>('');

  //Evento executado quando a página é carregada
  ngOnInit(): void {
    //ler os dados do usuário gravado em sessão
    const data = sessionStorage.getItem('usuario');
    //converter os dados de JSON para objeto
    const usuario = JSON.parse(data!);
    //capturar o nome do usuário e o email 
    this.nomeUsuario.set(usuario.nome);
    this.emailUsuario.set(usuario.email);
  }

  //Função para efetuar logout
  logout(): void {
    if (confirm('Deseja realmente sair do sistema?')) {
      //apagar os dados da sessão
      sessionStorage.clear();
      //redirecionar para a página de login
      location.href = '/autenticar-usuario';
    }
  }

}
