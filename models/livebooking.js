var Livebooking = (function () {
  function Livebooking (db) {
    if (!db || typeof db.collection !== 'function') throw new Error('db instance required');
    this.collection = db.collection('livebookings');
  }

  Livebooking.prototype.save = function (params, callback) {
    collection.insert(params, callback);
  }

  Livebooking.prototype.find = function (query, callback) {
    if (typeof query === 'function') {
      callback = query;
      query = {};
    }
    if(typeof query !== 'object') throw new Error('query needs to be an object');
    collection.find(query).toArray(callback);
  }

  return Livebooking;
})();

module.exports = Livebooking;
