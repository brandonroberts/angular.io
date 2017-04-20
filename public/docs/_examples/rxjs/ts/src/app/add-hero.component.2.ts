// #docplaster
// #docregion
// #docregion rxjs-imports-1
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';
// #enddocregion rxjs-imports-1
// #docregion viewchild-imports
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
// #enddocregion viewchild-imports
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Hero } from './hero';
import { HeroService } from './hero.service';

// #docregion rxjs-imports-2
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
// #enddocregion rxjs-imports-2

// #docregion viewchild-heroName
@Component({
  moduleId: module.id,
  templateUrl: './add-hero.component.html',
  styles: [ '.error { color: red }' ]
})
export class AddHeroComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('heroName', { read: ElementRef }) heroName: ElementRef;
// #enddocregion viewchild-heroName

  form: FormGroup;
  showErrors: Observable<boolean>;
  success: Observable<boolean>;
  onDestroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private heroService: HeroService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
  }
// #docregion observable-event
  ngAfterViewInit() {
    const controlBlur$: Observable<Event> = Observable.fromEvent(this.heroName.nativeElement, 'blur');

    this.showErrors = Observable.merge(
      controlBlur$
    )
    .takeUntil(this.onDestroy$)
    .map(() => !this.form.valid);
  }
// #enddocregion observable-event

  ngOnDestroy() {
    this.onDestroy$.complete();
  }

  save(model: Hero) {
    this.success = this.heroService.addHero(model.name)
      .map(() => true)
      .catch(() => Observable.of(false));
  }
}
