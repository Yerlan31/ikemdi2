import * as bcryptjs from 'bcryptjs';
import { genToken } from '../utils/authToken';
import User from '../database/models/users';

const verifyUser = async (email: string, pass: string) => {
  const existUser = await User.findOne({ where: { email }, raw: true });

  if (!existUser) throw new Error('Incorrect email or password');

  const { id, username, role } = existUser;

  const isPasswordValid = await bcryptjs.compare(pass, existUser.password);

  if (!isPasswordValid) {
    throw new Error('Incorrect email or password');
  }

  const token = await genToken({ id, username, role, email });

  return {
    user: {
      id,
      username,
      role,
      email,
    },
    token,
  };
};

export default { verifyUser };
