/**
 * @description 脚本类型枚举，列举了不同运行环境的脚本
 */
export enum SCRIPT {
  /**
   * @description 运行在service_worker后台脚本
   */
  BACKGROUND = "background",
  /**
   * @description 运行在弹出html(action-default_popup)中的脚本
   */
  POPUP = "popup",
  /**
   * @description 插入在浏览网页中隔离运行的脚本
   */
  INSERT = "insert",
}

/**
 * @description 某些知名音乐网站
 */
export enum MUSIC_HOST_NAME {
  /**
   * @description 咪咕音乐 music.migu.com
   */
  MIGU = "migu",
  /**
   * @description 网易云音乐 music.163.com
   */
  NETEASE = "163",
}
