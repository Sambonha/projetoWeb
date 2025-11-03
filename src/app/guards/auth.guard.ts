import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {


    private router = inject(Router);


    canActivate(){

        //verifica se está autenticado
        const usuario = sessionStorage.getItem('usuario');
        if(usuario){
            return true; //tem permissão para acessar a rota
        }
        else{
            this.router.navigate(['/autenticar-usuario']);
            return false; //não tem permissão para acessar a rota
        }
    }
}