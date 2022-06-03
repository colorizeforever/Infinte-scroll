import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CharacterService} from "../services/character.service";
import {Subject, Subscription} from "rxjs";
import { NgxSpinnerService} from "ngx-spinner";
import { CharactetsI } from "../models/charactets.model";

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollComponent implements OnInit, OnDestroy, AfterViewInit {
 @ViewChildren('theLastList') private theLastList!: QueryList<ElementRef>;
 private characterSub$: Subscription = new Subscription();
 public characters: CharactetsI[] = [];
 public totalPages: number = 0;
 public currPage: number = 1;
 private observer!: IntersectionObserver;
 private unsubscribe$: Subject<void> = new Subject<void>();

 constructor(
   private characterService: CharacterService,
   private spinner: NgxSpinnerService
   ) { }

  ngOnInit(): void {
    this.getCharacters()
  }

  ngAfterViewInit() {
    this.theLastList.changes.subscribe((data) => {
      if(data.last) this.observer.observe(data.last.nativeElement)
    })
  }

    public getCharacters() {
       this.intersectionObserver()
       this.spinner.show()
       this.characterSub$ = this.characterService.getCharacters(this.currPage)
          .subscribe((data) => {
            data.results.forEach((character: CharactetsI) => {
              this.characters.push(character)
            })
            this.spinner.hide()
            this.totalPages = data.info.pages;
          })
      }

    private intersectionObserver() {
      const options = {
        root: document.querySelector('#scrollArea'),
        rootMargin: '2px',
        threshold: 0.5
      };
      this.observer = new IntersectionObserver((entry) => {
        if(entry[0].isIntersecting) {
          if(this.currPage < this.totalPages) {
            this.currPage++;
            this.getCharacters();
          } else if(this.currPage === this.totalPages) {
            this.currPage = 1;
          }
        }
      }, options)
     }

    ngOnDestroy() {
      this.observer.disconnect();
      this.unsubscribe$.next()
      this.unsubscribe$.complete()
    }

}
