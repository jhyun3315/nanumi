import SideBar from '../components/sidebar';
import ContentLeft from '../components/content/ContentLeft';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('user');
    if (!isAuthenticated) navigate('/admin/login');
  }, []);
  return (
    <div className="w-full min-h-screen bg-white flex flex-row">
      <SideBar />
      <ContentLeft />
    </div>
  );
};

export default AdminPage;
