import AboutCard from "../components/about/AboutCard"
import Hblog from "../components/home/Hblog"
import HAbout from "../components/home/HAbout"
import Hero from "../components/home/hero/Hero"
import Hprice from "../components/home/Hprice"
import Testimonal from "../components/home/testimonal/Testimonal"
import NavigationBar from '../components/nav/nav'


const Home = () => {
  return (
    <>
    <NavigationBar/>
      <Hero />
      <AboutCard />
      <HAbout />
      <Testimonal />
      <Hblog />
      <Hprice />
    </>
  )
}

export default Home
