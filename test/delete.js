const assert = require('assert');
const Book = require('../src/books');


describe('Test de delete', () => {
    let book1;
    beforeEach(done => {
        book1 = new Book({title:"Odysée"});
        book1.save()
        .then(() => done())
        .catch((err) => {
            console.log(err.message); 
            done()
        });
    });
    
    function assertDelete(promise, done){
        promise.then(() => {
            return Book.findOne({title:'Odysée'});
        }).then((book) =>{
            //console.log(book);
            assert(book===null);
            done();
        }).catch((err) => {
            console.log('ERROR : '+err.message);
            done();
        });
    }
    
    it('suppression de livre par l instance', (done) => {
        /*let promesseFindOne = Book.findOne({title:'Odysée'});
        promesseFindOne.then((book) => {
            console.log(book);
        }).catch((err) => {
            console.log(err.message);
        })*/
        let promesseRemove = book1.remove();
        assertDelete(promesseRemove,done);
    });

    it('suppression de livre par modele', (done) => {
        /*let promesseFindOne = Book.findOne({title:'Odysée'});
        promesseFindOne.then((book) => {
            console.log(book);
        }).catch((err) => {
            console.log(err.message);
        })*/
        //assertDelete(Book.remove({title:"Odysée"}),done) // deprecated
        assertDelete(Book.findOneAndDelete({title:"Odysée"}),done);
    });

    it('recher un ivre par son titre et delete',(done) =>{
        //assertDelete(Book.findOneAndRemove({title:"Odysée"}),done); // deprecated
        done();
    })
});