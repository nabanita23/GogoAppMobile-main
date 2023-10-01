export const baseImagePath = 'https://res.cloudinary.com/dxc5ccfcg/image/upload/';

type CDNImages = {
  gogoAttention: string;
  gogoConfused: string;
  gogoHappywalk: string;
  gogoLeft: string;
  gogoSearch: string;
  gogoBack: string;
  gogoFront: string;
  gogoHighjump: string;
  gogoPower: string;
  gogoWalk: string;
  gogoBlast: string;
  gogoHappy: string;
  gogoHurray: string;
  gogoRight: string;
  gogoFriend: string;
  gogoAuth: string;
};

export const images = {
  gogoAttention: 'v1684139998/gogo-app/gogo/attentation_n5s0ba',
  gogoConfused: 'v1684139998/gogo-app/gogo/confused_ev7hxv',
  gogoHappywalk: 'v1684139998/gogo-app/gogo/happywalk_ifpb75',
  gogoLeft: 'v1684140000/gogo-app/gogo/left_em9qkb',
  gogoSearch: 'v1684140000/gogo-app/gogo/search_ylddx3',
  gogoBack: 'v1684139998/gogo-app/gogo/back_xeqvzf',
  gogoFront: 'v1684139998/gogo-app/gogo/front_g5fdtw',
  gogoHighjump: 'v1684139999/gogo-app/gogo/highjump_stdltf',
  gogoPower: 'v1684140000/gogo-app/gogo/power_ikhdxr',
  gogoWalk: 'v1684140000/gogo-app/gogo/walk_limogu',
  gogoBlast: 'v1684139998/gogo-app/gogo/blast_nqryhj',
  gogoHappy: 'v1684139999/gogo-app/gogo/happy_xoh4je',
  gogoHurray: 'v1684139999/gogo-app/gogo/hurray_n1lpnr',
  gogoRight: 'v1684140000/gogo-app/gogo/right_f4azs6',
  gogoFriend: 'v1684323590/gogo-app/gogo/04_sxaeoa',
  gogoAuth: 'v1685783777/gogo-app/gogo/gog-blast_xkzlky',
};

export const getImageUrl = <T extends keyof CDNImages>(name: T): string =>
  `${baseImagePath}/w_600,fl_lossy,q_auto/${images[name]}`;
export const getThumbnailUrl = <T extends keyof CDNImages>(name: T): string =>
  `${baseImagePath}/w_600,fl_lossy,q_auto/${images[name]}`;
