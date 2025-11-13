import bcrypt from 'bcryptjs';

const bcryptUtils = {
  hash: async (password, saltRounds = 10) => {
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  },
  compare: async (password, hash) => {
    return bcrypt.compare(password, hash);
  },
};

export default bcryptUtils;
