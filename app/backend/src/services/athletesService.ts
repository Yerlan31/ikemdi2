import { Identifier } from 'sequelize/types';
import Athlete from '../database/models/athletes';
import User from '../database/models/users';
import UserDTO from "../dto/usersDTO";
import AthleteCreateDTO from "../dto/athletesCreateDTO";
import Users from "../database/models/users";
import {use} from "chai";

export const getAllAthletes = async () => {
  return await Athlete.findAll();
};

export const getAthleteById = async (id: Identifier | undefined) => {
  return  await Athlete.findByPk(id);
};

export const getAthleteAndUserById = async (id: Identifier | undefined) => {
  try {
    if (!id) {
      throw new Error('ID is undefined');
    }

    const user = await Users.findByPk(id);
    const athlete = await Athlete.findOne({ where: { userId: id } });

    return { user, athlete };
  } catch (error : any) {
    throw new Error(`Failed to fetch user and athlete: ${error.message}`);
  }
};

export const createAthlete = async (athleteData: AthleteCreateDTO, userData: UserDTO) => {
  const user = await User.create(userData);
  return await Athlete.create({ ...athleteData, userId: user.id });
};

export const updateAthlete = async (id: Identifier | undefined, athleteData: any, userData: any, passwordObj:any) => {
  const athlete = await Athlete.findByPk(id);
  if (athlete) {
    const user = await User.findByPk(athlete.userId);

    if (user) {
      if (user?.password === passwordObj.newPassword) {
        userData.password = user?.password;
      }
      
      await user.update(userData);
    }
    return await athlete.update(athleteData);
  }
  return null;
};

export const deleteAthlete = async (id: Identifier | undefined) => {
  const athlete = await Athlete.findByPk(id);
  if (athlete) {
    const user = await User.findByPk(athlete.userId);
    if (user) {
      await user.destroy();
    }
    return await athlete.destroy();
  }
  return null;
};
