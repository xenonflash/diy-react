// 描述节点的 对象
const element = {
  tppe: 'div',
  props: {
    id: 'container',
    children: [
      { type: 'input', props: { value: 'foo', type: 'text' } },
      { type: 'a', props: {
        href: 'www.lingobus.com',
        children: [{
          type: 'TEXT',
          props: { nodeValue: 'baidu' }
        }]
      }},
      { type: 'h3', props: { children: [{
        type: 'TEXT',
        props: { nodeValue: '被今天' }
      }] } },
      {
        type: 'span', props: {
          children: [
            { type: 'TEXT', props: {nodeValue: 'hello'} }
          ]
        }
      }
    ]
  }
}

function render(element, parentDom) {
  const { type, props } = element

  //处理 文本节点
  const dom = type === 'TEXT' ?
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
