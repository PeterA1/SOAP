var Livebooking = require(rootDir + '/../models/livebooking'),
    MongoClient = require('mongodb').MongoClient;

describe('livebooking', function () {
  var booking, dbInstance;
  before(function (done) {
    MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
      if(err) throw err;
      dbInstance = db;
      livebooking = Livebooking(db);
      done();
    });
  });
  afterEach(function (done) {
    dbInstance.collection('livebookings').remove(done);
  });

  it('needs db instance', function () {
    expect(Livebooking).to.throw(Error, 'db instance required');
  });

  it('needs db instance', function () {
    (function () { Livebooking({});}).should.throw(Error, 'db instance required');
  });

  describe('save', function () {
    it('is a function', function () {
      expect(livebooking.save).to.be.a('function');
    });
    it('persist data', function (done) {
      livebooking.save({ location: 'Baker Street' }, function(err, docs) {
        docs.length.should.eq(1);
        done();
      });
    });
    it('needs callback function', function () {
      (function () { livebooking.save({ location: 'Baker Street' }); }).should.throw(Error);
    });
  });

  describe('find', function () {
    var booking = require(rootDir + '/factories/livebooking').build('livebooking');
    it('is a function', function () {
      expect(livebooking.find).to.be.a('function');
    });
    beforeEach(function (done) {
      livebooking.save(booking, done);
    });
    it('queries database', function (done) {
      livebooking.find({ country: 'GB' }, function (err, result) {
        result.should.deep.equal([booking]);
        done();
      });
    });
    it('needs callback function', function () {
      expect(livebooking.find).to.throw(Error);
    });
    it('finds all if no query specified', function (done) {
      livebooking.find(done);
    });
    it('query needs to be an object', function (done) {
      (function () { livebooking.find('gb', function (){}); }).should.throw(Error, 'query needs to be an object');
      done();
    });
  });
});

