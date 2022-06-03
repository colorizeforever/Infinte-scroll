import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable} from "rxjs";
import { CharactersResponseI } from "../models/charactets.model";

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

 constructor(private http: HttpClient) { }

 public getCharacters(page: number): Observable<CharactersResponseI> {
    return this.http.get<CharactersResponseI>(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .pipe(delay(500));
 }
}
