import SideBar from '../components/sidebar';
import ContentLeft from '../components/content/ContentLeft';
import ContentRight from '../components/content/ContentRight';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) navigate('/admin/login');
  }, []);
  return (
    <div className="w-full min-h-screen bg-white flex flex-row">
      <SideBar />
      <ContentLeft />
      <ContentRight />
    </div>
  );
};

export default AdminPage;
