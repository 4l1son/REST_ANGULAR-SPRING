import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { Cardapio } from '../models/cardapio';

@Injectable({
  providedIn: 'root'
})

export class CardapioService {

  
  url = 'http://localhost:8080/food'

  constructor(private httpClient: HttpClient) { }

   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getCardapio(): Observable<Cardapio[]> {
    return this.httpClient.get<Cardapio[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError),
        tap(() => console.log('Dados recebidos do servidor'))
      );
  }

  postCardapio(cardapio: Cardapio): Observable<any> {
    return this.httpClient.post<any>(this.url, cardapio, this.httpOptions)
      .pipe(
        catchError(this.handleError),
        tap(() => console.log('Requisição POST enviada para o servidor'))
      );
  }
  deleteCardapio(id: number): Observable<any> {
    const deleteUrl = `${this.url}/${id}`;
    return this.httpClient.delete<any>(deleteUrl)
      .pipe(
        catchError(this.handleError),
        tap(() => console.log(`Requisição DELETE enviada para o servidor com ID ${id}`))
      );
  }
  


  
  getById(id: number): Observable<Cardapio> {
    const urlById = `${this.url}/${id}`;
    return this.httpClient.get<Cardapio>(urlById)
      .pipe(
        catchError(this.handleError),
        tap(() => console.log(`Requisição GET para ${urlById}`))
      );
  }  

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
