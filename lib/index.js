const TEXT_ELEMENT = 'TEXT'
let rootInstance = null
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
  rootInstance = reconcile(parentDom, rootInstance, element)
  console.log(rootInstance)
}

/**
 * 判断 对比 instance
 * @param {*} parentDom
 * @param {*} instance
 * @param {*} element
 */
function reconcile(parentDom, instance, element) {
  // 生成 Instance
  const newInstance = instantiate(element)
  if (instance == null) {
    // 第一次渲染
    parentDom.appendChild(newInstance.dom)
  } else {
    // 已经渲染过, 替换
    parentDom.replaceChild(newInstance.dom, instance.dom)
  }
  return newInstance
}

/**
 * 根据原始格式的 element 对象 返回 Instance
 * @param {*} element 原始格式的 element 对象
 */
function instantiate(element) {
  const { type, props } = element
  //处理 文本节点
  const dom = type === TEXT_ELEMENT ?
    document.createTextNode('')
    : document.createElement(type)

  // 更新属性
  updateDomProperties(dom, [], props)

  // 递归遍历渲染
  const childElements = props.children || []
  const childInstances = childElements.map(instantiate)
  // 挂载到当前dom
  childInstances.forEach(childInstance => dom.appendChild(childInstance.dom))
  return { dom, element, childInstances }
}
/**
 * 更新dom properties 和事件监听
 */
function updateDomProperties(dom, prevProps, nextProps) {
  const isEvent = name => /^on/.test(name)
  const isAttribute = name => !isEvent(name) && name !== 'children'
  // 移除 旧的 属性
  Object.keys(prevProps).filter(isAttribute).forEach(attr => {
    dom[attr] = null
  })

  // 移除旧的事件监听
  Object.keys(prevProps).filter(isEvent).forEach(event => {
    dom.removeEventListener(event.toLowerCase().slice(2), prevProps[event])
  })

  // 添加新的事件监听
  Object.keys(nextProps).filter(isEvent).forEach(e => {
    const eventName = e.toLowerCase().substring(2)
    dom.addEventListener(eventName, nextProps[e])
  })
  // 添加新的 属性
  Object.keys(nextProps).filter(isAttribute).forEach(a => {
    dom[a] = nextProps[a]
  })
}


export default {
  createElement,
  render
}