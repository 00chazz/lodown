'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;

/**
 * identity: take a value and return that input value unchanged.
 * 
 * @param {*} value: single value that can be any datatype
 * 
 * @return {*}: The input value unchanged
 * 
 */
 
 function identity(value){ 
     return value;
 }
 module.exports.identity = identity;
 
 /**
  * typeOf: Take a value and return a string representation of the value datatype.
  * 
  * @param {*} value: single value that can be any datatype
  * 
  * @return {String}: String representation of param's datatype.
  */
 function typeOf(value){
    if(Array.isArray(value))
        return "array";
    else if(value === undefined)
        return "undefined";
    else if(typeof value === 'number')
        return "number";
    else if(value === false || value === true)
        return "boolean";
    else if(value === null && value !== undefined)
        return "null";
    else if(typeof value === 'function')
        return "function";
    else if(typeof value === 'object') 
        return "object";
    else
        return "string";
}
module.exports.typeOf = typeOf;

 /**
  * first: Take an array and number and return the first number of elements in the array.
  * 
  * @param {Array} ary: Array in which to look for the first amount of values
  * @param {Number} num: Amount of values to return.
  * 
  * @return {Array or element that contains specified number of values of original array}
  */
  function first(ary, num){
    if(!Array.isArray(ary) || num < 0)
        return [];
    else if(!num) 
        return ary[0];
    else
        return ary.splice(0,num);
}
module.exports.first = first;

 /**
  * last: Take an array and number and return the last number of elements in the array.
  * 
  * @param {Array} ary: Array in which to look for the last amount of values
  * @param {Number} num: Amount of values to return.
  * 
  * @return {Array}: Array which contains last amount of values
  */
  function last(ary,num){
    if(!Array.isArray(ary))
        return [];
    else if(num > ary.length)
        return ary;
    else if (num)
        return ary.splice(ary.length-num,num);
    else if (!num) 
        return ary.pop();
}
module.exports.last = last;

 /**
  * indexOf: Take an array and number and return the index of a given element.
  * 
  * @param {Array} ary: Array in which to look for the element's index
  * @param {*}: Value to look for in the array to get its index. 
  * 
  * @return Index of array, or -1 if array does not include the value.
  */
  function indexOf(array, value) {
    if (array.includes(value) === false) {
       return  -1; 
    } else if (array.includes(value) === true) {
        for (var i = 0; i < array.length; i++) {
            if (value === array[i]) {
                return i;
            }
        }
    }
}
module.exports.indexOf = indexOf;

/**
 * contains: Take an array and a value and see if the array contains the value.
 * 
 * @param {Array}: Array in which to look for the value
 * @param {*}: Value of any type for which to look
 * 
 * @return {Boolean}: True if array contains value, false if otherwise.
 * 
 */
  function contains(array, value) {
     if (!value) {
         return array;
     } else {
         return array.includes(value) ? true : false;  
     }
 }
 module.exports.contains = contains;

/**
 * unique: Takes an array and removes any element duplicates 
 * 
 * @param {Array}: Array to check duplicates in
 * 
 * @return {Array}: New array that contains no duplicates
 */
function unique(array){
  var newArr = [];
  //loop through array
  for(var i = 0; i < array.length; i++){
    //if array element isnt in newarray already, push it to it.
    if(indexOf(newArr,array[i]) === -1){
        newArr.push(array[i]);
    }
}
    return newArr;
}
 module.exports.unique = unique;
 
 /**
  * filter: Calls a function with args (element, index, array) on each element of an array and pushes elements
  *         to new array that return true.
  * 
  * @param: {Array}: an array of elements to perform function on
  * @param: {Function}: A function of params representing array element, index, and the array itself
  * 
  * @return: {Array}: An array with elements that returned true after being passed to function param
  */
  function filter (array, func) {
    var ary = [];
    each(array, function(e, i, a){
        if(func(e,i,a)){
            ary.push(e);
        } return ary;
    });
    return ary;
 }
 module.exports.filter = filter;
 
  /**
  * reject: Calls a function with args (element, index, array) on each element of an array and pushes elements
  *         to new array that return false.
  * 
  * @param: {Array}: an array of elements to perform function on
  * @param: {Function}: A function of params representing array element, index, and the array itself
  * 
  * @return: {Array}: An array with elements that returned false after being passed to function param
  */
  function reject(array, func){
    const failed = [];
    for(var i = 0; i < array.length; i++){
        if(!(filter(array, func).includes(array[i]))){
            failed.push(array[i]);
        }
    }
    return failed;
}
module.exports.reject = reject;

/**
 * Partition: Creates an array of 2 arrays, the first containing truthy values of function performed on array
 *            the second containing false values of array after being passed to function.
 * 
 * @param: {Array}: array of elements to perform function on
 * @param: {Function}: Function that performs action on elements of array
 * 
 * @return {Array}: Array containing 2 arrays, first of truthy values, second of falsey values
 */ 
 function partition(ary, func){
    let arrays = [];
    arrays[0] = filter(ary,func);
    arrays[1] = reject(ary,func);
    return arrays;
}
module.exports.partition = partition;

/**
 * Map: Returns an array of return values of a given function call on a given collection's elements.
 * 
 * @param: {Collection}: Collection to perform function on
 * @param: {Function}: Function to perform on collection's elements
 * 
 * @return: {Array}: Array containing return values of function calls
 */
 function map(collection, func){
    let ary = [];
    each(collection, function(e, i ,a){
       ary.push(func(e,i,a));
    });
    return ary;
}
module.exports.map = map;

/**
 * Pluck: Create an array containing an array of object's properties
 * 
 * @param: {Array}: Array of objects
 * @param: {Value}: A property of an object
 * 
 * @return: {Array}: Array containing object properties.
 * 
 */
 function pluck(ary, prop){
    let arr = [];
    map(ary, function(e,i,a){
        arr.push(e[prop]);
    });
    return arr;
}
module.exports.pluck = pluck;

/**
 * Every: returns true if every element is truthy after being passed through a function
 * 
 * @param {collection}: collection of values of any data type
 * @param {function}: function that changes element in array
 * 
 * @return {Boolean}: true if every element is truthy, false otherwise
 * 
 */
 function every(collect, func){
    //make default value = true
    var val = true;
    if(!func){
        for(var i = 0; i < collect.length; i++){
            if(!collect[i])
                val = false;
        }
    return val;
    }
    each(collect, function(e, i, c){
        if(!func(e,i,c)){
            val = false;
        }
    });
    return val;
}
module.exports.every = every;

/**
 * Some: if any value is truthy in the given array after being passed through given function, return true
 * 
 * @param {collection}: array or object of values of any type
 * @param {function}: function that changes each element in array
 * 
 * @return {boolean}: true if any element is truthy, false otherwise.
 * 
 */
 function some(collect, func){
    var val = false;
    if(!func){
        for(var i = 0; i < collect.length; i++){
            if(collect[i])
                return true;
        }
    return val;
    }
    each(collect, function(e, i, c){
        if(func(e,i,c)){
            val = true;
        }
    });
    return val;
}
module.exports.some = some;

/**
 * Reduce: 
 * 
 */