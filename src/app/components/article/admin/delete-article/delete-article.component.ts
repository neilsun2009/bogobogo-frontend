import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Article } from '../../../../models/article';
import { ArticleService } from '../../../../services/api/article.service';

@Component({
  selector: 'app-delete-article',
  templateUrl: './delete-article.component.html',
  styleUrls: ['./delete-article.component.less']
})
export class DeleteArticleComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteArticleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Article,
    private articleService: ArticleService
  ) { }

  delete() {
    this.articleService.delete({_id: this.data._id},
      (data) => {
        this.dialogRef.close(true);
      }, this.handleError);
  }

  private handleError(err) {
    alert(`网络错误：${err.message}`);
    console.log(err);
  }

}
