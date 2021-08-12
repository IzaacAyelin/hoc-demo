import './App.css';
import { withHover } from './components/hoc/withHover';
import { withPopover } from './components/hoc/withPopover';

const src = 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg';

function App() {
  const ImageWithHover = withHover(Image);
  const ImageWithPopover = withPopover(Image)
  const ImageWithHoverWithPopover = withPopover(withHover(Image));
  return (
    <div className="App">
      <ImageWithHover
        style={{
          width: 200,
          height: 200,
        }}
        src={src}
      />
      <ImageWithPopover
        style={{
          width: 200,
          height: 200,
        }}
        src={src}
      />
      <ImageWithHoverWithPopover
         style={{
          width: 200,
          height: 200,
        }}
        src={src}
      />
    </div>
  );
}

function Image(props){ 
  return <img alt="" {...props}/>
}

export default App;
