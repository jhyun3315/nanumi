import SideBar from './components/sidebar';
import { BiUser } from 'react-icons/bi';
import { GrNotification } from 'react-icons/gr';
import ContentRight from './components/content/ContentRight';
import ContentLeft from './components/content/ContentLeft';

function App() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-row">
      <SideBar />
      <ContentLeft />
      <ContentRight />
    </div>
  );
}

export default App;
