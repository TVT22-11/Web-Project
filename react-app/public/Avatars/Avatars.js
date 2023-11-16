// public/Avatars/avatars.js

const avatars = Array.from({ length: 10 }, (_, index) => ({
    name: `Avatar ${index + 1}`,
    url: `/Avatars/Avatar_${index + 1}.png`,
  }));
  
  export default avatars;