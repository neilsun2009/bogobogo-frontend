import { Component, OnInit } from '@angular/core';
import { BgConfigService } from '../../../services/bg-config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../../models/article';
import { ArticleService } from '../../../services/api/article.service';
import { QiniuService } from '../../../services/api/qiniu.service';
import * as Color from 'color.js';
import * as Editor from 'wangeditor';
import { DeleteParaComponent } from './delete-para/delete-para.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TitleService } from '../../../services/title.service';
// import * as splashy from 'splashy';
@Component({
  selector: 'app-admin-article',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminArticleComponent implements OnInit {

  mode: string;
  article: Article;
  private dateString: string;
  editors: any[];
  private editorsCodeMode: boolean[];
  progress: {
    name: string;
    percentage: number;
  };
  posted: boolean;
  tags: string[];

  constructor(
    private bgConfigService: BgConfigService,
    private route: ActivatedRoute,
    private router: Router,
    private qiniuService: QiniuService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private titleService: TitleService,
    private articleService: ArticleService
  ) {
    this.editors = [];
    this.editorsCodeMode = [];
    this.progress = {
      name: '',
      percentage: 80
    };
    this.posted = false;
    this.tags = [];
  }

  ngOnInit() {
    document.body.scrollTop = 0;
    this.bgConfigService.setConfig({
      primaryColor: '#798cf2',
      secondaryColor: '#f28979',
      layerBg: 'none',
      showMenu: false,
      showTrigger: true
    });
    this.titleService.setTitle('Article Admin');
    this.calDateString();
    this.route.data.subscribe((data: {article: Article}) => {
      // console.log(data);
      data.article ? this.mode = 'edit' : this.mode = 'new';
      this.article = data.article || {
        _id: '', // server auto-generated
        href: '', // server-generated
        title: '',
        image: '',
        tags: [''],
        cat: '',
        views: 0, // server-calculated
        updateTime: new Date(), // server-generated
        addTime: new Date(),
        primaryColor: '',
        secondaryColor: '',
        isPublic: true,
        paras: [{
          title: '',
          cover: '',
          html: '<p></p>',
          text: ''
        }]
      };
      this.tags = this.article.tags;
      setTimeout(() => {
        // cover image
        this.initQiniu(-1);
        for (let i = 0, len = this.article.paras.length; i < len; ++i) {
          this.initQiniu(i);
          this.initEditor(i);
        }
      }, 100);
    });
  }

  submit() {
    // save editor data
    for (let i = 0, len = this.editors.length; i < len; ++i) {
      if (this.editorsCodeMode[i]) {
        this.editorCodeToggle(i);
      }
      this.article.paras[i].html = this.editors[i].txt.html();
      this.article.paras[i].text = this.editors[i].txt.text();
    }
    console.log(this.article);
    // post or update
    if (this.mode === 'new') {
      this.articleService.add(this.article,
        (data) => {
          this.posted = true;
          this.article = data;
        }, this.handleError);
    } else {
      this.articleService.update(this.article,
        (data) => {
          this.posted = true;
          this.article = data;
        }, this.handleError);
    }
  }

  private handleError(err) {
    alert(`网络错误：${err.message}`);
    console.log(err);
  }

  addPara() {
    this.article.paras.push({
      title: '',
      cover: '',
      html: '<p></p>',
      text: ''
    });
    setTimeout(() => {
      this.initQiniu(this.article.paras.length - 1);
      this.initEditor(this.article.paras.length - 1);
    }, 500);
  }

  deletePara(id) {
    const dialogRef = this.dialog.open(DeleteParaComponent, {
      data: { title: this.article.paras[id].title }
    });

    dialogRef.afterClosed().subscribe(result => {
      let newParas = [];
      if (!result) {
        return;
      }
      // save editor data
      for (let i = 0, len = this.editors.length; i < len; ++i) {
        if (this.editorsCodeMode[i]) {
          this.editorCodeToggle(i);
        }
        this.article.paras[i].html = this.editors[i].txt.html();
      }
      // copy and clear
      newParas = this.article.paras.concat();
      this.article.paras = [];
      this.editors = [];
      this.editorsCodeMode = [];
      newParas.splice(id, 1);
      this.snackBar.open(`The original para ${id + 1} is deleted!`, 'Marvellous!', {
        duration: 1500
      });
      // disable old qiniu listener
      // and set new qiniu listener
      setTimeout(() => {
        this.article.paras = newParas;
        setTimeout(() => {
          for (let i = 0, len = this.article.paras.length; i < len; ++i) {
            // console.log(document.getElementById(`uploadPara${i}Btn`).onclick);
            // document.getElementById(`uploadPara${i}Btn`).onclick = null;
            // document.getElementById(`uploadPara${i}Ctn`).onclick = null;
            this.initQiniu(i);
            this.initEditor(i);
          }
        }, 500);
      }, 200);
    });
  }

  initEditor(id) {
    const editor = new Editor(`#toolbar${id}`, `#editor${id}`);
    // menu
    editor.customConfig.menus = [
      'bold',  // 粗体
      'italic',  // 斜体
      'underline',  // 下划线
      'strikeThrough',  // 删除线
      'link',  // 插入链接
      'list',  // 列表
      'justify',  // 对齐方式
      'quote',  // 引用
      'emoticon',  // 表情
      'image',  // 插入图片
      'table',  // 表格
      'video',  // 插入视频
      'code',  // 插入代码
      'undo',  // 撤销
      'redo'  // 重复
    ];
    // emotions
    editor.customConfig.emotions = [
      {
          // tab 的标题
          title: 'emoji',
          // type -> 'emoji' / 'image'
          type: 'emoji',
          // content -> 数组
          content: '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😓 😪 😴 🙄 🤔 😬 🤐'.split(/\s/)
      }
    ];
    // image upload
    editor.customConfig.uploadImgServer = '/upload';
    editor.customConfig.qiniu = true;
    editor.create();
    editor.txt.html(`${this.article.paras[id].html}`);
    this.editors.push(editor);
    this.editorsCodeMode.push(false);
    // qiniu config
    this.qiniuService.upload(window['Qiniu'], editor.imgMenuId, editor.toolbarElemId, editor.textElemId, `bogobogo/${this.dateString}/`,
    (up, file, info) => {
      const res = JSON.parse(info.response);
      editor.cmd.do('insertHtml', `<img src="${this.qiniuService.domainUrl}${res.key}"/>`);
    }, (up, err, errTip) => {
      alert('err');
      console.log(errTip);
    });
  }

  initQiniu(id) {
    let name = '';
    if (id === -1) {
      name = 'Cover';
    } else {
      name = 'Para' + id;
    }
    this.qiniuService.upload(window['Qiniu'], `upload${name}Btn`, `upload${name}Ctn`, `upload${name}Ctn`, `bogobogo/${this.dateString}/`,
    (up, file, info) => {
      const res = JSON.parse(info.response);
      if (id === -1) {
        this.article.image = `${this.qiniuService.domainUrl}${res.key}`;
        // console.log(Color);
        new Color(`${this.article.image}?imageView2/1/w/400/h/250/q/90|imageslim`, {
          amount: 2,
          format: 'hex',
          sample: 100,
          group: 30
        }).mostUsed(result => {
          this.article.primaryColor = result[0];
          this.article.secondaryColor = result[1];
        });
        // splashy(this.article.image)
        //   .then(result => {
        //     this.article.primaryColor = result.paletteColors[0];
        //     this.article.secondaryColor = result.paletteColors[1];
        //   });
      } else {
        console.log(id);
        this.article.paras[id].cover = `${this.qiniuService.domainUrl}${res.key}`;
      }
    }, (up, err, errTip) => {
      alert('err');
      console.log(errTip);
    });
  }

  calDateString() {
    const date = new Date(),
      year = date.getFullYear(),
      month = ((date.getMonth() + 101) + '').slice(-2),
      day = ((date.getDate() + 100) + '').slice(-2);
    this.dateString = `${year}-${month}-${day}`;
    // console.log(this.dateString);
  }

  tryColor() {
    this.bgConfigService.setConfig({
      primaryColor: this.article.primaryColor,
      secondaryColor: this.article.secondaryColor,
      layerBg: 'none',
      showMenu: false,
      showTrigger: true
    });
  }

  editorCodeToggle(id) {
    if (this.editorsCodeMode[id]) {
      this.editors[id].txt.clear();
      this.editors[id].txt.html(document.getElementById(`editorCode${id}`).innerText);
    } else {
      this.article.paras[id].html = this.editors[id].txt.html();
    }
    this.editorsCodeMode[id] = !this.editorsCodeMode[id];
  }

  editorInsertProgress(id) {
    const text = `<div class="progress">
      ${this.progress.name}
      <div class="outer">
        <div class="bar init" style="width: ${this.progress.percentage}%"></div>
      </div>
    </div>`;
    if (this.editorsCodeMode[id]) {
      document.getElementById(`editorCode${id}`).innerText += text;
    } else {
      this.editors[id].txt.append(text);
    }
  }

  refresh() {
    window.location.href = '/admin-article';
  }

  changeTag(id, value) {
    // console.log(document.getElementById(`tag${id}`).focus);
    // console.log(id, value);
    this.article.tags[id] = value;
    setTimeout(() => {
      document.getElementById(`tag${id}`).focus();
    }, 0);
  }

}
