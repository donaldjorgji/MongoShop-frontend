
import './App.css';
import Navbar from './Commponents/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import LoginsSignup from './Pages/LoginsSignup';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Shop from './Pages/Shop';
import men_banner from './Commponents/Assets/banner_mens4.jpg'
import women_banner from './Commponents/Assets/banner_women3.jpg'
import kid_banner from './Commponents/Assets/banner_kids2.png'
import Footer from './Commponents/Footer/Footer';
import OffersProducts from './Commponents/OffersProducts/OffersProducts';
import Hero from './Commponents/Hero/Hero';
import Koleksioni from './Commponents/Koleksioni/Koleksioni';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/meshkuj' element={<ShopCategory banner={men_banner} category="meshkuj"/>}/>
        <Route path='/femra' element={<ShopCategory banner={women_banner} category="femra"/>}/>
        <Route path='/femije' element={<ShopCategory banner={kid_banner} category="femije"/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path="/offers" element={<OffersProducts />} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginsSignup/>}/>
        <Route path="/" element={<Hero />} />
        <Route path="/koleksioni" element={<Koleksioni />} />
      </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
