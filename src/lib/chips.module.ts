import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsComponent } from './chips.component';
import { FocusOnInitDirective } from './focus-on-init.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ChipsComponent,
    FocusOnInitDirective
  ],
  exports: [ChipsComponent]
})
export class ChipsModule { }
