const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
// const Like = require('./Like')
const Likes = require('./Likes')
const LikesComments = require('./LikesComments')

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

    await Post.hasMany(Likes, {
        // foreignKey: "postId",
        onDelete: 'cascade'

    });

    await User.hasMany(Likes, {
        // foreignKey: "postId",
        onDelete: 'cascade'

    });


    await Comment.hasMany(LikesComments, {
        // foreignKey: "postId",
        onDelete: 'cascade'

    });

    await User.hasMany(LikesComments, {
        // foreignKey: "postId",
        onDelete: 'cascade'

    });

    await User.sync();
    await Comment.sync({ alter: true });
    await Post.sync();
    await Likes.sync();
    await LikesComments.sync();


    // await Like_Post.sync();

    // await Like.sync();
    // { force: true }{ alter: true }{ alter: true }{ alter: true }{ alter: true }

}
// Like,
module.exports = { User, Post, Comment, Likes, LikesComments, load };