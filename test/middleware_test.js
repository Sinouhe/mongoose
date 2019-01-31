const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/users')
const BlogBook = require('../src/blogBooks')
const Comment = require('../src/comments')


describe('Test de middlewear', () => {

    it('Test que les livres sont supprimés si le user est supprimé', (done) => {
        let user,blogbook,comment;

        user = new User({
            nom: 'Robin'
        });
        blogbook = new BlogBook({
            title: 'Les fourmis',
            summary: 'Un livre sur les fourmis...'
        });
        comment = new Comment({
            content: 'j adore les fourmis'
        })
        //console.log(user);
        //console.log(blogbook);
        user.blogBooks.push(blogbook);
        blogbook.comments.push(comment);
        comment.user = user;
        //console.log(blogbook);
        Promise.all([user.save(),blogbook.save(),comment.save()])
        .then(() => {
            return BlogBook.estimatedDocumentCount();
        }).then((countResut) => {
            //console.log(countResut);
            return user.remove();
        }).then(() => {
            return BlogBook.estimatedDocumentCount();;
        })
        .then((countResult) => {
            assert(countResult===0);
            done();
        })
        .catch((err) => {
            throw new Error(err.message);
        })
    });
});