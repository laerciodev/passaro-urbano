import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pedido } from './shared/pedido.model';
import { URL_API } from './app.api';

@Injectable()

export class OrdemCompraService {

    constructor(private http: HttpClient) {}

    public efetivarCompra(pedido: Pedido) {
        
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json'
            })
        } 

        return this.http.post(
            `${URL_API}/pedidos`,
            JSON.stringify(pedido),
            httpOptions
        ).toPromise().then(resp => console.log(resp));
    }
}