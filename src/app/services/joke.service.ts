import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Joke } from '../models/joke.model';

@Injectable({
  providedIn: 'root'
})
export class JokeService {

  private readonly baseUrl = 'https://v2.jokeapi.dev/joke/any?type=single&amount=';

  private readonly KEY = 'favorites';

  constructor(private http: HttpClient) { }

  fetchRandomData(amount: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${amount}`).pipe(
      map(
        (response: any) => {
          const jokes: Joke[] = [];
          if (amount > 1) {
            response.jokes.map(((item: any) => {
              jokes.push(this.convertToJoke(item));
            }))
          } else {
            jokes.push(this.convertToJoke(response));
          }
          return jokes;
        }
      ));
  }

  addToFavorite(item: any) {
    const favorites: Joke[] = this.getFavorites();
    favorites.unshift(item);
    if (favorites.length > 10) {
      favorites.pop();
    }
    localStorage.setItem(this.KEY, JSON.stringify(favorites))
    return favorites;
  }

  removeFromFavorite(item: any) {
    let favorites: Joke[] = this.getFavorites();
    favorites = favorites.filter(f => f.id !== item.id);
    localStorage.setItem(this.KEY, JSON.stringify(favorites));
    return favorites;
  }

  getFavorites(): Joke[] {
    const favorites = localStorage.getItem(this.KEY);
    return JSON.parse(favorites || '[]');
  }

  isFavorite(item: Joke) {
    const favorites = this.getFavorites();
    return favorites.some(s => s.id === item.id);
  }

  private convertToJoke(item: any): Joke {
    return {
      category: item.category,
      id: item.id,
      isFavorite: this.isFavorite(item),
      text: item.joke
    }
  }
}

