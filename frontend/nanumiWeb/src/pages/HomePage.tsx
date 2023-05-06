import { Features, SectionWrapper } from '../components/home';
import assets from '../assets';

const HomePage = () => {
  return (
    <div>
      <SectionWrapper
        title="나누미를 통해 물건을 무료나눔해보세요"
        description="따뜻한 마음과 추억이 담긴 물건을 나누며 나눔문화를 함께 만들어가요."
        showBtn
        mockupImg={assets.homeHero}
        banner="banner"
        reverse={false}
      />
      <SectionWrapper
        title="Smart User Interface MarketPlace"
        description="Experience a buttery UI of ProNef NFT MarketPlace. Smppth constance colors of a fluent UI design"
        showBtn={false}
        mockupImg={assets.homeCards}
        banner=""
        reverse
      />
      <Features />
    </div>
  );
};

export default HomePage;
