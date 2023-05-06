import SideBar from '../components/sidebar';
import ContentLeft from '../components/content/ContentLeft';
import ContentRight from '../components/content/ContentRight';

const AdminPage = () => {
  return (
    <div className="w-full min-h-screen bg-white flex flex-row">
      <SideBar />
      <ContentLeft />
      <ContentRight />
    </div>
  );
};

export default AdminPage;
