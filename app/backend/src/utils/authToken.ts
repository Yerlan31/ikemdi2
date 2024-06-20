import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import IUser from '../interfaces/IUsers';

const keyDB = fs.readFileSync('jwt.evaluation.key', { encoding: 'utf8' });

export const genToken = async (data: IUser) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(data, keyDB, jwtConfig as jwt.SignOptions);

  return token;
};

export const validateToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, keyDB);
    return decoded;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
