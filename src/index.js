const TEXT_ELEMENT = 'TEXT'

// 描述节点的 对象
const element = createElement('div', {
  id: 'container',
  style: 'border: 1px solid red; min-height: 200px'
},
  createElement('h2', {
    style: "color: #666"
  }, 'hello this is a h2',
    createElement('span', { style: 'font-size: 14px' }, 'this is a span in h2')),
  createElement('input'),
  createElement('button', {
    onclick: () => { alert('clicked') }
  }, "clickMe"))

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
