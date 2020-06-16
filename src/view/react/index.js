import React from 'react'
import ReactDOM from 'react-dom'
import img from '../../assets/images/img.jpeg'
import './style.less'

class Search extends React.Component {
  constructor(...args) {
    super(args)

    this.state = {
      Text: null,
    }
  }

  loadComponent() {
    import('./text.js').then((Text) => {
      this.setState({
        Text: Text.default,
      })
    })
  }

  render() {
    const { Text } = this.state

    return (
      <div className='search-text'>
        {Text ? <Text /> : null}
        搜索文字的内容
        <img src={img} alt='' onClick={this.loadComponent.bind(this)} />
      </div>
    )
  }
}

ReactDOM.render(<Search />, document.getElementById('root'))
