import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarMovimentacoes } from './consultar-movimentacoes';

describe('ConsultarMovimentacoes', () => {
  let component: ConsultarMovimentacoes;
  let fixture: ComponentFixture<ConsultarMovimentacoes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarMovimentacoes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarMovimentacoes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
