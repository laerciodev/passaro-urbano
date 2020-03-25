import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})

export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((termo: string) => {
        console.log('requisição http para api');

        if (termo.trim() === '') {

          // retorna um Observable de array de ofertas vazio
          return of<Oferta[]>([]);
        }

        return this.ofertasService.pesquisaOfertas(termo);
      })
    ),
    catchError((err: any) => of<Oferta[]>([]));
  }

  pesquisa(termoDaBusca: string): void {
    console.log('keyup caracter: ', termoDaBusca);
    this.subjectPesquisa.next(termoDaBusca);
  }

}
