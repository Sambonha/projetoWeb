import { Component, inject, signal } from '@angular/core';
import { Menu } from '../../shared/menu/menu';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-movimentacao',
  imports: [
    Menu,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './editar-movimentacao.html',
  styleUrls: ['./editar-movimentacao.css']
})
export class EditarMovimentacao {

  categorias = signal<any[]>([]);

  private http = inject(HttpClient);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  formulario = new FormGroup({
    id: new FormControl('', [Validators.required]),
    nome: new FormControl('', [Validators.required]),
    data: new FormControl('', [Validators.required]),
    valor: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    categoriaId: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get(`http://localhost:8083/api/v1/movimentacoes/${id}`)
      .subscribe((dados: any) => {
        this.formulario.setValue({
          id: dados.id,
          nome: dados.nome,
          data: dados.data,
          valor: dados.valor,
          tipo: dados.tipo,
          categoriaId: dados.categoria.id
        });
      });

    this.http.get('http://localhost:8083/api/v1/categorias')
      .subscribe((dados) => this.categorias.set(dados as any[]));
  }

  atualizarMovimentacao() {
    this.http.patch(`http://localhost:8083/api/v1/movimentacoes/${this.formulario.value.id}`, this.formulario.value)
      .subscribe((resposta: any) => {
        alert(`Movimentação atualizada com sucesso: ${resposta.nome}`);
        this.router.navigate(['/consultar-movimentacoes']); // navegação consistente com tarefas
      });
  }
}
