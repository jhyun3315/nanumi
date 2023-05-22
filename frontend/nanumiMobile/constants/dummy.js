const Data = [
  {
    id: '001',
    name: '컴퓨터',
    creator: '하하',
    description: '라이젠7 램 16기가 파워500w 부품용으로 쓰실분 있으실까요',
    category: 'DIGITAL',
    key: 1,
    image: [
      'https://dnvefa72aowie.cloudfront.net/origin/article/202304/f4dc3285f453c0907743cc05c3c474a03dad9c360e5740f6728d0c710857bcb4.webp?q=95&s=1440x1440&t=inside',
      'https://dnvefa72aowie.cloudfront.net/origin/article/202304/33a5abffcd2f123ea466cdc0c72b0615f74db8d0666d902e43c5b59663ed01a0.jpg?q=95&s=1440x1440&t=inside',
      'https://dnvefa72aowie.cloudfront.net/origin/article/202304/e8e7657edcfce415a87e2310707193801eed8651728809cf152f8099e67083cc.webp?q=95&s=1440x1440&t=inside',
      'https://dnvefa72aowie.cloudfront.net/origin/article/202304/7f352efb3f67a8d06de79092ce23280eb79859b945f384cd9b7317a7b8261692.webp?q=95&s=1440x1440&t=inside',
      'https://dnvefa72aowie.cloudfront.net/origin/article/202304/75f1b67dd15dc48ad85da3e3a27ccec2610af387c10c3867f3de867d5e50f382.webp?q=82&s=300x300&t=crop',
    ],
  },
  {
    id: '002',
    name: '노트20 울트리256 블랙',
    creator: '열심히벌자',
    category: 'DIGITAL',
    key: 1,
    description:
      '노트20 울트라 256기가 케이스 끼워서 사용했는데 뒤에 기스가 있어요 사용에 문제는 없어요노트20 울트라 256기가 케이스 끼워서 사용했는데 뒤에 기스가 있어요 사용에 문제는 없어요노트20 울트라 256기가 케이스 끼워서 사용했는데 뒤에 기스가 있어요 사용에 문제는 없어요노트20 울트라 256기가 케이스 끼워서 사용했는데 뒤에 기스가 있어요 사용에 문제는 없어요노트20 울트라 256기가 케이스 끼워서 사용했는데 뒤에 기스가 있어요 사용에 문제는 없어요노트20 울트라 256기가 케이스 끼워서 사용했는데 뒤에 기스가 있어요 사용에 문제는 없어요',
    image: [
      'https://dnvefa72aowie.cloudfront.net/origin/article/202304/540cdd9013c26f46e1e196f31d91591670d5480e927930dd1d0f37089d05cc67.webp?q=95&s=1440x1440&t=inside',
    ],
  },
  {
    id: '003',
    name: '교촌 반반오리지널',
    creator: '연리지나무',
    category: 'DIGITAL',
    key: 1,
    description: '유효기간이 얼마안남았어요. 필요하신분 연락주세요.',
    image: [
      'https://dnvefa72aowie.cloudfront.net/origin/article/202304/f13a0e616e4128a666f89a7ba587cd03b6db3584b5f6195b0f7e71ef561526c8.webp?q=95&s=1440x1440&t=inside',
    ],
  },
  {
    id: '004',
    name: '다이슨 공기청정기',
    creator: '진주시사는남자',
    category: 'DIGITAL',
    key: 1,
    description:
      '공기청정기 필터를 주문했는데 실수로 다른 필터를 시켜서 그냥 나눠드립니다.',
    image: [
      'https://dnvefa72aowie.cloudfront.net/origin/article/202304/f162e50d9b89b90ae6a2df4319ced8d27ba3b8f247817d3570298f10564ba19d.webp?q=95&s=1440x1440&t=inside',
    ],
  },
  {
    id: '005',
    name: '6단 선반',
    creator: '진1212',
    category: 'KITCHEN',
    key: 4,
    description: '60*130 단차는 조정 가능합니다.',
    image: [
      'https://dnvefa72aowie.cloudfront.net/origin/article/202304/b9e83f31153fda02e05d2674ba5982fe639052daad29e70f699df1994ea3e53f.jpg?q=95&s=1440x1440&t=inside',
    ],
  },
  {
    id: '006',
    name: '이케아 철제서랍',
    creator: '테잎자국 있어요',
    category: 'KITCHEN',
    key: 4,
    description: '테잎자국 있어요',
    image: [' '],
  },
  {
    id: '007',
    name: '안쓰는폰 정리합니다.',
    creator: '항개남편',
    category: 'DIGITAL',
    key: 1,
    description: '안쓰는폰 필요하신분 가져가세요',
    image: [
      'https://dnvefa72aowie.cloudfront.net/origin/article/202304/a57a1ca73e29c26b6b680e9874ba24c8f8c0d7c17fb26087e8489efd40107d0b.jpg?q=95&s=1440x1440&t=inside',
    ],
  },
];

const MESSAGES = [
  {
    user: 0,
    time: '12:00',
    content: '안녕하세요 아직 물건 있나요',
  },
  {
    user: 1,
    time: '12:05',
    content: '예 아직 있어요',
  },
  {
    user: 1,
    time: '12:07',
    content: '내일 역삼역 앞으로 7시까지 와줄수있나요? 퇴근하고 ㄱㄱ',
  },
  {
    user: 0,
    time: '12:09',
    content: '네',
  },
  {
    user: 0,
    time: '12:00',
    content: 'Good :)',
  },
  {
    user: 1,
    time: '14:05',
    content: '내일 안될듯 이틀뒤에 가능할까요?',
  },
  {
    user: 0,
    time: '12:07',
    content: 'Sure',
  },
  {
    user: 1,
    time: '12:09',
    content: 'Great',
  },
  {
    user: 0,
    time: '12:07',
    content: "7 o'clock?",
  },
  {
    user: 1,
    time: '12:09',
    content: 'Sounds good',
  },
];
export {Data, MESSAGES};
