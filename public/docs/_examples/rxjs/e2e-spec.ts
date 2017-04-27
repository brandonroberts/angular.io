'use strict'; // necessary for es6 output in node

import { browser, element, by, ElementFinder } from 'protractor';

describe('RxJS', function () {
  let page: any;

  function getPage() {
    return {
      findHrefs: () => element.all(by.css('my-app a')),
      findAddHero: () => element(by.linkText('Add Hero')),
      findHeroes: () => element(by.linkText('Heroes')),
      findHeroCounter: () => element(by.linkText('Hero Counter')),

      findMessageLog: () => element(by.css('message-log')),
      findHeroList: () => element(by.css('ul.items')),
      findHeroListItems: () => element.all(by.css('ul.items li'))
    };
  }

  beforeAll(function () {
    browser.get('');
  });

  beforeEach(() => {
    page = getPage();
  });

  it('should have 10 heroes', () => {
    const heroes = page.findHeroListItems();

    expect(heroes.length).toBe(10);
  });
});
