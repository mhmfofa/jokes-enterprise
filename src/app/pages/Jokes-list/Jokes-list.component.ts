import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, mergeMap, Observable, Subject, takeUntil } from 'rxjs';
import { Joke } from 'src/app/models/joke.model';
import { JokeService } from 'src/app/services/joke.service';

@Component({
  selector: 'app-Jokes-list',
  templateUrl: './Jokes-list.component.html',
  styleUrls: ['./Jokes-list.component.scss']
})
export class JokesListComponent implements OnInit, OnDestroy {

  jokes: Joke[] = [];
  unsubscribe$ = new Subject();

  constructor(private jokeService: JokeService) { }

  ngOnInit(): void {
    this.fetchData();

    interval(5 * 1000)
      .pipe(
        takeUntil(this.unsubscribe$),
        mergeMap(() => this.jokeService.fetchRandomData(1)))
      .subscribe((response: Joke[]) => {
        response[0].isFavorite = this.jokeService.isFavorite(response[0]);
        this.jokes.push(response[0]);
        if (this.jokes.length > 10) {
          this.jokes.shift();
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  fetchData() {
    this.jokeService.fetchRandomData(10).subscribe((response: Joke[]) => this.jokes = response);
  }

  toggleFavorite(item: any) {
    item.isFavorite = !item.isFavorite;
    if (item.isFavorite) {
      this.jokeService.addToFavorite(item);
    } else {
      this.jokeService.removeFromFavorite(item);
    }
  }
}

