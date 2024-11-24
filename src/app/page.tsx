import BestSellingProducts from "../components/BestSellingProducts";
import Categories from "../components/Categories";
import Hero from "../components/Hero";

const HomePage = () => {
  return (
    <main>
      <Hero />
      <Categories isHome />
      <BestSellingProducts />
    </main>
  );
};

export default HomePage;
