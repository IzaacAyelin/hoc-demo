import React, { Component } from 'react';

export const withMagnified = (WrappedComponent) =>{
  return class extends Component {
    constructor(props) {
      super(props);
      this.onMouseMove = this.onMouseMove.bind(this);
      this.onMouseDown = this.onMouseDown.bind(this);
      this.onMouseUp = this.onMouseUp.bind(this);
      this.toggleMagnify = this.toggleMagnify.bind(this);
      this.getMagnifyInitialPos = this.getMagnifyInitialPos.bind(this)
      this.containerRef = null;
      this.state = {
        x: 0,
        y: 0,
      };
    }

    onDragStart(e) {
      e.preventDefault();
    }

    onMouseMove(e) {
      if (this.dragStarted) {
        this.isDragging = true;
        const { clientX, clientY } = e;
        const { magnifyLevel, style } = this.props;
        const { width, height } = style;
        const magnifiedWidth = width * magnifyLevel;
        const magnifiedHeight = height * magnifyLevel;
        this.setState({
          x: Math.max(
            0,
            Math.min(
              this.startX - clientX ,
              magnifiedWidth - width
            )
          ),
          y: Math.max(
            0,
            Math.min(
              this.startY - clientY,
              magnifiedHeight - height
            )
          ),
        })
      }
    }

    onMouseDown(e) {
      const { clientX, clientY } = e;
      const { x, y, shouldMagnify } = this.state;
      this.startX = x + clientX;
      this.startY = y + clientY;
      if (!shouldMagnify) {
        this.setState(this.getMagnifyInitialPos(e))
      }
      this.dragStarted = true;
    }
    onMouseUp() {
      if (!this.isDragging) {
        this.toggleMagnify();
      }
      this.dragStarted = false;
      this.isDragging = false;
    }

    getMagnifyInitialPos(e) {
      const { clientX, clientY } = e;
      const { magnifyLevel, style } = this.props;
        const {
          width,
          height
        } = style;
        const magnifiedWidth = width * magnifyLevel;
        const magnifiedHeight = height * magnifyLevel;
  
        const { top, left } = this.containerRef.getBoundingClientRect();
        return {
          x: Math.max(0, Math.min(clientX - left,  magnifiedWidth - width)),
          y: Math.max(0, Math.min(clientY - top,  magnifiedHeight - height)),
        }
    }

    toggleMagnify(bool){
      const { shouldMagnify } = this.state;
      if (bool !== undefined) {
        this.setState({shouldMagnify: bool})
      } else {
        this.setState({shouldMagnify: !shouldMagnify})
      }
    }

    render() {
      const { style, magnifyLevel } = this.props;
      const { shouldMagnify, x, y } = this.state;
      const magStyle = !shouldMagnify ? {} : {
        transform: `translate(${-x}px, ${-y}px)`,
        transformOrigin: '0px 0px',
        width: style.width * magnifyLevel,
        height: style.height * magnifyLevel,
      }
      return (
        <div
          style={{
            ...style,
            overflow: 'hidden',
          }}
          ref={(ref) => this.containerRef = ref}
          onDragStart={this.onDragStart}
          onMouseMove={this.onMouseMove}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
        >
          <WrappedComponent
            {...this.props}
            style={{
              ...style,
              ...magStyle,
            }}
          />
        </div>
      )
    }
  }
}