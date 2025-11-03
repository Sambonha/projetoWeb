import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
import { Menu } from '../../shared/menu/menu';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    ChartModule,
    Menu
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  // Gráficos
  graficoDonut = signal<Chart>(new Chart());
  graficoColunas = signal<Chart>(new Chart());
  graficoBarras = signal<Chart>(new Chart());

  // HTTP
  private http = inject(HttpClient);

  ngOnInit() {
    const coresVermelhas = ['#8B0000', '#B22222', '#FF0000', '#800000', '#A52A2A'];

    // Gráfico Donut - Prioridade
    this.http.get('http://localhost:8081/api/v1/dashboard/tarefas-prioridade')
      .subscribe((dados) => {
        const conteudo: any[] = [];
        (dados as any[]).forEach(item => conteudo.push([item.prioridade, item.quantidade]));

        this.graficoDonut.set(
          new Chart({
            chart: { type: 'pie' },
            title: { text: 'Tarefas por Prioridade' },
            subtitle: { text: 'Quantidade de tarefas por prioridade na agenda.' },
            plotOptions: { pie: { innerSize: '50%', dataLabels: { enabled: true } } },
            series: [{
              type: 'pie',
              name: 'Tarefas',
              data: conteudo.map((item, i) => ({
                name: item[0],
                y: item[1],
                color: coresVermelhas[i % coresVermelhas.length]
              }))
            }],
            credits: { enabled: false },
            legend: { enabled: false }
          })
        );
      });

    // Gráfico Barras - Status
    this.http.get('http://localhost:8081/api/v1/dashboard/tarefas-finalizado')
      .subscribe((dados) => {
        const status: string[] = [];
        const quantidade: number[] = [];
        (dados as any[]).forEach(item => { status.push(item.status); quantidade.push(item.quantidade); });

        this.graficoBarras.set(
          new Chart({
            chart: { type: 'bar' },
            title: { text: 'Tarefas por Status' },
            subtitle: { text: 'Quantidade de tarefas finalizadas e pendentes.' },
            xAxis: { categories: status, crosshair: true, title: { text: 'Status da tarefa' } },
            yAxis: { min: 0, title: { text: 'Quantidade' } },
            plotOptions: { column: { borderRadius: 5 } },
            series: [{
              type: 'column',
              name: 'Tarefas',
              data: quantidade.map((q, i) => ({ y: q, color: coresVermelhas[i % coresVermelhas.length] }))
            }],
            legend: { enabled: false },
            credits: { enabled: false }
          })
        );
      });

    // Gráfico Colunas - Categoria
    this.http.get('http://localhost:8081/api/v1/dashboard/tarefas-categoria')
      .subscribe((dados) => {
        const categoria: string[] = [];
        const quantidade: number[] = [];
        (dados as any[]).forEach(item => { categoria.push(item.categoria); quantidade.push(item.quantidade); });

        this.graficoColunas.set(
          new Chart({
            chart: { type: 'column' },
            title: { text: 'Tarefas por Categoria' },
            subtitle: { text: 'Quantidade de tarefas cadastradas para cada categoria na agenda.' },
            xAxis: { categories: categoria, crosshair: true, title: { text: 'Categoria da tarefa' } },
            yAxis: { min: 0, title: { text: 'Quantidade' } },
            plotOptions: { column: { borderRadius: 5 } },
            series: [{
              type: 'column',
              name: 'Tarefas',
              data: quantidade.map((q, i) => ({ y: q, color: coresVermelhas[i % coresVermelhas.length] }))
            }],
            legend: { enabled: false },
            credits: { enabled: false }
          })
        );
      });
  }
}
