import { IoMdWater } from 'react-icons/io';

const AdminList = () => {
  const admin = [
    {
      id: 1,
      name: '한상준',
      status: 'hsjun1996@naver.com',
      grade: 1,
    },
  ];

  const otherAdmin = [
    {
      id: 1,
      name: '한상준',
      status: 'hsjun1996@naver.com',
      grade: 2,
    },
    {
      id: 2,
      name: '한상준',
      status: 'hsjun1996@naver.com',
      grade: 3,
    },
    {
      id: 3,
      name: '한상준',
      status: 'hsjun1996@naver.com',
      grade: 4,
    },
    {
      id: 4,
      name: '한상준',
      status: 'hsjun1996@naver.com',
      grade: 2,
    },
  ];

  const bgColors = (grade: number) => {
    switch (grade) {
      case 1:
        return 'bg-blue-500';
      case 2:
        return 'bg-teal-400';
      case 3:
        return 'bg-yellow-400';
      default:
        return 'bg-red-500';
    }
  };

  return (
    <section>
      <div className="mt-11">
        <h3>관리자</h3>
        <div>
          {admin.map((value) => {
            return (
              <div
                className="flex flex-row items-center border-b border-b-gray-200 py-3"
                key={value.id}
              >
                <div className="h-10 w-10 bg-violet-600 rounded-lg flex items-center justify-center mr-3">
                  <IoMdWater color="white" />
                </div>
                <div className="flex-1">
                  <div className="text-lg font-medium">{value.name}</div>
                  <div className="text-sm">{value.status}</div>
                </div>
                <div className="text-red-600">{value.grade}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <h3>다른관리자</h3>
        <div>
          {otherAdmin.map((value) => {
            return (
              <div
                className="flex flex-row items-center border-b border-b-gray-200 py-3"
                key={value.id}
              >
                <div
                  className={`h-10 w-10  rounded-lg flex items-center justify-center mr-3 ${bgColors(
                    value.grade,
                  )}`}
                >
                  <IoMdWater color="white" />
                </div>
                <div className="flex-1">
                  <div className="text-lg font-medium">{value.name}</div>
                  <div className="text-sm">{value.status}</div>
                </div>
                <div className="text-red-600">{value.grade}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AdminList;
