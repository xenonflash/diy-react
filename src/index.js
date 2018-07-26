import React from '../lib/index.js'


let data = [
  {
    id: 1,
    name: 'this is options a',
    like: 30
  },
  {
    id: 2,
    name: 'this is options v',
    like: 11
  },
  {
    id: 3,
    name: 'this is options b',
    like: 1
  },
  {
    id: 4,
    name: 'this is options a',
    like: 2
  },
]

function renderList() {
  return data.map(d => (
    <div className="item">
      <button onClick={addLike.bind(null, d.id)}>❤️</button>
      <i>{d.like}</i>
      <span>{d.name}</span>
    </div>
  ))
}
function addLike(id) {
  console.log(`addLike`, id)
  data = data.map(d => {
    return d.id == id ? Object.assign({}, d, { like: ++d.like }) : d
  })
  React.render(app(), document.getElementById('app'))
}


const app = () => (
  <div id="container">
    <h2 style="color: red">hello jsx</h2>
    {renderList()}
  </div>
)
React.render(app(), document.getElementById('app'))