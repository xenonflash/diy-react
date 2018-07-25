const TEXT_ELEMENT = 'TEXT'

/**
 * 返回element
 * @param {*} type
 * @param {*} props
 * @param {*} args
 */
function createElement(type, configs, ...args) {
  if (!type) return
  const props = Object.assign({}, configs)
  const rawChildren = args.length > 0 ? Array.from(args) : []
  props.children = rawChildren
    .filter(c => c != null && c != undefined)
    .map(c => {
      if (c instanceof Object) {
        return c
      } else if (typeof c === 'string') {
        return createTextElement(c)
      }
    })
  return { type, props }
}

/**
 * 创建文字节点
 * @param {*} str
 */
function createTextElement(str) {
  return {
    type: TEXT_ELEMENT,
    props: {
      nodeValue: str
    }
  }
}

/**
 *  将 vnode 渲染到 元素上
 * @param {*} element
 * @param {*} parentDom
 */
function render(element, parentDom) {
  const { type, props } = element

  //处理 文本节点
  const dom = type === TEXT_ELEMENT ?
    document.createTextNode('')
    : document.createElement(type)

  // 事件监听
  const isEvent = name => /^on/.test(name)
  Object.keys(props).filter(isEvent).forEach(e => {
    const eventName = e.toLowerCase().substring(2)
    dom.addEventListener(eventName, props[e])
  })
  // 属性
  const isAttribute = name => !isEvent(name) && name !== 'children'
  Object.keys(props).filter(isAttribute).forEach(a => {
    dom[a] = props[a]
  })
  // 递归遍历渲染
  const childElements = props.children || []
  childElements.forEach(child => render(child, dom))
  parentDom.appendChild(dom)
}
