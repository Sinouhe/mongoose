const mongoose = require('mongoose');

mongoose.promise = global.promise;

before((done) => {

    mongoose.connect('mongodb://localhost/books_test',{
        useNewUrlParser:true,
    });

    mongoose.connection
        .once('open',() => {
            console.log('connection établie');
            done();
        }).on('error',(error) => {
            console.warn('Erreur durant la connextion',error);
            //done();        
        }) 
})

beforeEach('supprime ancien livre',(done) => {
    /*//const books = mongoose.connection.collections.books;
    //const users = mongoose.connection.collections.users;
    const {books,users} = mongoose.connection.collections;
    //console.log(books)
    if (books){
        //console.log('supprime anciens livres')
        books.deleteMany(() => {
            if(users){
                users.deleteMany(() => {
                    done();
                })
            }
        });
    }else{
        done();
    }
    done();*/
    //console.log(mongoose.connection.db)
    mongoose.connection.db.dropDatabase()
        .then(() => {
            //console.log("ok");
            done();
        })
        .catch((err) => {
            throw new Error(err.message);
        })
});