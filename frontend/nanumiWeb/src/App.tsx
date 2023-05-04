import SideBar from './components/sidebar';
import { BiUser } from 'react-icons/bi';
import { GrNotification } from 'react-icons/gr';

function App() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-row">
      <SideBar />
      <section className="flex-1 bg-white">contentLEft</section>
      <section className="w-96 bg-gray-200 rounded-tl-70px overflow-hidden px-14">
        <div className="pt-12 flex justify-end space-x-9 items-center">
          <GrNotification size={20} />
          <BiUser size={20} />
          <img
            src="https://nanumi.s3.ap-northeast-2.amazonaws.com/2adef125-287e-4bc0-adf6-e8d6396e63f3-1680671255835.jpg"
            alt="admin"
            className="h-9 w-9 object-cover rounded-full"
          />
        </div>
        <div className="card mt-9">
          <div className="relative p-5 text-white">
            <div className="text-lg">관리자</div>
            <div className="mt-10 space-y-3">
              <div>한상준</div>
              <div>hsjun1996@naver.com</div>
              <div className="flex justify-between relative">
                <span>뭐</span>
                <img
                  src="https://nanumi.s3.ap-northeast-2.amazonaws.com/0fc9e441-33ab-4d18-ab9e-570648c9e3e2-1680657612286.jpg"
                  alt="admin-image"
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
        <button className="py-3 rounded border border-violet-600 text-violet-400 border-dashed w-full  mt-10">
          새로운 관리자 추가
        </button>
      </section>
    </div>
  );
}

export default App;
