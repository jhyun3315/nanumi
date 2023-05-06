import { Download, Features, Button, SectionWrapper } from '../components/home';
import assets from './assets';

const HomePage = () => {
  return (
    <div>
      <SectionWrapper
        title="You own store of Nift NFTS. Start Selling & Grtowing"
        description="Buy, store, collect NTS, exchage & earn crypto Join 25+ milion people using ProNef Marketplace."
        showBtn
        mockupImg={assets.homeHero}
        banner="banner"
      />
    </div>
  );
};

export default HomePage;
