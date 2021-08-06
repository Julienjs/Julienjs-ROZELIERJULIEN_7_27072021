const User = require('./User');
const Post = require('./Post');


const load = async () => {
    await Post.belongsTo(User, {
        foreignKey: "userId",
        onDelete: "cascade"
    });

    await User.sync({ alter: true });
    await Post.sync({ alter: true });
}

module.exports = { User, Post, load };