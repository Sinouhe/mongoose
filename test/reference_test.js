const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/users')
const BlogBook = require('../src/blogBooks')
const Comment = require('../src/comments')





describe('Test de reference', () => {
    let user,blogbook,comment;

    beforeEach((done) => {
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

        Promise.all([user.save(),blogbook.save(),comment.save()])
        .then(() => {
            done();
        })
        .catch((err) => {
            throw new Error(err.message);
        })

        

    })

    it('test le titre du livre d un user', (done) => {
       User.findOne({nom: 'Robin'}).populate('blogBooks')
        .then((userResult) => {
            //console.log(userResult)
            assert(userResult.blogBooks[0].title === 'Les fourmis');
            done();
        })
        .catch((err) => {
            throw new Error(err.message);
        });
    });

    it('test pour retrouver le commentaire d un user', (done) => {
        User.findOne({nom: 'Robin'}).populate({
            path: 'blogBooks',
            populate: {
                path:'comments',
                model: 'comment'
            }
        })
         .then((userResult) => {
            //console.log(userResult.blogBooks[0])
            assert(userResult.blogBooks[0].comments[0].content === 'j adore les fourmis');
            done();
         })
         .catch((err) => {
             throw new Error(err.message);
         });
     });


});

