import models from "@/models";
import type { User } from "@/models/UserModel"; // Adjust this import based on your model export
import type { Optional } from "sequelize";

const userModel = models.user;

interface UserPayload extends Optional<User, "id"> {} // Assumes 'id' is auto-generated

class UserRepository {
	// Method to store a new user
	async store(user: UserPayload): Promise<User> {
		return await userModel.create(user);
	}

	// Method to update an existing user by ID
	async update(updateAblePayload: Partial<User>, id: number): Promise<User> {
		const user = await userModel.findByPk(id);
		if (!user) {
			throw new Error(`User with id ${id} not found`);
		}
		return await user.update(updateAblePayload);
	}

	// Method to find a user by their username
	async findByUserName(userName: string): Promise<User | null> {
		return await userModel.findOne({
			where: { user_name: userName, status: 1 },
		});
	}

	// Method to find a user by their ID
	async findById(id: number): Promise<User | null> {
		return await userModel.findByPk(id);
	}

	// Method to find all users
	async findAll(): Promise<User[]> {
		return await userModel.findAll({
			order: [["id", "DESC"]],
		});
	}
}

// Export the repository class
export default new UserRepository();
