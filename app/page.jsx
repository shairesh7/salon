import Explore from "./Explore/page";
import Hero from './Hero/Hero';
import Header from './Header/Header';
import Combo from './Combo/Combo';
import Root from './Root/RootSection';
import About from './About/About';
import Contact from './Contact/Contact';
import Footer from './Footer/Footer'
export default function Home() {
  return (
   <>
   <Header/>
   <Hero/>
   <Combo/>
   <Explore/>
   <Root/>
   <About/>
   <Contact/>
   <Footer/>
   </>
   
  );
}
