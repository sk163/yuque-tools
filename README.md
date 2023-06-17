# 语雀知识库批量导出和再处理工具(非TOKEN方式,非官方)  

![](https://badgen.net/npm/dm/yuque-tools)
![](https://badgen.net/npm/v/yuque-tools)
![](https://badgen.net/npm/node/next)

[了解实现过程-与其它工具有什么不一样](https://github.com/vannvan/yuque-tools/blob/main/ABOUT.md)

## 样例

[![example.gif](https://www.z4a.net/images/2023/05/01/example.gif)](https://www.z4a.net/image/VmUHiO)

## 使用方式

整体步骤

pull -> 登录 -> 交互式选择知识库 -> 等待下载完成

目前登录完成后会设置一天的有效时间，也就是说在24小时之内重复导出只有第一次需要登录。

### CLI方式

#### 安装
>
> npm i yuque-tools -g 安装到全局
> npm i yuque-tools 安装到局部  
> 安装到全局以下方法使用`ytool xx`,安装到局部以下方法使用`npx ytool xx`

#### pull 导出

创建目录`yuque-docs`并进入目录

> ytool pull <知识库 ｜ 知识库> <是否跳过本地相同文件>

##### 导出示例

- `all`表示导出所有知识库
- `skip`表示导出时不覆盖本地文件

以上两个参数生效的前提是`userName`和`password`同时存在

> ytool pull 18989XXX xxxx 个人日记 其它XXX skip   表示导出个人日记 其它XXX这两个知识库并不覆盖本地文件

> ytool pull 18989XXX xxxx all skip 表示导出所有并不覆盖本地文件

> ytool pull 什么都没有传的情况下，以上所有需要的信息都会进入交互式问询环节

#### clean 清除缓存

> ytool clean  

#### TIPS

同时，账号信息支持配置化,适合长期使用  `yuque-docs/yuque.config.json`

```json
{
  "userName": "XXX",
  "password": "XXX",
  "tocRange":["个人日记","其它XXX"], // 知识库范围，支持正则匹配
  "skipDoc": false // 是否跳过本地已存在文件
}
```

### 程序包

此方式适用于无`Node`环境的朋友们(试验方案，不能确保所有平台都能使用)👉
[程序包](https://github.com/vannvan/yuque-tools/releases/tag/v1.0.0-beta)

## issues

[反馈意见](https://github.com/vannvan/yuque-tools/issues)
[更新记录⭐️](https://github.com/vannvan/yuque-tools/issues/9)

欢迎提意见或参与功能优化工作，如果有帮助欢迎点个鼓励的⭐️
