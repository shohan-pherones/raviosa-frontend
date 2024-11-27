import BestSellingProducts from "../components/BestSellingProducts";
import Categories from "../components/Categories";
import Hero from "../components/Hero";
import NewArrivals from "../components/NewArrivals";

const HomePage = () => {
  return (
    <main>
      <Hero />
      <Categories isHome />
      <BestSellingProducts />
      <NewArrivals />
    </main>
  );
};

export default HomePage;
