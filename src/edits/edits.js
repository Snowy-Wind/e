import Editor from 'wangeditor'
import store from '../store/index'

export function friendEditor(){
  const fEditor =  new Editor('#fEditor');
  fEditor.config.height = 200;//编辑器的高
  fEditor.config.placeholder = '';//编辑器的占位符
  fEditor.config.showLinkImg = false;//编辑器的网络链接图片
  fEditor.config.showFullScreen = false;//编辑器的全屏按钮
  fEditor.config.uploadImgServer = 'upload-img/';//图片上传
  fEditor.config.uploadFileName = 'img';
  // fEditor.config.uploadImgShowBase64 = true
  // fEditor.config.onchange = (newHtml) => {
  //   this.charMess['message'] = newHtml
  // }
  fEditor.config.menus=[
    'emoticon',//表情
    'fontName',//字体
    'fontSize',//字体大小
    'foreColor',//字体颜色
    'bold',
    'italic',
    'image',//图片
    'undo',
    'redo'
  ];
  fEditor.create()//创建图片
  return fEditor;
}

export function articleEditor(){
  const ArticleEditor =  new Editor('#ArticleEditor');
  ArticleEditor.config.height = store.state.clientHeight - 200;
  ArticleEditor.config.showLinkImg = false;
  ArticleEditor.config.uploadImgServer = 'upload-img/';
  ArticleEditor.config.uploadFileName = 'img';
  ArticleEditor.config.zIndex = 0
  ArticleEditor.config.menus=[
    'bold',
    'fontSize',
    'fontName',
    'italic',
    'underline',
    'strikeThrough',
    'lineHeight',
    'foreColor',
    'backColor',
    'link',
    'list',
    'justify',
    'emoticon',
    'image',
    'sqlitLine',
    'undo',
    'redo'
  ]
  ArticleEditor.create();
  return ArticleEditor;
}