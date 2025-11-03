import { Routes } from '@angular/router';
import { Dashboard } from './components/pages/dashboard/dashboard';
import { CadastrarTarefas } from './components/pages/cadastrar-tarefas/cadastrar-tarefas';
import { ConsultarTarefas } from './components/pages/consultar-tarefas/consultar-tarefas';
import { EditarTarefas } from './components/pages/editar-tarefas/editar-tarefas';
import { CriarUsuario } from './components/pages/criar-usuario/criar-usuario';
import { AutenticarUsuario } from './components/pages/autenticar-usuario/autenticar-usuario';
import { CadastrarMovimentacao } from './components/pages/cadastrar-movimentacao/cadastrar-movimentacao';
import { ConsultarMovimentacoes } from './components/pages/consultar-movimentacoes/consultar-movimentacoes';
import { EditarMovimentacao } from './components/pages/editar-movimentacao/editar-movimentacao';
import { AuthGuard } from './guards/auth.guard';



export const routes: Routes = [
    {
        path: 'criar-usuario',
        component: CriarUsuario
    },
    {
        path: 'autenticar-usuario',
        component: AutenticarUsuario
    },

    {
        path: 'dashboard',
        component: Dashboard, 
        canActivate:[AuthGuard]
    },
    {
        path: 'cadastrar-tarefas',
        component: CadastrarTarefas, 
        canActivate:[AuthGuard]
    },
    {
        path: 'consultar-tarefas',
        component: ConsultarTarefas, 
        canActivate:[AuthGuard]
    },
    {
        path: 'editar-tarefas/:id',
        component: EditarTarefas, 
        canActivate:[AuthGuard]
    },
    {
        path: 'cadastrar-movimentacao',
        component: CadastrarMovimentacao, 
        canActivate:[AuthGuard]
    },
    {
        path: 'consultar-movimentacoes',
        component: ConsultarMovimentacoes, 
        canActivate:[AuthGuard]
    },
    {
        path: 'cadastrar-movimentacao',
        component: EditarMovimentacao, 
        canActivate:[AuthGuard]
    },
    {
        path: '', pathMatch: 'full',
        redirectTo: 'autenticar-usuario'
    },
     { path: 'editar-movimentacao/:id',
         component: EditarMovimentacao }
];
