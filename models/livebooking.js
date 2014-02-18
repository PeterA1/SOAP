var Livebooking = function(db) {
  if (!db || typeof db.collection !== 'function') throw new Error('db instance required');
  var collection = db.collection('livebookings');
  var that = {};

  that.save = function (params, callback) {
    collection.insert(params, callback);
  }

  return that;
}

module.exports = Livebooking;
