import React, { Component } from '../lib/index.js'

console.log(Component)

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

// function renderList() {
//   return data.map(d => (
//     <div className="item">
//       <button onClick={addLike.bind(null, d.id)}>❤️</button>
//       <i>{d.like}</i>
//       <span>{d.name}</span>
//     </div>
//   ))
// }
// function addLike(id) {
//   console.log(`addLike`, id)
//   data = data.map(d => {
//     return d.id == id ? Object.assign({}, d, { like: ++d.like }) : d
//   })
//   React.render(app(), document.getElementById('app'))
// }

class Hello extends Component{
  constructor(props){
    super(props)
    this.state.value = 'xiaoming'
  }
  handleClick() {
    this.setState({
      value: '小明'
    })
  }
  render() {
    return (
      <div>
        <h3>{this.props.msg + this.state.value}</h3>
        <button onClick={this.handleClick.bind(this)}>change</button>
      </div>
    )
  }
}


React.render(<Hello msg="hello"/>, document.getElementById('app'))