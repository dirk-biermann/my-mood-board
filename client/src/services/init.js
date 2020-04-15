
/*
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
*/

const cloneObject = (obj) => {
  let newObj = Object.assign({}, obj);
  return newObj;
}

const cloneObjectOld = (obj) => {
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
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = path;
});

const moveElement = (array, from, to) => {
    if (to >= array.length) {
        to = array.length - 1;
    }
    array.splice(to, 0, array.splice(from, 1)[0]);
    return array;
};

const toInt = (num,base) => {
  const parsed = Number.parseInt(num, base);
  if (Number.isNaN(parsed)) {
    return 0;
  }
  return parsed;
}

const getElementData = (props) => {
    let dataValue = {};

    if( props.elementData ) {
      dataValue.props = cloneObject( props.elementData );

      if( dataValue.props.value === null ) { dataValue.props.value = dataValue.props.opt.def; }
      if( !dataValue.props.label.endsWith(":") ) {dataValue.props.label += ":"; }

      dataValue.props.autoFocus = props.autoFocus;
      dataValue.props.margin = props.margin;
      dataValue.props.readOnly = props.readOnly;
      dataValue.props.isDisabled = props.isDisabled;

      dataValue.hasUnit = dataValue.props.opt.unit !== undefined ? true : false;
      dataValue.valUnit = dataValue.hasUnit ? dataValue.props.opt.unit : '';
    } else {
      dataValue.props = Object.assign({}, props);
      //dataValue.props = props;

      if( !dataValue.props.label.endsWith(":") ) {dataValue.props.label += ":"; }
      
      dataValue.hasUnit = props.unit !== undefined ? true : false;
      dataValue.valUnit = dataValue.hasUnit ? props.unit : '';
    }

    dataValue.marginBottom = dataValue.props.margin !== undefined ? {marginBottom: "0.5rem"} : {};
    dataValue.len = dataValue.props.opt !== undefined ? ( dataValue.props.opt.len ? dataValue.props.opt.len.toString() : "" ) : "";
    dataValue.rowCnt = dataValue.props.opt !== undefined ? dataValue.props.opt.row : 3;
    dataValue.minHeight = dataValue.props.minHeight !== undefined ? { minHeight: dataValue.props.minHeight } : { minHeight: "40px" };

    dataValue.min = props.min !== undefined ? props.min.toString() : "";
    dataValue.max = props.max !== undefined ? props.max.toString() : "";
    if( dataValue.props.opt !== undefined ){
      dataValue.min = dataValue.props.opt.min !== undefined ? dataValue.props.opt.min.toString() : dataValue.min;
      dataValue.max = dataValue.props.opt.max !== undefined ? dataValue.props.opt.max.toString() : dataValue.max;
    }

    //console.log( "DV:", (props.elementData ? "ELEMENT" : "PROPS"), dataValue.props );
    return dataValue;
  }

export { getElementData, cloneObject, cloneObjectOld, imageExists, moveElement, toInt };

