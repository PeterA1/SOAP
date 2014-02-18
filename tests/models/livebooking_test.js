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
      (function () { livebooking.save({ location: 'Baker Street' }); }).should.throw;
    });
  });
});

