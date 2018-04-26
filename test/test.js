var assert = require('assert');
var should = require('should');
var supertest = require("supertest");
var server = supertest.agent("http://localhost:3030");

// наборов тестов и его описание
describe("Описание теста", function() {
    // Пошел сам тест. done - функция которая вызывается при успешном выполнение теста (тут неявно)
    it("Server started", function(done) {
        server.get('/')
            .set('Accept', 'application/json')
            .expect(200, done)
    });

    it("Get all users", function(done) {
        server
            .get('/user/getallusers')
            .expect(200)
            .end(function(err, res) {
                /**
                 * Проверка как выполнился запрос.
                 * Например реакция на неверный код ответа
                 */

                if (err) {
                    assert(false, err.message);
                    return;
                }

                done();
            });
    });
    //
    // it("Add new user", function(done) {
    //     var values = {
    //         "firstName": "secondbvb",
    //         "lastName": "second2222",
    //         "email": "vyhj@knl.vf",
    //         "phone": 11231,
    //         "dateBirth": "1976-10-21T00:00:00.021Z"};
    //     server
    //         .post('/user/adduser')
    //         .send(values)
    //         .set('Accept', 'application/json')
    //         .expect(200)
    //         .end(function(err, res) {
    //             // Проверка тела ответа
    //             res.body.should.not.have.property("err")
    // res.body.should.be.instanceof(Object); // тип тела
    // res.body.method.should.equal("POST"); // значение поля method
    //             // res.body.should.have.property("err")
    //             done();
    //         });
    // });

    it("Update user info", function(done) {
        var values = {
            "firstName": "secondbvb",
            "lastName": "bkjknj",
            "email": "vyhj@knl.vf",
            "phone": 11231,
            "dateBirth": "1976-10-21T00:00:00.021Z"};
        server
            .put('/user/updateuser/5adf41c0c31f8c6d13e2baec')
            .send(values)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) {
                // Проверка тела ответа
                // res.body.should.be.instanceof(Object); // тип тела
                // res.body.method.should.equal("PUT"); // значение поля method
                res.body.should.not.have.property("err")
                // res.body.should.have.property("err")
                done();
            });
    });

});

