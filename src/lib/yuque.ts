import jsdom from 'jsdom'
import { setExpireTime, genPassword, Log, setJSONString } from './tool.js'
import { config as CONFIG } from '../config.js'
import { get, post } from './request.js'
import { IAccountInfo, ILoginResponse, TBookItem, TBookStackItem, TDocItem } from './type'
import F from './file.js'
import YUQUE_API from './apis.js'
const { JSDOM } = jsdom

/**
 * 登录语雀
 * @param accountInfo
 */
export const loginYuque = async (accountInfo?: IAccountInfo) => {
  const { userName, password } = accountInfo
  if (!userName || !password) {
    Log.error('账号信息不完整')
    process.exit(0)
  }

  const loginInfo = {
    login: userName,
    password: genPassword(password),
    loginType: 'password',
  }

  try {
    const { data } = await post<ILoginResponse>(YUQUE_API.yuqueLoginApi, loginInfo, {
      Referer: CONFIG.host + YUQUE_API.yuqueReferer,
      origin: CONFIG.host,
    })

    if (data.ok) {
      const userInfoContent = setJSONString({ ...data.user, expired: setExpireTime() })
      await F.touch2(CONFIG.userInfoFile, userInfoContent)
      Log.success('语雀登录成功')
      return 'ok'
    } else {
      throw '语雀登录失败，请确认账号密码是否正确'
    }
  } catch (error) {
    return error + ': 语雀登录失败，请确认账号密码是否正确'
  }
}

/**
 * 获取知识库列表
 */
export const getBookStacks = async () => {
  const { data } = await get<TBookStackItem[]>(YUQUE_API.yuqueBooksList)
  if (data) {
    // reduce [{c:[1,2],a:'11'}] => {c: Array(2), a: '11'}
    const list = data.map((item) => item.books).flat() as unknown as TBookItem[]
    const _list = list.map((item: TBookItem) => {
      return {
        slug: item.slug,
        name: item.name,
        user: item.user.login,
        id: item.id,
        docs: [],
      }
    })
    return _list
  } else {
    Log.error('获取知识库失败')
    process.exit(0)
  }
}

/**
 * 获取知识库下的文档
 * @param bookId
 * @returns 文档列表
 */
export const getDocsOfBooks = async (bookId: string): Promise<any> => {
  const { data } = await get<TDocItem[]>(YUQUE_API.yuqueDocsOfBook(bookId))
  if (data) {
    const list = data.map((item) => {
      return {
        slug: item.slug,
        name: item.title,
      }
    })
    return list
  } else {
    Log.error(`获取{${bookId}}知识库文档失败`)
  }
}

/**
 * 导出md文件
 * @param repos 文档路径
 * @param linebreak 是否保留换行
 * @returns md内容
 */
export const exportMarkdown = async (repos: string, linebreak: boolean): Promise<string> => {
  const markdownContent = await get(YUQUE_API.yuqueExportMarkdown(repos, linebreak))
  if (markdownContent) {
    return markdownContent as unknown as string
  } else {
    Log.error(`导出{${repos}}知识库文档失败`)
    return ''
  }
}

/**
 * 爬取语雀知识库页面数据
 * @param repos
 * @returns
 */
export const crawlYuqueBookPage = (repos: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    get(repos).then((res) => {
      const virtualConsole = new jsdom.VirtualConsole()
      const window = new JSDOM(`${res}`, { runScripts: 'dangerously', virtualConsole }).window
      virtualConsole.on('error', () => {
        // don't do anything
      })
      try {
        const { book } = window.appData
        resolve(book.toc)
      } catch (error) {
        reject('')
        Log.error(`知识库${repos}页面数据爬取失败`)
      }
    })
  })
}
