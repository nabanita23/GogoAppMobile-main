import changeNavigationBarColor, { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';

export const changeSystemButtonColor = async (color: string) => {
  try {
    await changeNavigationBarColor(color, true, true);
  } catch (e) {
    console.log(e); // {success: false}
  }
};

export const hide = () => {
  hideNavigationBar();
};

export const show = () => {
  showNavigationBar();
};
