import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularMarkdownEditorModule } from 'angular-markdown-editor';
import { MarkdownModule, MarkdownService, MarkedOptions } from 'ngx-markdown';
import { CreateArticleComponent } from './create-article.component';

xdescribe('CreateArticleComponent', () => {
  let component: CreateArticleComponent;
  let fixture: ComponentFixture<CreateArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateArticleComponent],
      imports: [
        ReactiveFormsModule,
        AngularMarkdownEditorModule.forRoot(),
        HttpClientModule,
        RouterTestingModule,
        MarkdownModule,
      ],
      providers: [MarkdownService, MarkedOptions],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
