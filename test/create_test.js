const assert = require('assert');
const Book = require('../src/books');


describe('Test de create', () => {
    
    it('sauvegarde d un livre', (done) => {
        const book1 = new Book({title: "Harry potter"});
        //throw new Error('erreur');
        book1.save().then(() => {
            assert(!book1.isNew);
            done();
        });
    });


});

