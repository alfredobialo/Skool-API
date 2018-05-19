import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoadingComponent} from './LoadingComponent';
import {UserAvatarComponent} from './UserAvatarComponent';
import {AnimatedTextComponent} from './AnimatedTextComponent';



@NgModule({
  imports: [CommonModule, HttpClientModule, BrowserAnimationsModule],
  exports: [CommonModule, HttpClientModule, BrowserAnimationsModule,LoadingComponent,UserAvatarComponent, AnimatedTextComponent],
  declarations: [LoadingComponent,UserAvatarComponent, AnimatedTextComponent],
  providers: [],
})
export class SharedModule {
}
