import { ReactNode } from 'react';
import {
  BiCreditCard,
  BiSearch,
  BiUser,
  BiBox,
  BiBug,
  BiEdit,
  BiTrash,
} from 'react-icons/bi';

import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

interface CardProps {
  bgColor: string;
  textColor: string;
  icon: ReactNode;
  label: ReactNode;
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
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => console.info('swipe action triggered')}
      >
        <div className="flex items-center px-4">
          <BiTrash size={25} color="white" />
        </div>
      </SwipeAction>
      <SwipeAction
        destructive={true}
        onClick={() => console.info('swipe action triggered')}
      >
        <div className="flex items-center px-4">
          <BiEdit size={25} color="white" />
        </div>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <section className="container-content-left px-16 flex-1 pt-14 h-screen overflow-y-scroll">
      <div className="border border-gray-300 rounded-lg w-full flex px-3 py-3 items-center">
        <BiSearch className="mr-2" />
        <input type={'text'} className="flex-1" placeholder="Search" />
      </div>

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
      <div className="mt-20">
        {Array.from(Array(8)).map((_, index) => (
          <div key={index} className="rounded-2xl bg-violet-700 mb-4">
            <SwipeableList threshold={0.9} type={Type.IOS}>
              <SwipeableListItem trailingActions={trailingActions()}>
                <div className="bg-white px-8 p-4 rounded-xl border border-gray-200 w-full flex">
                  <img
                    src={
                      'https://nanumi.s3.ap-northeast-2.amazonaws.com/ebd28134-03c0-4980-8d40-47e2c9140487-1680657612511.jpg'
                    }
                    alt="user-image"
                    className="w-8 h-8 rounded-full object-cover mr-3"
                  />
                  <div className="text-lg">
                    <div className="text-gray-900">닉네임</div>
                    <div className="text-gray-400 text-sm">유저</div>
                  </div>
                </div>
              </SwipeableListItem>
            </SwipeableList>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContentLeft;
