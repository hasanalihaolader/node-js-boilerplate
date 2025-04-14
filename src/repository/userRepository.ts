import models from '../models';
import { User } from '../models/user'; // Adjust this import based on your model export
import { Optional } from 'sequelize';

const userModel = models.user;

interface UserPayload extends Optional<User, 'id'> {} // Assumes 'id' is auto-generated

const userRepository = {
  store: async (user: UserPayload): Promise<User> => {
    return await userModel.create(user);
  },

  update: async (updateAblePayload: Partial<User>, id: number): Promise<User> => {
    const user = await userModel.findByPk(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return await user.update(updateAblePayload);
  },

  findByUserName: async (userName: string): Promise<User | null> => {
    return await userModel.findOne({ where: { user_name: userName, status: 1 } });
  },

  findById: async (id: number): Promise<User | null> => {
    return await userModel.findByPk(id);
  },

  findAll: async (): Promise<User[]> => {
    return await userModel.findAll({
      order: [['id', 'DESC']],
    });
  },
};

export default userRepository;
