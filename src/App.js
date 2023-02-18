import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Login from  './components/pages/login'
import Approutes from './components/routes';
import { togglenoscroll } from './features/User/userSlice';
function App() {

  const { noscroll } = useSelector(state => state.user)
  const dispatch = useDispatch();

  return (
    <div className={noscroll?"App noscroll":"App"}>
      <Approutes></Approutes>
    </div>
  );
}

export default App;
