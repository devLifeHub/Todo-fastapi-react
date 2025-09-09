
import Hero from '@/components/organisms/Section/Hero/Hero';
import About from '@/components/organisms/Section/About/About';
import Work from '@/components/organisms/Section/Work/Work';
import Price from '@/components/organisms/Section/Price/Price';
import Review from '@/components/organisms/Section/Review/Review';

const HomeTemplate = () => {
  return (
    <div>
      <Hero />
      <About />
      <Work />
      <Price />
      <Review />
    </div>
  );
};

export default HomeTemplate;
