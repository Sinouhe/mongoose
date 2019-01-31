const assert = require('assert');
const Book = require('../src/books');


describe('Test de validation', () => {
    
    it('un titre doit être requis', (done) => {
        const book1 = new Book({title: undefined});
        //Sync
        const validationResult = book1.validateSync();
        if(validationResult){
            let {message} = validationResult.errors.title;
            assert(message === 'le titre est requis');
            done();
        }else{
            done()
        }

        //Assync
        /*book1.validate().then(() => {
            console.log('ok');
            done();
        }).catch((err) => {
            console.log('error');
            console.log(err.message);
            done();
        })*/
    });

    it('un livre doit avoir au moins 3000 pages', (done) => {
        const book1 = new Book({title: 'Les fleurs du mal', totalPages: 3001});
        //Sync
        book1.validate((validationResult) => {
            if(validationResult){
                const {message} = validationResult.errors.totalPages;
                assert(message==='Un livre doit avoir moins de 3000 pages');
                done();
            }else{
                throw new Error('Book1 devrait avoir une erreur')
                done();
            }
        });
    });
    
});

