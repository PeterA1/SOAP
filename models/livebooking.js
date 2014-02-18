var Livebooking = function(db) {
  if (!db || typeof db.collection !== 'function') throw new Error('db instance required');
  var collection = db.collection('livebookings');
  var that = {};

  that.save = function (params, callback) {
    collection.insert(params, callback);
  }

  that.find = function (query, callback) {
    if (typeof query === 'function') {
      callback = query;
      query = {};
    }
    if(typeof query !== 'object') throw new Error('query needs to be an object');
    collection.find(query).toArray(callback);
  }

  return that;
}

module.exports = Livebooking;
