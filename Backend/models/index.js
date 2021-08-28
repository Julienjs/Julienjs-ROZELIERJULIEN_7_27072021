const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');



const load = async () => {
    await Post.belongsTo(User, {
        foreignKey: "userId",
        onDelete: "cascade"
    });
    await Comment.belongsTo(User, {
        foreignKey: "userId",
        onDelete: 'cascade'

    });
    await Post.hasMany(Comment, {
        foreignKey: "postId",
        onDelete: 'cascade'

    });

    await User.sync();
    await Comment.sync();
    await Post.sync({ alter: true });

}

module.exports = { User, Post, Comment, load };