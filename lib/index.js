import { concat } from "../node_modules/rxjs";

const TEXT_ELEMENT = 'TEXT'
let rootInstance = null
/**
 * 返回element
 * @param {*} type
 * @param {*} props
 * @param {*} args
 */
function createElement(type, configs, ...args) {
  // console.log(type, configs, args)
  if (!type) return
  const props = Object.assign({}, configs)
  const rawChildren = args.length > 0 ? [].concat(...args) : []
  props.children = rawChildren
    .filter(c => c != null && c != undefined)
    .map(c => {
      if (c instanceof Object) {
        return c
      } else {
        return createTextElement(c.toString())
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
}

/**
 * 判断 对比 instance
 * @param {*} parentDom
 * @param {*} instance
 * @param {*} element
 */
function reconcile(parentDom, instance, element) {
  // 生成 Instance
  if (instance == null) {
    const newInstance = instantiate(element)
    // 第一次渲染
    parentDom.appendChild(newInstance.dom)
    return newInstance
  } else if (element === null){
    // 需要删除节点
    parentDom.removeChild(instance.dom)
    return null
  } else if (typeof element.type == 'string') {
      // Update instance
    updateDomProperties(instance.dom, instance.element.props, element.props);
    instance.childInstances = reconcileChildren(instance, element);
    instance.element = element;
    return instance;
  } else if (instance.element.type !== element.type) {
    // 已经渲染过, 替换
    const newInstance = instantiate(element)
    parentDom.replaceChild(newInstance.dom, instance.dom)
    return newInstance
  } else {
    // 更新自定义组件
    instance.publicInstance.props = element.props
    const childElement = instance.publicInstance.render()
    const oldChildInstance = instance.childInstance
    const childInstance = reconcile(parentDom, oldChildInstance, childElement)
    return {
      dom: childInstance.dom,
      childInstance,
      element
    }
  }
}

/**
 * 复检 子元素
 * @param {*} instance
 * @param {*} element
 */
function reconcileChildren(instance, element) {
  const { dom, childInstances } = instance
  const newChildElements = element.props.children || []
  const newChildInstances = []

  // 最大对比数量
  const count = Math.max(childInstances.length, newChildElements.length)
  for (let i = 0; i < count; i++) {
    const childInstance = childInstances[i];
    const childElement = newChildElements[i];
    const newChildInstance = reconcile(dom, childInstance, childElement);
    newChildInstances.push(newChildInstance);
  }
  return newChildInstances.filter(instance => instance !== null)
}


/**
 * 根据原始格式的 element 对象 返回 Instance
 * @param {*} element 原始格式的 element 对象
 */
function instantiate(element) {
  const { type, props } = element

  const isDomElement = typeof type === 'string'

  // 普通dom
  if (isDomElement) {
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
  } else {
    // 组件
    const instance = {}
    const publicInstance = createPublicInstance(element, instance)
    const childElement = publicInstance.render()
    const childInstance = instantiate(childElement)
    const dom  = childInstance.dom
    Object.assign(instance, { dom, element, childElement, publicInstance })
    return instance
  }
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

export class Component {
  constructor(props) {
    this.props = props
    this.state = this.state || {}
  }
  setState(partialState) {
    this.state = Object.assign({}, this.state, partialState)
    updateInstance(this._internalInstance)
  }
}

function updateInstance(internalInstance) {
  const parentDom = internalInstance.dom.parentNode
  const element = internalInstance.element
  reconcile(parentDom, internalInstance, element)
}

/**
 * 自定义组件
 * @param {*} element
 * @param {*} internalInstance
 */
function createPublicInstance(element, internalInstance) {
  const { type, props } = element
  const publicInstance = new type(props)
  publicInstance._internalInstance = internalInstance
  return publicInstance
}

export default {
  createElement,
  render
}