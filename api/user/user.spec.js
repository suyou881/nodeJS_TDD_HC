// 테스트 코드

const request = require('supertest');
const should = require('should');
const app = require('../../index');
const models = require('../../models');

describe('GET /users는', ()=>{
    let users=[
        {name:'alice'},
        {name:'bek'},
        {name:'chris'}
    ];
    before(()=>models.sequelize.sync({force:true}));
    before(()=>models.User.bulkCreate(users));
    describe('성공시',()=>{
        
        it('유저 객체를 담은 배열로 응답한다.',(done)=>{
            request(app) // supertest에 express 객체를 넘겨주고,
            .get('/users') // get users로 요청을 보낸다.
            .end((err,res)=>{ // res의 body값을 검증하면 된다.
                res.body.should.be.instanceOf(Array);
                done();
            });
        });
        it('최대 limit 갯수만큼 응답한다.', (done)=>{
            request(app) 
            .get('/users?limit=2') // querystring으로 limit을 넘겨준다.
            .end((err,res)=>{ 
                res.body.should.have.lengthOf(2);
                done();
            });
        });
    });
    describe('실패시',()=>{
        it('limit이 숫자형이 아니면 400을 응답한다.',(done)=>{
            request(app)
            .get('/users?limit=hkh')
            .expect(400) // supertest에서 상태코드를 확인할 수 있는 validate를 제공한다.
                        // expect(검증할 상태코드)
            // .end((err,res)=>{
            //     //응답된 res 객체를 이용해서 상태코드를 확인해도 된다.
            //     //res.body~~~~
            //     done();
            // });
            .end(done);
        });
    });
    
});

describe('GET /users/:id은',()=>{
    let users=[
        {name:'alice'},
        {name:'bek'},
        {name:'chris'}
    ];
    before(()=>models.sequelize.sync({force:true}));
    before(()=>models.User.bulkCreate(users));
    describe('성공시',()=>{
        it('id가 1인 유저 객체를 반환한다.',(done)=>{
            request(app)
            .get('/users/1')
            .end((err,res)=>{
                // 기대하는 property가 id이고 그 값이 1이다.
                res.body.should.have.property('id',1);
                done();
            });
        });
    });
    describe('실패시',()=>{
        it('id가 숫자가 아닐경우 400으로 응답한다.',(done)=>{
            request(app)
            .get('/users/one')
            .expect(400)
            .end(done);
        });
        it('id로 유저를 찾을 수 없을 경우 440로 응답한다.',(done)=>{
            request(app)
            .get('/users/999')
            .expect(404)
            .end(done);
        });
    });
});

describe('GET /users/:id',()=>{
    let users=[
        {name:'alice'},
        {name:'bek'},
        {name:'chris'}
    ];
    before(()=>models.sequelize.sync({force:true}));
    before(()=>models.User.bulkCreate(users));
    describe('성공시', ()=>{
        it('204를 응답한다.', (done)=>{
            request(app)
            .delete('/users/1')
            .expect(204)
            .end(done);
        });
    });
    describe('실패시', ()=>{
        it('404를 응답한다.', (done)=>{
            request(app)
            .delete('/users/one')
            .expect(400)
            .end(done);
        });
    });
});

describe('POST /users',()=>{
    let users=[
        {name:'alice'},
        {name:'bek'},
        {name:'chris'}
    ];
    before(()=>models.sequelize.sync({force:true}));
    before(()=>models.User.bulkCreate(users));
    describe('성공시', ()=>{
        let name = 'daniel', body;
        before(done=>{
            request(app)
            .post('/users')
            .send({name})
            .expect(201)
            .end((err,res)=>{
                console.log(res.body);
                console.log(err);
                body = res.body;
                done();
            });
        });
        it('생성된 유저 객체를 반환한다.', ()=>{
            body.should.have.property('id');
        });
        it('입력한 name을 반환한다',()=>{
            body.should.have.property('name', name)
        });
    });
    describe('실패시', ()=>{
        it('name 파라미터 누락시 400을 반환한다.',(done)=>{
            request(app)
            .post('/users')
            .send({})
            .expect(400)
            .end(done);
        });
        it('name이 중복일 경우 409를 반환한다.',(done)=>{
            request(app)
            .post('/users')
            .send({name:'daniel'})
            .expect(409)
            .end(done);
        });
    });
});

describe('PUT /users/:id',()=>{
    let users=[
        {name:'alice'},
        {name:'bek'},
        {name:'chris'}
    ];
    before(()=>models.sequelize.sync({force:true}));
    before(()=>models.User.bulkCreate(users));
    describe('성공시', ()=>{
        let name = 'chally';
        it('변경된 name을 응답한다.', (done)=>{
            request(app)
            .put('/users/3')
            .send({name})
            .end((err,res)=>{
                res.body.should.have.property('name', name);
                done();
            });
        });
    });
    describe('실패시', ()=>{
        it('정수가 아닌 id일 경우 400을 반환한다.', (done)=>{
            request(app)
            .put('/users/one')
            .expect(400)
            .end(done);
        });
        it('name이 없을 경우 400을 응답한다.', (done)=>{
            request(app)
            .put('/users/1')
            .send({})
            .expect(400)
            .end(done);
        });
        it('없는 유저일 경우 404를 응답한다.', (done)=>{
            request(app)
            .put('/users/999')
            .send({name:'haha'})
            .expect(404)
            .end(done);
        });
        it('이름이 중복일 경우 409를 응답한다.', (done)=>{
            request(app)
            .put('/users/3')
            .send({name:'bek'})
            .expect(409)
            .end(done);
        });
    });
});