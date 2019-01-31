const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bookSchema = require('./books').schema
const blogBook = require('./blogBooks');

const userSchema = new schema({
    nom: {
        type: String,
        required: [true,'le nom est requis']
    },
    books: [bookSchema],
    blogBooks: [{
        type: schema.Types.ObjectId,
        ref: 'blogBook'
    }]
});


userSchema.virtual('countBooks').get(function(){
    return this.books.length;
});

userSchema.virtual('setNom').set(function(valeur){
    this.nom = valeur;
    return true;
});

userSchema.pre('remove',function(next) {
    //console.log(this.blogBooks);
    blogBook.remove({_id : {$in : this.blogBooks}})
        .then(() => {
            next();
        });
});

const User = mongoose.model('user',userSchema);

module.exports = User;