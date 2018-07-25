// 描述节点的 对象
const element = {
  tppe: 'div',
  props: {
    id: 'container',
    children: [
      { type: 'input', props: { value: 'foo', type: 'text' } },
      { type: 'input', props: { value: 'foo', type: 'text' } },
      { type: 'input', props: { value: 'foo', type: 'text' } },
    ]
  }
}

function render(element, parentDom) {
  const { type, props } = element
  const dom = document.createElement(type)
  const childElements = props.children || []
  childElements.forEach(child => render(child, dom))
  parentDom.appendChild(dom)
}
