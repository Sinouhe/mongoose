const mongoose = require('mongoose');
const schema = mongoose.Schema;

const blogBookSchema = new schema({
    title: {
        type: String,
        required: [true,'le titre est requis']
    },
    summary: {
         type: String
    },
    comments: [{
        type: schema.Types.ObjectId,
        ref: 'comment'
    }]
});

BlogBook = mongoose.model('blogBook',blogBookSchema);

module.exports = BlogBook