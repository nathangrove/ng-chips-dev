import { Component, ChangeDetectorRef, IterableDiffers, Input, Output, EventEmitter, AfterViewInit, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'ng-chips',
  template: `
  <div id="ng-chips-wrapper" (click)="toggleSelector()">
  
    <div class="placeholder" *ngIf="!value.length">{{ emptyState }}</div>
    
      <div *ngFor="let chip of value" class="chipit">
        <div [ngClass]="{'disabled': disabled, 'value': true}">{{ chip[displayKey] }}</div>
        <div class="remove" *ngIf="!disabled" (click)="remove(chip)">x</div>
      </div>
    
      <div class="addition" *ngIf="value.length && getOptions().length && !disabled && multiple">{{ placeholder }}</div>
    
      <div class="clearfix"></div>
    </div>
  
    <div id="ng-chips-selector" class="rounded" *ngIf="selectorOpen">
      <input type="text" (keyup)="search($event)" class='search' placeholder="Search" focusOnInit />
    <div *ngFor="let option of getOptions()" (click)="add(option)" [ngClass]="{'option': true, 'focused': getOptions()[optionsPointer] == option }">{{ option[displayKey] }}</div>
  </div>
  `,
  styleUrls: [
    './chips.component.css'
  ],
  host: {
    '(document:click)': 'closeSelector()',
  }
})

export class ChipsComponent {
  
  selectorOpen: boolean = false;
  searchString: string = '';
  
  // default value
  @Input() value: any[] = [];
  
  // is it disabled or "readonly"
  @Input() disabled: boolean = false;
  
  // available options
  @Input() options: any[] = [];
  
  // placeholder text on empty state
  @Input() emptyState: string = 'Select Tag';
  
  // the tag to add another
  @Input() placeholder: string = '+ Tag';
  
  // keep open to allow multiple to be selected?
  @Input() keepopen: boolean = false;
  
  // allow multiple options
  @Input() multiple: boolean = false;
  
  @Input() displayKey: string = 'display';
  @Input() valueKey: string = 'value';
  
  // emitter to emit a change...
  @Output() onChange = new EventEmitter<any[]>();
  
  iterableDiffer: any;
  
  optionsPointer: number = -1;
  
  constructor(
    private ref: ChangeDetectorRef,
    private _iterableDiffers: IterableDiffers
  ) { 
    this.iterableDiffer = this._iterableDiffers.find([]).create(null);
  }
  
  ngOnInit(){
    let self = this;
    /*
    document.onkeydown = function(event){
      if (event.keyCode == 38){ // up
        self.optionsPointer--;
      } else if (event.keyCode == 40) { // down
        self.optionsPointer++;
      }
    }
    */
  }
  
  
  add(option: any){
    this.value.push(option);
    if (this.keepopen && this.getOptions().length) this.openSelector();
    this.optionsPointer = -1;
    this.onChange.next(this.value);
  }
  
  remove(option: any){
    this.value = this.value.filter( v => v[this.valueKey] != option[this.valueKey] );
    this.onChange.next(this.value);
  }
  
  getOptions(){
    let self = this;
    if (!this.value) this.value = [];
    return this.options.filter( o => this.value.map( v => v[this.valueKey] ).indexOf(o[this.valueKey]) == -1 ).filter( o => self.searchString == '' || o[this.displayKey].toLowerCase().indexOf( self.searchString.toLowerCase()) > -1);
  }
  
  toggleSelector(){
    if (!this.selectorOpen && this.value.length && !this.multiple) return;
    if (this.selectorOpen) this.closeSelector();
    else this.openSelector();
  }
  
  search(event?){
    this.searchString = event.target.value;
    this.ref.detectChanges();
  }
  
  openSelector(){
    let self = this;
    setTimeout(() => {
      self.selectorOpen = true;
    },100)
  }
  
  closeSelector(){
    if (!this.selectorOpen) return;
    this.selectorOpen = false;
    this.searchString = '';
    this.ref.detectChanges();
  }
  
  ngDoCheck() {
    if (!this.value) return;
    let changes = this.iterableDiffer.diff(this.value);
    if (changes) {
      let proposed = this.value.filter( (v,idx,self) => self.map( m => m[this.valueKey]).indexOf(v[this.valueKey]) === idx );
      if (this.value.length !== proposed.length) this.value = proposed;
    }
  }
  
}
