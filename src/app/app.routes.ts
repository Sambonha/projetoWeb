import { Routes } from '@angular/router';
import { Dashboard } from './components/pages/dashboard/dashboard';
import { CadastrarTarefas } from './components/pages/cadastrar-tarefas/cadastrar-tarefas';
import { ConsultarTarefas } from './components/pages/consultar-tarefas/consultar-tarefas';
import { EditarTarefas } from './components/pages/editar-tarefas/editar-tarefas';

//Configurar as rotas de navegação do projeto
export const routes: Routes = [
    {
        path: 'dashboard', /* criando a rota */
        component: Dashboard /* página que a rota irá abrir */
    },
    {
        path: 'cadastrar-tarefas',
        component: CadastrarTarefas
    },
    {
        path: 'consultar-tarefas',
        component: ConsultarTarefas
    },
    {
        path: 'editar-tarefas/:id',
        component: EditarTarefas

    },
    {
        path: '', pathMatch: 'full',
        redirectTo: 'dashboard'
    }

];
