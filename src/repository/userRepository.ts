import type User from "@/models/UserModel"; // Adjust this import based on your model export
import type { Optional } from "sequelize";
import { getModel } from "@/models";
interface UserPayload extends Optional<User, "id"> {} // Assumes 'id' is auto-generated

class UserRepository {

	private UserModel!: typeof User; // Type of the User model
	private modelInitialized = false;

	private async initModel() {
		if (!this.modelInitialized) {
			this.UserModel = await getModel("User");
			this.modelInitialized = true;
		}
	}

	// Method to store a new user
	async store(user: UserPayload): Promise<User> {
		await this.initModel();
		return await this.UserModel.create(user);
	}

	// Method to update an existing user by ID
	async update(updateAblePayload: Partial<User>, id: number): Promise<User> {
		await this.initModel();
		const user = await this.UserModel.findByPk(id);
		if (!user) {
			throw new Error(`User with id ${id} not found`);
		}
		return await user.update(updateAblePayload);
	}

	// Method to find a user by their username
	async findByUserName(userName: string): Promise<User | null> {
		await this.initModel();
		return await this.UserModel.findOne({
			where: { user_name: userName, status: 1 },
		});
	}

	// Method to find a user by their ID
	async findById(id: number): Promise<User | null> {
		await this.initModel();
		return await this.UserModel.findByPk(id);
	}

	// Method to find all users
	async findAll(): Promise<User[]> {
		await this.initModel();
		return await this.UserModel.findAll({
			order: [["id", "DESC"]],
		});
	}
}

// Export the repository class
export default new UserRepository();