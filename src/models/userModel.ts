import type { UserAttributes } from "@/interface/model/UserAttributes";
import { type Sequelize, DataTypes, Model, type Optional } from "sequelize";

type UserCreationAttributes = Optional<UserAttributes, "id">;
export default class UserModel
	extends Model<UserAttributes, UserCreationAttributes>
	implements UserAttributes
{
	public id!: number;
	public user_name!: string;
	public password!: string;
	public status!: boolean;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	static initModel(sequelize: Sequelize): typeof UserModel {
		UserModel.init(
			{
				id: {
					type: DataTypes.INTEGER,
					autoIncrement: true,
					primaryKey: true,
				},
				user_name: {
					type: DataTypes.STRING,
					allowNull: false,
					unique: true,
				},
				password: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				status: {
					type: DataTypes.BOOLEAN,
					defaultValue: true,
				},
			},
			{
				sequelize,
				tableName: "user",
				modelName: "User",
			}
		);

		return UserModel;
	}
}
