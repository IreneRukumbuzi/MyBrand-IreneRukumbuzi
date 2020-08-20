import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.should();
chai.use(chaiHttp);

let queryId;
let blogId;
let adminToken;

describe('My Brand IR Api', () => {
  describe('/login', () => {
    it('It should return no credentials', (done) => {
      const emptyCredentials = {
        email: '',
        password: '',
      };
      chai.request(server)
        .post('/login')
        .send(emptyCredentials)
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
    it('It should return invalid credentials', (done) => {
      const invalidCredentials = {
        email: 'invalid@gmail.com',
        password: 'jieojf',
      };
      chai.request(server)
        .post('/login')
        .send(invalidCredentials)
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });
    it('It should return valid email but invalid password', (done) => {
      const user = {
        email: 'admin@gmail.com',
        password: '123456',
      };
      chai.request(server)
        .post('/login')
        .send(user)
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });
    it('It should return Admin successfully logged in', (done) => {
      chai.request(server)
        .post('/login')
        .send({
          email: 'admin@gmail.com',
          password: '123456az',
        })
        .end((err, response) => {
          response.should.have.status(200);
          adminToken = response.body.token;
          done();
        });
    });
  });

  describe('/blogs', () => {
    it('It should get all the blogs', (done) => {
      chai.request(server)
        .get('/blogs')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.data.should.be.a('array');
          done();
        });
    });
    it('It should create one blog', (done) => {
      chai.request(server)
        .post('/blogs')
        .set('token', adminToken)
        .send({
          title: 'my experience at andela',
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          imageUrl: 'https://picsum.photos/600/300',
        })
        .end((err, response) => {
          response.should.have.status(200);
          blogId = response.body.data._id;
          done();
        });
    });
    it('It should not create one blog', (done) => {
      chai.request(server)
        .post('/blogs')
        .set('token', 'jsjdsajsakjsaas')
        .send({
          title: 'my experience at andela',
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          imageUrl: 'https://picsum.photos/600/300',
        })
        .end((err, response) => {
          response.should.have.status(403);
          done();
        });
    });
    it('It should not create one blog', (done) => {
      chai.request(server)
        .post('/blogs')
        .send({
          title: 'my experience at andela',
          content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          imageUrl: 'https://picsum.photos/600/300',
        })
        .end((err, response) => {
          response.should.have.status(401);
          done();
        });
    });
    it('It should not create a blog', (done) => {
      chai.request(server)
        .post('/blogs')
        .set('token', adminToken)
        .send({
          title: '',
          content: '',
          imageUrl: '',
        })
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
    it('It should get a blog by id', (done) => {
      chai.request(server)
        .get(`/blogs/${blogId}`)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it('It should not get a blog by id', (done) => {
      chai.request(server)
        .get('/blogs/hdhdhdhdhdhdhddh')
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
    it('It should edit a blog by id', (done) => {
      chai.request(server)
        .patch(`/blogs/${blogId}`)
        .set('token', adminToken)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it('It should not edit a blog by id', (done) => {
      chai.request(server)
        .patch('/blogs/hdhdhdhdhshs')
        .set('token', adminToken)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });

    it('It should add a comment by id', (done) => {
      chai.request(server)
        .post(`/blogs/comments/${blogId}`)
        .send({
          name: 'Irene',
          comment: 'Hey, awesome blog by the way!!',
        })
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it('It should not add a comment by id', (done) => {
      chai.request(server)
        .post('/blogs/comments/hdhshahdhd')
        .send({
          name: 'Irene',
          comment: 'Hey, awesome blog by the way!!',
        })
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
    it('It should not add a comment by id', (done) => {
      chai.request(server)
        .post('/blogs/comments/hdhshhshaa')
        .send({
          name: 'Hey',
          comment: 'Hey, awesome blog by the way!!',
        })
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
    it('It should not add a comment by id', (done) => {
      chai.request(server)
        .post(`/blogs/comments/${blogId}`)
        .send({
          name: '',
          comment: '',
        })
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
    it('It should add a like on a blog by id', (done) => {
      chai.request(server)
        .post(`/blogs/likes/${blogId}`)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it('It should not add a like on a blog by id', (done) => {
      chai.request(server)
        .post('/blogs/likes/hshdhshsdha')
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
    it('It should delete a blog by id', (done) => {
      chai.request(server)
        .delete(`/blogs/${blogId}`)
        .set('token', adminToken)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it('It should not delete a blog', (done) => {
      chai.request(server)
        .delete('/blogs/hshahahas')
        .set('token', adminToken)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe('/queries', () => {
    it('It should get all the queries', (done) => {
      chai.request(server)
        .get('/queries')
        .set('token', adminToken)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.data.should.be.a('array');
          done();
        });
    });
    it('It should create a query', (done) => {
      chai.request(server)
        .post('/queries')
        .send({
          name: 'Irene',
          email: 'irene@gmail.com',
          message: 'Hey, how has api staff been treating you for the last few days',
        })
        .end((err, response) => {
          queryId = response.body.data._id;
          response.should.have.status(200);
          done();
        });
    });
    it('It should not create a query', (done) => {
      chai.request(server)
        .post('/queries')
        .send({
          name: '',
          email: '',
          message: '',
        })
        .end((err, response) => {
          response.should.have.status(400);
          done();
        });
    });
    it('It should get one query by Id', (done) => {
      chai.request(server)
        .get(`/queries/${queryId}`)
        .set('token', adminToken)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it('It should not get a query', (done) => {
      chai.request(server)
        .get('/queries/hhdhdhdjsjsjsd')
        .set('token', adminToken)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe('/logout', () => {
    it('It should logout the user', (done) => {
      chai.request(server)
        .get('/logout')
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });

  describe('/*', () => {
    it('It should return method not allowed', (done) => {
      chai.request(server)
        .delete('/login')
        .end((err, response) => {
          response.should.have.status(405);
          done();
        });
    });
  });
});
