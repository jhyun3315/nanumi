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
    { name: 'Settings', icon: <RiSettings5Line /> },
  ];
  return (
    <div className="h-screen border-r border-gray-200 w-64 px-9">
      <div className="flex flex-row items-center">
        <img src={Logo} alt="nanumi-logo" className="w-9 h-9" />
        <div>나누미</div>
      </div>
      <div>
        <ul>
          <div className="mb-4">Menu</div>
          {menu.map((value, index) => {
            return (
              <li key={index} className="mb-7 flex flex-row items-center">
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
