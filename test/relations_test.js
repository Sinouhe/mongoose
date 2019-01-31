const assert = require('assert');
const User = require('../src/users');


describe('Test de relation', () => {
    
    beforeEach(done => {
        
        done();
        //console.log(user1)
        //user1.save().then(() => done());
    });

    it('test la taille de la liste des livres d un user', (done) => {
        const user1 = new User({
            nom: 'Robin',
            books: [{title: 'Le seigneur des anneaux'},{title: 'Les raisins de la colère'}]
        });
        user1.save()
            .then(() => {
                return User.findOne({nom: 'Robin'})
            })
            .then((userResult) => {
                //console.log(userResult)
                if(userResult){
                    assert(userResult.books.length == 2);
                    //console.log('ok');
                    done();
                }else{
                    throw new Error('User devrait exister');
                    //console.log('User devrait exister');
                    done();
                }
            })
            .catch((err) => {
                throw new Error(err.message);
                done();
            });
        });

    it('Ajout d un livre a un user', (done) => {
        const user1 = new User({
            nom: 'Robin'
        });
        user1.books.push({title: 'Le seigneur des anneaux'});
        user1.save()
            .then(() => {
                return User.findOne({nom: 'Robin'})
            })
            .then((userResult) => {
                //console.log(userResult)
                if(userResult){
                    assert(userResult.books.length == 1);
                    //console.log('ok');
                    done();
                }else{
                    throw new Error('User devrait exister');
                    //console.log('User devrait exister');
                    done();
                }
            })
            .catch((err) => {
                throw new Error(err.message);
                done();
            });

    });

    it('suppression d un livre a un user', (done) => {
        let user1 = new User({
            nom: 'Robin'
        });
        user1.books.push({title: 'Le seigneur des anneaux'},{title: 'Le seigneur des anneaux 2'});
        //console.log(user1)
        user1.save()
            .then(() => {
                return User.findOne({nom: 'Robin'})
            })
            .then((userResult) => {
                //console.log(userResult)
                if(userResult){
                    assert(userResult.books.length == 2);
                    //console.log('ok');
                    //console.log(userResult);
                    userResult.books[0].remove();
                    user1 = new User({
                        nom: userResult.nom,
                        books: userResult.books
                    }) 
                    //console.log(user1)
                    return User.deleteMany({nom: 'Robin'});                    
                }else{
                    throw new Error('User devrait exister');
                    //console.log('User devrait exister');
                    done();
                }
            })
            .then(() => {
                //console.log('ok');
                return user1.save();
                
            })
            .then(() => {
                //console.log('ok');
                return User.findOne({nom: 'Robin'})
            })
            .then((userResult) => {
                //console.log(userResult)
                if(userResult){
                    assert(userResult.books.length == 1);
                    //console.log('ok');
                    done();
                }else{
                    throw new Error('User devrait exister');
                    //console.log('User devrait exister');
                    done();
                }
            })            
            .catch((err) => {
                throw new Error(err.message);
                done();
            });

    });



});

