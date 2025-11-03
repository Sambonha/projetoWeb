import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarMovimentacao } from './cadastrar-movimentacao';

describe('CadastrarMovimentacao', () => {
  let component: CadastrarMovimentacao;
  let fixture: ComponentFixture<CadastrarMovimentacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarMovimentacao]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarMovimentacao);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
