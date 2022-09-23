import { TestBed } from '@angular/core/testing';

import { JokeService } from './joke.service';

describe('JokeService', () => {
  let service: JokeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JokeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch jokes', async () => {

    const data = await service.fetchRandomData(10).toPromise()
    expect(data.jokes.length).toEqual(10);
  });

});
