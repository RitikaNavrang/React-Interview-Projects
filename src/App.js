import logo from './logo.svg';
import './App.css';
import Index from './Components/MultipleSelection/Index';
import RandomColor from './Components/GenerateRANDOMColor/Index';
import StarRating from './Components/StarRating/Index';
import ImageSlider from './Components/ImageSlider/Index';
import LoadMoreProjects from './Components/LoadMoreProducts/Index';

function App() {
  return (
    <div className="App">
      <Index/>
      <RandomColor/>
      <StarRating noOfStars={10}/>
      <ImageSlider url={`https://picsum.photos/v2/list`} page={1} limit={'10'}/>
      <LoadMoreProjects/>
    </div>
  );
}

export default App;
