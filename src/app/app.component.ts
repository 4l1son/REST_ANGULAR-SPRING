import { Component, OnInit } from '@angular/core';
import { CardapioService } from './services/cardapio.service';
import { Cardapio } from './models/cardapio';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cardapio-front';

  food = {} as Cardapio;
  foods: Cardapio[] = [] ;

  constructor(private CardapioService: CardapioService) {}

  ngOnInit() {
    this.getCardapio();
  }

  getCardapio() {
    this.CardapioService.getCardapio().subscribe((foods: Cardapio[]) => {
      this.foods = foods;
    });
  }

  postCardapio() {
    this.CardapioService.postCardapio(this.food).subscribe(
      () => {
        this.getCardapio();
      },
      (error) => {
        console.error('Erro ao enviar requisição POST:', error);
        console.log(this.food);
      }
    );
  }
  

  deleteCardapioById(id: number) {
    this.CardapioService.deleteCardapio(id).subscribe(
      () => {
        this.getCardapio();
      },
      (error) => {
        console.error('Erro ao enviar requisição DELETE:', error);
      }
    );
  }
  
  
}
