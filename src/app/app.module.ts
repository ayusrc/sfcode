/*! \file
Default app module file of Angular containing imports, declarations and providers.
*/

import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppRoutingModule, routerComponents} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ApiService} from './api.service';
import {IdeCompileComponent} from './ide-compile/ide-compile.component';
import {InputComponent} from './input/input.component';
import {SaveFileComponent} from './save-file/save-file.component';
import {FileComponent} from './file/file.component';
import {FileService} from './file.service';
import { SubmitTryCodeComponent } from './submit-try-code/submit-try-code.component';
import { FileDirCardComponent } from './file-dir-card/file-dir-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routerComponents,
    IdeCompileComponent,
    InputComponent,
    SaveFileComponent,
    FileComponent,
    SubmitTryCodeComponent,
    FileDirCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ApiService, FileService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
