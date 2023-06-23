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

> ytool pull <知识库 | all> <skip 是否跳过本地相同文件> <lb 是否保留语雀换行标签>

##### 导出示例

支持参数：

- `all` 表示导出所有知识库
- `skip` 表示导出时跳过本地同名文件
- `lb` 表示导出时保留语雀换行标签<br/>
- `xxx` `yyy` 表示导出`xxx`和`yyy`两个知识库，知识库之间用空格隔开，同时支持知识库目录，见下方示例：

以[我的测试知识库](https://www.yuque.com/vannvan/dd67e4)为例

以上参数生效的前提是`userName`和`password`同时存在，且在所有参数最前面，后面的参数是无序的

> ytool pull 18989XXX xxxx test-book skip  表示导出`test-book`这个知识库，跳过本地同名文件

> ytool pull 18989XXX xxxx test-book/测试目录 skip  表示导出`test-book`这个知识库下的`测试目录`下的文档，跳过本地同名文件

> ytool pull 18989XXX xxxx test-book other-book skip 表示导出`test-book`和`other-book`两个知识库，跳过本地同名文件

> ytool pull 18989XXX xxxx all skip 表示导出所有知识库，跳过本地同名文件

> ytool pull 什么都没有传的情况下，以上所有需要的信息都会进入交互式问询环节

#### clean 清除缓存

> ytool clean  

#### TIPS

同时，账号信息支持配置化,适合长期使用  `yuque-docs/yuque.config.json`，使用时需要删除注释

```json
{
  "userName": "XXX",
  "password": "XXX",
  "tocRange":["个人日记","其它XXX"], // 知识库范围，支持正则匹配
  "skipDoc": false, // 是否跳过本地已存在文件
  "linebreak": false // 是否保留语雀换行标签
}
```

### 程序包

此方式适用于无`Node`环境的朋友们(试验方案，不能确保所有平台都能使用)👉
[程序包](https://github.com/vannvan/yuque-tools/releases/tag/v1.0.0-beta)

## issues

[反馈意见](https://github.com/vannvan/yuque-tools/issues)
[更新记录⭐️](https://github.com/vannvan/yuque-tools/issues/9)

欢迎提意见或参与功能优化工作，如果有帮助欢迎点个鼓励的⭐️
