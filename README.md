# crawling-style-to-css-file
自动爬取在线UI定义的样式名称到css文件中，免去手动搬运之苦


### 简介
该包借助superagent、cheerio这两个库来实现在线文件的抓取和抓取内容的解析。


### 安装

```
yarn add crawling-online-style-constant-to-css-file -D
```
or
```
npm install crawling-online-style-constant-to-css-file --save-dev
```


### 项目根目录下配置 .crawlingstyletocssfileconfig.json 文件

```
// .crawlingstyletocssfileconfig.json 
{
  "url": "https://docs.qq.com/sheet/DQ2pyQkRyVnJ0UGxZ?tab=BB08J2", // 在线的UI设置颜色文档地址
  "selector": ".DTable tbody tr:gt(1)", // 该文档的样式选择
  "targetFilePath": "./constant.less", // 要输出的内容文件地址 (相对项目根目录) 或绝对路径 D:/xxxx/constant.less
  "isSubtitle": true, // 是否显示分类 分类默认取第一个单元格内文本
  "nameSelector": "td:eq(3)", //
  "valueSelector": "td:eq(5)", //
  "isNeedNote": true, // 是否需要 描述和场景 开启之后才会显示describSelector、scenceSelector对应的值
  "describSelector": "td:eq(1)", //
  "scenceSelector": "td:eq(2)" //
}
```

url:指文档的在线Url

selector: 要操作的选择器

targetFilePath 要输出的内容文件地址 目录+文件 (相对项目根目录) 或绝对路径 D:/xxxx/constant.less 

![字段配置说明](https://raw.githubusercontent.com/tiger-mini/assets/main/img/crawling-style-to-css-file/crawling-syle-to-css-file.png)


![url地址对应的文档](https://raw.githubusercontent.com/tiger-mini/assets/main/img/crawling-style-to-css-file/crawling-docs-online.png)
