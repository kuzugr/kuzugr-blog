import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../shared/services/article.service';
import { Article } from '../../shared/models/article';
import { Category } from '../../shared/models/category';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  params: any;
  articles: Array<Article>;
  articleLoaded: boolean;
  searcyType: string;
  searchTypeValue: string;
  searchTypeLoaded: boolean;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    this.articleLoaded = false;
    this.searchTypeLoaded = false;
    this.getParams();
  }

  getParams() {
    this.route.queryParams.subscribe((params) => {
      this.params = params;
      this.searchArticle();
    });
  }

  searchArticle() {
    this.articleService.searchArticle(this.params).subscribe(
      (response) => {
        this.articles = response;
        if (this.params['category_id']) {
          this.searcyType = 'カテゴリ';
          this.categoryService.loadCategories().then((categories) => {
            if (!!categories) {
              this.setCategoryName(categories);
            }
          });
        } else if (this.params['keyword']) {
          if (this.params['keyword']) {
            this.searcyType = 'キーワード';
            this.searchTypeValue = this.params['keyword'];
          }
        } else {
          this.searcyType = '月別アーカイブ';
          this.searchTypeValue = this.params['date'];
        }

        this.searchTypeLoaded = true;
        if (this.params['category_id'] && this.params['category_id'] === 'all') {
          this.searchTypeLoaded = false;
        }
        this.articleLoaded = true;
      },
      (error) => {},
    );
  }

  setCategoryName(categories: Array<Category>) {
    if (!!categories) {
      categories.forEach((category) => {
        if (category.id === Number(this.params['category_id'])) {
          this.searchTypeValue = category.name;
        }
      });
    }
  }

}
