import bcryptLib from '../utils/bcryptLib.js';

const bcrypt = {
  hash: async (password, saltRounds = 10) => {
    const salt = await bcryptLib.genSalt(saltRounds);
    return bcryptLib.hash(password, salt);
  },
  compare: async (password, hash) => {
    return bcryptLib.compare(password, hash);
  }
};

export default bcrypt;
