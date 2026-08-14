import { Toaster } from 'react-hot-toast';
import './App.css';
import Navbar from './components/Navbar'
import AppRouter from './router/AppRouter';

function App() {
  return (
    <>
    <Toaster position='top-center' reverseOrder={false}/>
      <Navbar />
      <AppRouter />
    </>
  )
}
export default App;
