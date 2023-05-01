export const COLORS = {
  primary: '#001F2D',
  secondary: '#4D626C',
  white: '#FFF',
  gray: '#74858C',
  violet: '#8B5CF6',
  lightViolet: '#C4B5FD',
  disable: '#D1BEFB',
  lightBlue: '#eff6ff',
  blue: '#1F41BB',
  lightGray: '#F0F0F0',
  red: '#F87171',
  yellow: '#E0C134',
};

export const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  extraLarge: 24,
};

export const FONTS = {
  bold: 'GmarketSansTTFBold',
  medium: 'GmarketSansTTFMedium',
  light: 'GmarketSansTTFLight',
};

export const SHADOWS = {
  light: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  medium: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  dark: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
};

export const CATEGORIES = [
  {
    name: '디지털기기',
    id: 'DIGITAL',
    key: 1,
    source: require('../assets/categories/Digital.png'),
  },
  {
    name: '생활가전',
    id: 'HOMEAPPLIANCES',
    key: 2,
    source: require('../assets/categories/HomeAppliances.png'),
  },
  {
    name: '가구/인테리어',
    id: 'FURNITURE',
    key: 3,
    source: require('../assets/categories/Furniture.png'),
  },
  {
    name: '생활/주방',
    id: 'KITCHEN',
    key: 4,
    source: require('../assets/categories/Kitchen.png'),
  },
  {
    name: '유아동',
    id: 'FEEDINGBOTTLE',
    key: 5,
    source: require('../assets/categories/FeedingBottle.png'),
  },
  {
    name: '유아도서',
    id: 'CHILDRENBOOK',
    key: 6,
    source: require('../assets/categories/ChildrenBook.png'),
  },
  {
    name: '여성의류',
    id: 'FEMALECLOTHES',
    key: 7,
    source: require('../assets/categories/FemaleClothes.png'),
  },
  {
    name: '여성잡화',
    id: 'FEMALEBAG',
    key: 8,
    source: require('../assets/categories/FemaleBag.png'),
  },
  {
    name: '남성패션/잡화',
    id: 'MALECLOTHES',
    key: 9,
    source: require('../assets/categories/MaleClothes.png'),
  },
  {
    name: '뷰티/미용',
    id: 'BEAUTY',
    key: 10,
    source: require('../assets/categories/Beauty.png'),
  },
  {
    name: '스포츠/레저',
    id: 'SPORTS',
    key: 11,
    source: require('../assets/categories/Sports.png'),
  },
  {
    name: '취미/게임/음반',
    id: 'HOBBY',
    key: 12,
    source: require('../assets/categories/Hobby.png'),
  },
  {
    name: '도서',
    id: 'BOOK',
    key: 13,
    source: require('../assets/categories/Book.png'),
  },
  {
    name: '반려동물용품',
    id: 'PET',
    key: 14,
    source: require('../assets/categories/Pet.png'),
  },
  {
    name: '티켓/교환권',
    id: 'TICKET',
    key: 15,
    source: require('../assets/categories/Ticket.png'),
  },
  {
    name: '식물',
    id: 'PLANT',
    key: 16,
    source: require('../assets/categories/Plant.png'),
  },
  {
    name: '기타 중고물품',
    id: 'PACKAGE',
    key: 17,
    source: require('../assets/categories/Package.png'),
  },
];
