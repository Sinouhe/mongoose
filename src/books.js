const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bookSchema = new schema({
    title: {
        type: String,
        required: [true,'le titre est requis']
    },
    totalPages: {
        type: Number,
        required: false,
        default: 0,
        validate: {
            validator: (totalPages) => totalPages < 3000,
            message: 'Un livre doit avoir moins de 3000 pages'
        }
    }
});


module.exports = Book = mongoose.model('book',bookSchema);