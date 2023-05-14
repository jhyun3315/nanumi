import { ReactNode, useEffect, useState } from 'react';
import { BiCreditCard, BiUser, BiBox, BiBug } from 'react-icons/bi';
import { requestGetReport } from '../../api/Login';

interface CardProps {
  bgColor: string;
  textColor: string;
  icon: ReactNode;
  label: ReactNode;
}

interface User {
  id: number;
  content: string;
  nickname: string;
  profile_url: string;
  reportedCount: number;
  reported: {
    id: number;
    nickname: string;
    profile_url: string;
    si: string;
    gugun: string;
    dong: string;
  };
  reporterId: number;
  reportDate: string;
  status: boolean;
  stopDate: number;
}

const Card = ({ bgColor, icon, label, textColor }: CardProps) => {
  return (
    <div
      className={`rounded-xl ${bgColor} bg-opacity-10 px-5 py-7 w-36 ${textColor} space-y-4`}
    >
      <div>{icon}</div>
      <div>{label}</div>
    </div>
  );
};
const ContentLeft = () => {
  const [users, setUsers] = useState<User[]>([]);

  const handleGetReport = async () => {
    const response = await requestGetReport();
    setUsers(response);
  };

  useEffect(() => {
    handleGetReport();
  }, []);

  return (
    <section className="container-content-left px-16 flex-1 pt-14 h-screen overflow-y-scroll">
      <h3 className="text-xl text-violet-700 my-8">대시보드</h3>

      <div className="flex flex-row space-x-6">
        <Card
          bgColor={'bg-green-600'}
          textColor={'text-green-600'}
          icon={<BiUser size={25} />}
          label={
            <span className="text-sm">
              전체 유저
              <br />0
            </span>
          }
        />
        <Card
          bgColor={'bg-indigo-600'}
          textColor={'text-indigo-600'}
          icon={<BiBox size={25} />}
          label={
            <span className="text-sm">
              등록된 상품
              <br />0
            </span>
          }
        />
        <Card
          bgColor={'bg-orange-600'}
          textColor={'text-orange-600'}
          icon={<BiCreditCard size={25} />}
          label={
            <span className="text-sm">
              신고된 유저
              <br />0
            </span>
          }
        />
        <Card
          bgColor={'bg-teal-600'}
          textColor={'text-teal-600'}
          icon={<BiBug size={25} />}
          label={
            <span className="text-sm">
              오류
              <br />0
            </span>
          }
        />
      </div>
      <div className="mt-20 flex flex-row flex-wrap">
        {users.map((user) => {
          return (
            <div className="w-60 p-2 bg-slate-50 rounded-xl" key={user.id}>
              <img
                src={user?.reported?.profile_url}
                alt=""
                className="h-40 object-cover rounded-xl"
              />
              <div className="p-2">
                <h2 className="font-bold text-lg">
                  {user?.reported?.nickname}
                </h2>
                <p className="text-sm text-gray-600">{user?.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ContentLeft;
