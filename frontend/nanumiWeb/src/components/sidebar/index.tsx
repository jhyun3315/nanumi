import Logo from '../../assets/logo.png';
import {
  BiHomeAlt,
  BiGridAlt,
  BiCreditCardAlt,
  BiUser,
  BiCalculator,
} from 'react-icons/bi';
import { RiSettings5Line } from 'react-icons/ri';

const SideBar = () => {
  const menu = [
    { name: '홈', icon: <BiHomeAlt /> },
    { name: '회원', icon: <BiGridAlt /> },
    { name: 'Cards', icon: <BiCreditCardAlt /> },
    { name: 'Contacts', icon: <BiUser /> },
    { name: 'Loan Calculator', icon: <BiCalculator /> },
    { name: '설정', icon: <RiSettings5Line /> },
  ];
  return (
    <div className="h-screen border-r border-gray-200 w-64 px-9 py-9 space-y-24">
      <div className="flex flex-row items-center">
        <img src={Logo} alt="nanumi-logo" className="w-12 h-12" />
        <div className="text-violet-500">NANUMI</div>
      </div>
      <div>
        <ul>
          <div className="mb-4 text-violet-500">Menu</div>
          {menu.map((value, index) => {
            return (
              <li
                key={index}
                className="mb-7 flex flex-row items-center text-gray-400"
              >
                <div className="mr-5">{value.icon}</div>
                {value.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
