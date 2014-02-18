var Livebooking = function(db) {
  var collection = db.collection('livebookings');
  var that = {};

  that.save = function (params, callback) {
    collection.insert(params, callback);
  }

  return that;
}

module.exports = Livebooking;
