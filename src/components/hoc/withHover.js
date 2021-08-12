import React, { Component } from 'react';

export const withHover = (WrappedComponent) =>{
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        hasHover: false,
      }
    }
    render() {
      return (
        <div
          style={{
            position: 'relative',
            ...this.props.style
          }}
          onMouseOver={() => this.setState({hasHover: true})}
          onMouseOut={() => this.setState({hasHover: false})}
        >
          <WrappedComponent {...this.props}/>
          <div
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              position: 'absolute',
              height: '100%',
              width: '100%',
              top:0,
              left:0,
              display: this.state.hasHover ? 'block' : 'none'
            }}
          >
            Hover element
          </div>
        </div>
      )
    }
  }
}