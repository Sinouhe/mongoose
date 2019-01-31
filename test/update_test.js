const assert = require('assert');
const Book = require('../src/books');

let newTitle= 'Game of thrones';

describe('Test de update', () => {
    let book1;    
    beforeEach((done) => {
        book1 = new Book({title:"Moby Dick"});
        book1.save()
            .then(() => done())
            .catch((err) => {
                //console.log(err.message);
                done(err);
            })
    });

    it('Update depuis une instance', (done) => {
        book1.set('title',newTitle);
        assertTitle(book1.save(),done);
    });


    it('Update depuis le model', (done) => {
        assertTitle(Book.updateMany({title: 'Moby Dick'},{title: newTitle}),done);
    });

    it('Recherche un livre par son titre et update (findOneAndUpdate)', (done) => {
        assertTitle(Book.findOneAndUpdate({title: 'Moby Dick'},{title: newTitle}),done);
    });

    it('Recherche un livre par son id et update (findByIdAndUpdate)', (done) => {
        assertTitle(Book.findByIdAndUpdate(book1._id,{title:newTitle}),done);
        //assertTitle(Book.findOneAndUpdate(book1._id,{title:newTitle}),done);
    });

    it('Recherche un livre et incrémente son nombre de page', (done) => {
        Book.updateMany({title:'Moby Dick'},{$inc: {totalPages: 3}})
            .then(() =>  {
                return Book.findOne({title: 'Moby Dick'})
            }).then((book) => {
                //console.log(book);
                assert(book.totalPages === 3 );
                done();
            }).catch((err) => {
                console.log('ERROR : ' + err.message)
            });
    });
    
});

function assertTitle(promise,done){
    promise.then(() => {
        Book.find({title: newTitle})
            .then((books) => {
            
                assert(books[0].title===newTitle);
                done();
            })
            .catch((err) => {
                //console.log(err.message);
                done(err);
            })
    })
}