export const generateRandomHexColor = (): string =>
  Math.floor(Math.random() * 16777215).toString(16);

export const getRandomLoremIpsum = () => {
  const randomNumber = Math.floor(Math.random() * 5) + 1;
  switch (randomNumber) {
    case 1:
      return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam convallis arcu ut tincidunt varius. Aliquam vel ipsum mollis, convallis elit auctor, finibus enim. Vestibulum augue dolor, scelerisque vitae mollis a, accumsan et eros. Ut tempor suscipit quam sed lobortis. Ut condimentum porttitor urna non mattis. Pellentesque eget orci luctus dolor pellentesque iaculis. Maecenas quam orci, congue et ex nec, malesuada aliquam magna. Nam facilisis luctus elit bibendum pellentesque.';
    case 2:
      return 'Curabitur augue nulla, porttitor sit amet egestas consequat, egestas ac mi. Integer ligula diam, porta in viverra non, porta eget dui. Cras ultricies nisi lectus, vel luctus ligula luctus ut. Aliquam vel egestas velit, ultrices interdum neque. Etiam dignissim dui eu nunc posuere viverra. Etiam pellentesque tempor enim a tempus.';
    case 3:
      return 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque neque velit, vulputate nec tellus vel, iaculis hendrerit metus. Quisque ac nulla sed mi dapibus sodales. Fusce malesuada metus vel risus convallis, ut lacinia dolor lacinia. Mauris nisl felis, vulputate nec massa eget, volutpat malesuada nunc.';
    case 4:
      return 'Morbi finibus velit mauris, et venenatis diam vehicula at. Pellentesque maximus neque eu est eleifend, a pharetra nunc semper. Duis id risus id enim pulvinar ultrices eget quis orci. Aenean ornare imperdiet neque eget placerat. Etiam sit amet aliquet neque. Fusce laoreet mi quam, cursus pretium lectus euismod quis.';
    case 5:
      return 'Quisque pulvinar congue mauris at posuere. Sed erat quam, pellentesque vel tellus id, rhoncus porta felis. Sed tincidunt justo lectus, accumsan euismod neque molestie et. Aliquam non ultrices eros, in pulvinar purus. Phasellus eu ligula lectus.';
  }
};

export const getRandomBoolean = () => {
  const randomNumber = Math.floor(Math.random() * 2) + 1;
  switch (randomNumber) {
    case 1:
      return true;
    case 2:
      return false;
  }
};

export const getRandomColorBrand = () => {
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  switch (randomNumber) {
    case 1:
      return 'Colors Unlimited';
    case 2:
      return 'The Rainbow Factory';
    case 3:
      return 'RGBoom';
  }
};
