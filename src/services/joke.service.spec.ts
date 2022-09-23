import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JokeService } from './joke.service';
import { firstValueFrom } from 'rxjs';

describe('JokeService', () => {
  let service: JokeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(JokeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch jokes', () => {
    service.fetchRandomData(10).subscribe((res)=> {
      expect(res.jokes.length).toEqual(10);
    });
  });
});
