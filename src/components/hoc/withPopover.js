import React, { Component } from 'react';

export const withPopover = (WrappedComponent) =>{
  return class extends Component {
    constructor(props) {
      super(props);
      this.onMouseOver = this.onMouseOver.bind(this);
      this.onMouseOut = this.onMouseOut.bind(this);
      this.elementRef = null;
      this.state = {
        hasHover: false,
      }
    }
   
    onMouseOver() {
      this.setState({
        hasHover: true,
      })
    }
    onMouseOut() {
      this.setState({
        hasHover: false,
      })
    }
    render() {
      return (
        <div
          className="with-popover"
          style={{
            position: 'relative',
            ...this.props.style
          }}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          >
          <WrappedComponent {...this.props}/>
          <div
          className={`popover ${this.state.hasHover ? 'show' : 'hide'}`}
          >

          </div>
        </div>
      )
    }
  }
}