var livebooking = require(rootDir + '/../models/livebooking'),
    MongoClient = require('mongodb').MongoClient;

describe('livebooking', function () {
  var booking, dbInstance;
  before(function (done) {
    MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
      if(err) throw err;
      dbInstance = db;
      booking = livebooking(db);
      done();
    });
  });
  afterEach(function (done) {
    dbInstance.collection('livebookings').remove(done);
  });
  describe('save', function () {
    it('is a function', function () {
      expect(booking.save).to.be.a('function');
    });
    it('persist data', function (done) {
      booking.save({ location: 'Baker Street' }, function(err, docs) {
        docs.length.should.eq(1);
        done();
      });
    });
  });
});

