const models = require('../models');
const userModel = models.user;

const userRepository = {
    store: async (user) => {
        return await userModel.create(user);
    },
    update: async (updateAblePayload, id) => {
        const user =  await userModel.findByPk(id);
        return await user.update(updateAblePayload);
    },
    findByUserName: async (userName) => {
        return await userModel.findOne({ where: { user_name: userName, status: 1} });
    },
    findById: async (id) => {
        return await userModel.findByPk(id);
    },
    findAll: async () => {
        return await userModel.findAll({
            order: [['id', 'DESC']]
        });
    },
}
module.exports = userRepository;