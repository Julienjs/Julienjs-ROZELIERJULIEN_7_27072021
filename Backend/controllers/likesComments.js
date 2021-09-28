const { LikesComments } = require("../models/index");

exports.addlikeComment = async (req, res, next) => {
    const { CommentId } = req.body;
    const UserId = req.token.userId;
    const found = await LikesComments.findOne({ where: { CommentId: CommentId, UserId: UserId } });
    if (!found) {
        await LikesComments.create({ CommentId: CommentId, UserId: UserId });
        res.json({ liked: true })
    }
    else {
        await LikesComments.destroy({
            where: { CommentId: CommentId, UserId: UserId },
        });
    }
    res.json({ liked: false })
}