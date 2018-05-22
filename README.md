# ng-chips
This has been created with Angular-CLI 6.0.3's library support

## Using
```npm install git+https://github.com/nathangrove/ng-chips.git```

### app.module.ts

    import { BrowserModule } from  '@angular/platform-browser';
    import { NgModule } from  '@angular/core';
    import { AppComponent } from  './app.component';
    import { ChipsComponent } from  'chips';
      
    @NgModule({
      declarations: [
        AppComponent,
        ChipsComponent
      ],
    imports: [ BrowserModule ],
    providers: [ ],
      bootstrap: [AppComponent]
    })
    export  class  AppModule { }

### app.component.ts

    import { Component } from  '@angular/core';
    
    export class State {
      name: string;
      abbreviation: string;
      population: number;
    }
    
    @Component({
      selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
      })
      export  class  AppComponent {

      selectedStates: State[] = [];
      states: State[] = [{
        name: "Missouri",
        abbreviation: "MO",
        population: 6113532
      },{
        name: "Kansas",
        abbreviation: "KS",
        population: 2913123
      },{
        name: "Nebraska",
        abbreviation: "NB",
        population: 1920076
      },{
        name: "California",
        abbreviation: "CA",
        population: 39536653
      }];    
        constructor( ){ 
          // pick states with less than 30mil population
          this.selectedStates = this.states.filter( s => s.population < 30000000 );
        }
      }
    });

### app.component.html

    <ng-chips
      [value]="selectedStates"
      [options]="states"
      displayKey="name"
      valueKey="abbreviation"
      emptyState="Select State"
      placeholder="+ State"
      (onChange)="selectedStates=$event"
      keepopen="false"
      mulitple="true"
      disabled="false"
    ></ng-chips>

    Selected States:
    <ul>
      <li *ngFor="let state of selectedStates">{{ state.name }} ({{ state.abbreviation }}) - {{ state.population }}</li>
    </ul>

### HTML Element
HTML Element attributes and descriptions

    <ng-chips
      [value]="[]" <!-- Array (string[]) of default values -->
      [options]="[]" <!-- Array of objects that are to provide options -->
      displayKey="display" <!-- attribute of the option object to show as the choice defaults to "display" -->
      valueKey="value" <!-- attribute of the option object that is actually the value defaults to "value" -->
      
      emptyState="Select Tag" <!-- what to show when there are no tags selected -->
      placeholder="+ Tag" <!-- What to show to indicate to add another tag -->
      
      (onChange)="setValues($event)" <!-- Emits an array of option objects that are currently selected -->
      
      [keepopen]="false" <!-- keep the modal open to select mulitple options at tone time ? -->
      [multiple]="false" <!-- Allow multiple tags to be selected -->
      [disabled]="false" <!-- Boolean indicating if disabled/readonly -->
    ></ng-chips>



## Development
 ### Setup
    $ ng new ng-chips-dev  
    $ cd ng-chips-dev
    $ ng generate library ng-chips  
    $ rm -rf projects/ng-chips  
    $ git clone https://github.com/nathangrove/ng-chips-dev.git ng-chips  
  ### Build
    $ ng build ng-chips