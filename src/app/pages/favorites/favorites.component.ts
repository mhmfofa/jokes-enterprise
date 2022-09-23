import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Joke } from 'src/app/models/joke.model';
import { JokeService } from 'src/app/services/joke.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {

  favorites: Joke[] = [];
  private unsubscribe$ = new Subject();

  constructor(private jokeService: JokeService) { }

  ngOnInit(): void {
    this.favorites = this.jokeService.getFavorites();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  removeFromFavorite(item: any) {
    this.favorites = this.jokeService.removeFromFavorite(item);
  }
}
