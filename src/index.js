import React from '../lib/index.js'

// 描述节点的 对象
// const element = React.createElement('div', {
//   id: 'container',
//   style: 'border: 1px solid red; min-height: 200px'
// },
//   React.createElement('h2', {
//     style: "color: #666"
//   }, 'hello this is a h2',
//     React.createElement('span', { style: 'font-size: 14px' }, 'this is a span in h2')),
//   React.createElement('input'),
//   React.createElement('button', {
//     onclick: () => { alert('clicked') }
//   }, "clickMe"))

const data = 'name is a'

const element = (
  <div id="container">
    <h2>hello jsx</h2>
    <p>{data}</p>
    <input type="text"/>
    <button onClick={e => alert('clicked')}>click me</button>
  </div>
)



React.render(element, document.getElementById('app'))