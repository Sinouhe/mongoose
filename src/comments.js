const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentSchema = new schema({
    content: {type: String},
    user: {
        type: schema.Types.ObjectId,
        ref: 'user'
    }
});

Comment = mongoose.model('comment',commentSchema);

module.exports = Comment;