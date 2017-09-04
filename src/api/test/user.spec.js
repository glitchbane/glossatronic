// // import * as mocha from 'mocha';
// let chai     = require('chai');
// let chaiHttp = require("chai-http");
// // let User = require("./app/user/user.models");
// // import { User } from '../app/user/user.models';
// let mongoose = require('mongoose');
// // mongoose.connect('mongodb://localhost/mtm_test');
// let user     = require('../app/user/user.models');
// let mocha = require('mocha');
//
// const server = require('../server');
//
// chai.use(chaiHttp);
// const expect         = chai.expect;
// process.env.NODE_ENV = 'test';
//
// // NOTE: the following users are expected to be in the test database, and no more:
// // { "_id" : ObjectId("58829289fb83fa91a2166672"), "authId" : "12345", "email" : "alovelace@gmail.com", "createdDate" : "2/20/1920", "modifiedDate" : "2/24/1920", "isLoggedIn" : true }
// // { "_id" : ObjectId("588292befb83fa91a2166673"), "authId" : "23456", "email" : "ghopper@gmail.com", "createdDate" : "4/20/1940", "modifiedDate" : "4/24/1940" }
//
//
// after((done) => {
//     user.User.remove({"email":"testnewperson@gmail.com"}, () => done());
//     user.User.remove({"email" : "fortuknit@hotmail.com"}, () => done());
//
// })
// describe('User API', () => {
//
//     describe('GET /api/user', () => {
//
//         it('returns an array of all users', () => {
//
//             chai.request(server)
//                 .get('/api/user')
//                 .then(res => {
//                     expect(res.status).to.equal(200);
//                     expect(res).to.be.json;
//                     expect(res.body).to.be.an('array');
//                     expect(res.body).to.have.length(2);
//                 });
//         });
//     });
//
//     describe('GET api/user/:id', () => {
//
//         it('responds with single JSON object', () => {
//             return chai.request(server).get('/api/user/58829289fb83fa91a2166672')
//                        .then(res => {
//                            expect(res.status).to.equal(200);
//                            expect(res).to.be.json;
//                            expect(res.body).to.be.an('object');
//                        });
//         });
//
//         it('retrieves the proper user by id', () => {
//             return chai.request(server).get('/api/user/58829289fb83fa91a2166672')
//                        .then(res => {
//                            let Ada = res.body;
//
//                            expect(Ada).to.exist;
//                            expect(Ada.email).to.equal("alovelace@gmail.com");
//                        });
//         });
//
//         // it('retrieves the proper user by email', () => {
//         //     return chai.request(server).get('/api/user/alovelace@gmail.com')
//         //                .then(res => {
//         //                    let Ada = res.body;
//         //
//         //                    expect(Ada).to.exist;
//         //                    expect(Ada.email).to.equal("alovelace@gmail.com");
//         //                });
//         // });
//
//         it('contains all required fields', () => {
//             return chai.request(server).get('/api/user/58829289fb83fa91a2166672')
//                        .then(res => {
//                            let Ada = res.body;
//
//                            expect(Ada).to.exist;
//                            expect(Ada).to.have.keys([
//                                                         '_id',
//                                                         'authId',
//                                                         'email',
//                                                         'createdDate',
//                                                         'modifiedDate',
//                                                         'isLoggedIn'
//                                                     ]);
//
//                        });
//         });
//     });
//
//     describe('POST api/user', () => {
//
//         let userId;
//
//         it(
//             'successfully saves a valid user', () => {
//                 let newUser = getTestUser();
//
//                 return chai.request(server).post('/api/user')
//                            .send(newUser)
//                            .then(
//                                (res) => {
//                                    expect(res.status).to.equal(201);
//                                    expect(res).to.be.json;
//                                    expect(res.body).to.be.an('object');
//                                    expect(res.body._id).to.exist;
//                                    userId = res.body._id;
//                                }
//                            );
//             }
//         );
//
//         it(
//             'successfully deletes a user', () => {
//                 let newUser = getTestUser();
//
//                 return chai.request(server).del('/api/user/' + userId)
//                    .send(newUser)
//                    .then(
//                        (res) => {
//                            expect(res.status).to.equal(200);
//                        }
//                    );
//             }
//         );
//     });
//
//     describe('POST api/user', () => {
//
//         it('does not allow users with duplicate email addresses', (done) => {
//             let newUser = {"email": "alovelace@gmail.com" };
//             chai.request(server)
//                 .post('/api/user')
//                 .send(newUser)
//                 .end((err, res) => {
//                     expect(res).to.have.status(500);
//                     done();
//                 })
//         });
//
//         it('validates that email is present', (done) => {
//
//             let testUser = { "user_id": "6789" };
//             chai.request(server)
//                 .post('/api/user')
//                 .send(testUser)
//                 .end((err, res) => {
//                     expect(res).to.have.status(500);
//                     done();
//                 })
//         });
//
//     });
//     let newUserId = null;
//     describe('POST api/user/login', () => {
//
//         it(
//             'sets isLoggedIn to true for a valid user', () => {
//                 let email = {"email": "alovelace@gmail.com"};
//                 return chai.request(server)
//                            .post('/api/user/login')
//                            .send(email)
//                            .then(
//                                (res) => {
//                                    expect(res.status).to.equal(200);
//                                    expect(res.body.isLoggedIn).to.be.true;
//                                }
//                            );
//             }
//         );
//
//
//         it(
//             'creates a new user if the user is not found', (done) => {
//                 let user = {"email": "testnewperson@gmail.com", "authId": "121212"};
//                 chai.request(server)
//                     .post('/api/user/login')
//                     .send(user)
//                     .end((err, res) => {
//                         expect(res).to.have.status(200);
//                         expect(res.body.email).to.equal(user.email);
//                         expect(res.body.authId).to.equal(user.authId);
//                         expect(res.body._id).not.to.be.null;
//                         expect(res.body.isLoggedIn).to.be.true;
//                         done();
//                     })
//             }
//         );
//
//         it(
//             'sets isLoggedIn to false on logout for valid user', (done) => {
//
//                 let email = {"email": "testnewperson@gmail.com"};
//                 chai.request(server)
//                     .post('/api/user/logout')
//                     .send(email)
//                     .end((err, res) => {
//                         expect(res).to.have.status(200);
//                         expect(res.body.isLoggedIn).to.be.false;
//                         done();
//                     })
//             }
//         );
//
//         it(
//             'returns 500 on logout for invalid user', (done) => {
//
//                 let email = 'alovele@gmail.com';
//                 chai.request(server)
//                     .post('/api/user/logout')
//                     .send(email)
//                     .end((err, res) => {
//                         expect(res).to.have.status(500);
//
//                         done();
//                     })
//             }
//         );
//     });
//
//     function getTestUser() {
//         return { "user_id": "auth0|583f77375e5686fa0d44cfcf", "email": "fortuknit@hotmail.com" };
//     }
// });
