import './App.css';
import { withHover } from './components/hoc/withHover';
import { withPopover } from './components/hoc/withPopover';
import { withMagnified } from './components/hoc/withMagnified';

const src = 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg';

function App() {
  const ImageWithHover = withHover(Image);
  const ImageWithPopover = withPopover(Image)
  const ImageWithMagnified = withMagnified(Image)
  const ImageWithPopoverWithMagnified = withPopover(withMagnified(Image))
  const ImageWithHoverWithPopover = withPopover(withHover(Image));
  // const ImageWithHoverWithPopoverWithMagnified = withPopover(withHover(withMagnified(Image)));
  const baseProps = {
    src: src,
    style: {
      width: 200,
      height: 200,
    },
  }

  return (
    <div className="App">
      <div className="item">
        <ImageWithHover
          {...baseProps}
        />
        <h4>Image with popover</h4>
      </div>
      <div className="item">
        <ImageWithPopover
          { ...baseProps}
        />
        <h4>Image with hover</h4>
      </div>
      <div className="item">
        <ImageWithMagnified
          magnifyLevel={2}
          {...baseProps}
        />
         <h4>Image with magnifier</h4>
      </div>
      <div className="item">
        <ImageWithHoverWithPopover
          {...baseProps}
        />
        <h4>Image with hover with popover</h4>
      </div>
      <div className="item">
        <ImageWithPopoverWithMagnified
          magnifyLevel={2}
          {...baseProps}
        />
        <h4>Image with magnified with popover</h4>
      </div>
      {/* <div className="item">
        <ImageWithHoverWithPopoverWithMagnified
          magnifyLevel={2}
          {...baseProps}
        />
        <h4>Image with popover with hover with magnified</h4>
      </div> */}
    </div>
  );
}

function Image(props){ 
  return <img alt="" {...props}/>
}

export default App;
