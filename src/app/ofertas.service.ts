import { HttpClient, Response } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Oferta } from './shared/oferta.model';
import { URL_API } from './app.api';

@Injectable()

export class OfertasService {

  constructor(private http: HttpClient) {}

  // efetuar uma requisição http
  // retornar uma promise com um array de ofertas
  public getOfertas(): Promise<Oferta[]> {
    return this.http.get(`${URL_API}/ofertas?destaque=true`)
      .toPromise()
      .then((resposta: Response) => resposta);
  }

  public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
     return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
      .toPromise()
      .then((resposta: Response) => resposta);
  }

  public getOfertaPorId(id: number): Promise<Oferta> {
    return this.http.get(`${URL_API}/ofertas?id=${id}`)
      .toPromise()
      .then((resposta: Response) => resposta.shift());
  }

  public getComoUsarOfertasPorId(id: number): Promise<string> {
    return this.http.get(`${URL_API}/como-usar?id=${id}`)
      .toPromise()
      .then((resposta: Response) => resposta[0].descricao);
  }

  public getOndeFicaOfertasPorId(id: number): Promise<string> {
    return this.http.get(`${URL_API}/onde-fica?id=${id}`)
      .toPromise()
      .then((resposta: Response) => resposta[0].descricao);
  }

  public pesquisaOfertas(termo: string): Observable<Oferta[]> {
    return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
      .pipe(
        ((resposta: Response) => resposta)
      );
  }

}
