#!/usr/bin/env node

const fs = require("fs");
const superagent = require("superagent");
const cheerio = require("cheerio");

const root = process.cwd(); // 根目录
const configFileName = '\\\.crawlingstyletocssfileconfig.json';

const config = require(root + configFileName); // 读取json文件

const {
    url,
    selector,
    targetFilePath,
    isSubtitle,
    nameSelector,
    valueSelector,
    isNeedNote,
    describSelector,
    scenceSelector
} = config;

superagent
    .get(url)
    .end((error, response) => {
        //获取页面文档数据
        const content = response.text;
        //cheerio也就是nodejs下的jQuery  将整个文档包装成一个集合，定义一个变量$接收
        const $ = cheerio.load(content);
        //定义一个字符串变量，用来接收数据
        let result = '';
        //分析文档结构
        $(selector).each((index, value) => {
            const subjectTitle = $(value).find('td:eq(0)').text();
            const name = $(value).find(nameSelector).text();
            const colorValue = $(value).find(valueSelector).text();

            let describ = $(value).find(describSelector).text();
            const scence = $(value).find(scenceSelector).text();
            if (isNeedNote) {
                if (describ && scence) {
                    describ += ' 【使用场景:' + scence + '】';
                } else if (scence) {
                    describ += scence;
                }
            } else {
                describ = '';
            }

            if (isSubtitle && subjectTitle && !name && !colorValue) {
                if (result === '') {
                    result += `//${subjectTitle}\r\n`;
                } else {
                    result += `\r\n//${subjectTitle}\r\n`;
                }
            }
            if (name) {
                if (describ) {
                    result += `@${name}: #${colorValue}; // ${describ} \r\n`;
                } else {
                    result += `@${name}: #${colorValue};  \r\n`;
                }
                result += `@${name}: #${colorValue};  \r\n`;
            }
        });

        if (targetFilePath.indexOf('/') > -1) {
            const _arr = targetFilePath.split('/');
            if (_arr.length > 2) {
                _arr.pop();
            }
            const checkPath = _arr.join('/');
            fs.exists(checkPath, function(exists) {
                if (!exists) {
                    console.log('Ooooops! targetFilePath Folder is not exist');
                    return;
                }
            });
        }


        fs.writeFile(targetFilePath, result, "utf-8", (error) => {
            if (error == null) {
                console.log('congratulations operation successful!')
            }
        });
    });
