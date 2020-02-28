import axios from "axios";

const initCollection = (collection, password) => {
  return axios
    .get(`/api/init/${collection}/${password}`)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log( "ERR", err.response.data);
      return err.response.data;
    });
};
 
const cloneObject = (obj) => {
  if (obj === null || typeof (obj) !== 'object' || 'isActiveClone' in obj)
      return obj;
  var temp;

  if (obj instanceof Date)
      temp = new obj.constructor(); //or new Date(obj);
  else
      temp = obj.constructor();

  for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
          obj['isActiveClone'] = null;
          temp[key] = cloneObject(obj[key]);
          delete obj['isActiveClone'];
      }
  }
  return temp;
};

const imageExists = (path) =>
  new Promise(resolve => {
    console.log("imageExists: ", path );
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = path;
});

/*
const imageExistsx = (url, callback) => {
  var img = new Image();
  img.onload = function() { callback(true); };
  img.onerror = function() { callback(false); };
  img.src = url;
}
*/
export { initCollection, cloneObject, imageExists };
