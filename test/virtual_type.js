const assert = require('assert');
const User = require('../src/users')

describe('Test de virtula type', () => {
    it('Test du virtual type countBooks', (done) => {
        const user1 = new User({
            nom: 'Robin',
            books: [
                {title: 'le seigneur des anneaux'},
                {title: 'le seigneur des anneaux2'}
            ]
        });
        user1.save()
            .then(() => {
                return User.findOne({nom: 'Robin'});
            })
            .then((userResult) => {
                //console.log(userResult);
                //console.log(userResult.countBooks);
                assert(userResult.countBooks===2);
                userResult.setNom = 'Jean';
                //console.log(userResult);
                return userResult.save()
            }).then(() => {
                return User.findOne({nom: 'Jean'});
            })
            .then((userResult) => {
                //console.log(userResult);
                assert(userResult.nom === 'Jean');
                done();
            })
            .catch((err) =>{
                throw new Error(err.message);
            })

    })
})