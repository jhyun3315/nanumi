import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestAdminLogin } from '../api/Login';

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      email: formData.email,
      password: formData.password,
    };
    const response = await requestAdminLogin(data);
    if (response.code === 400) {
      alert(response.message);
    } else if (response.code === 200) {
      navigate('/admin');
      localStorage.setItem('user', JSON.stringify(response.result));
      setFormData({ email: '', password: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">관리자 로그인</h2>
        <form onSubmit={handleLoginSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="아이디"
            >
              아이디
            </label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="아이디"
              autoComplete="on"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="비밀번호"
            >
              비밀번호
            </label>
            <input
              className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="비밀번호"
              type="password"
              placeholder="비밀번호"
              autoComplete="on"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
