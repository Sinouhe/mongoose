const assert = require('assert');

describe('Test de callback', () => {
    
    it('test callback sync', (done) => {
        console.log('début');
        getMember(done,(next) => {
            console.log(next);
            assert(1==1);
            
        },(next2) => {
            setTimeout(() => {
                console.log('4');
                console.log(next2);
                assert(1==1);
                done();
            },0.5);
           /* let test = 0 
            for (let i = 0 ; i < 500000000 ; i++){
                test = test + 3;
            }
            console.log('4');
            console.log(next2);
            assert(1==1);*/
              
        });
        console.log('fin sync');
    });

    it('test callback assync', (done) => {
        console.log('début');
        console.log('1');

        getMemberAssync('4',(err, date) => {
            if(err){
                console.log(err.message);
                done();
            }else{
                console.log(data);
                done();
            }
        });

        console.log('5');
        console.log('fin aasync');
    });
    
});

function getMember(done,next,next2) {
    console.log('1');
    setTimeout(() => {
        console.log('1.5');
        
    },0.005);
    next('2');
    console.log('3');
    next2('5');
    console.log('6');
    //done();
}

function getMemberAssync(str,callback){
    /*setTimeout(() => {
        console.log('4');
        console.log(next2);
        assert(1==1);
        done();
    },0.005);*/
    let test = 0 
    console.log('2');
    for (let i = 0 ; i < 500000000 ; i++){
        test = test + 3;
    }
    console.log('3');
    console.log(str);
    assert(1==1);
    err = undefined//new Error('test err');
    data = 'ok'
    callback(err, data);
}
