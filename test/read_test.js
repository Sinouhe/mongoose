const assert = require('assert');
const Book = require('../src/books');


describe('Test de read', () => {
    let book1;
    beforeEach(done => {
        book1 = new Book({title:"Harry Potter"});
        book1.save().then(() => done());
    });
    it('recherche de livre par son titre', (done) => {
        Book.find({title:"Harry Potter"})
            .then((books) => {
                //console.log(books[0]);
                //console.log(book1); 
                assert(books[0]._id.equals(book1._id))
                done();
            }).catch((err) => {
                console.log(err.message);
                done()
            })
    });
    it('recherche de livre par son id', (done) => {
        Book.findOne({title:"Harry Potter"})
            .then((book) => {
                //console.log(typeof(book._id));
                //console.log(typeof(book1._id)); 
                assert(book._id.equals(book1._id));
                done();
            }).catch((err) => {
                console.log(err.message);
                done()
            })
    });
});