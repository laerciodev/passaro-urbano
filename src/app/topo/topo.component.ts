import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable, Subject } from 'rxjs';
import { switchMap, debounceTime } from 'rxjs/operators';
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
      switchMap((termo: string) => {
        console.log('requisição http para api');
        return this.ofertasService.pesquisaOfertas(termo);
      })
    );
    
    this.ofertas.subscribe(value => console.log(value));
  }

  pesquisa(termoDaBusca: string): void {
    console.log('keyup caracter: ', termoDaBusca);
    this.subjectPesquisa.next(termoDaBusca);
  }

}
