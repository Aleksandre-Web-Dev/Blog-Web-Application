import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { MainSearch } from './mainSearch.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [HttpClientModule, QuillModule.forRoot()],
  exports: [
    HttpClientModule,
    UserHeaderComponent,
    QuillModule,
    ReactiveFormsModule,
    MainSearch,FormsModule
  ],
  declarations: [UserHeaderComponent, MainSearch],
})
export class SharedModule {}
