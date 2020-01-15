const util = {
  sample: arr => {
    const len = arr == null ? 0 : arr.length
    return len ? arr[Math.floor(Math.random() * len)] : undefined
  },

  isNil: value => (value == null),

  isDefined: value => (value != null),

  /**
  * Returns a unique ID from two numbers
  *
  * @see {@link https://en.wikipedia.org/wiki/Pairing_function (Cantor pairing function)|Pairing function (Cantor pairing function)}
  *
  * @param {number} a - A [natural number](https://en.wikipedia.org/wiki/Natural_number), which is an integer greater than or equal to zero
  * @param {number} b - A [natural number](https://en.wikipedia.org/wiki/Natural_number), which is an integer greater than or equal to zero
  *
  * @return {number} - An Integer that uniquely represents a pair of Integers
  */
  getCantorNumber: function cantor_pairing_function (a,b) {
    if (a == undefined || b == undefined) throw new ReferenceError('Missing required parameter \'a\' or \'b\'');
    // cantor pairing returns valid seeming numbers for arguments below zero, return -1 in this case to avoid silent errors
    if(a < 0 || b < 0) return -1;
    return 1 / 2 * (a + b) * (a + b + 1) + b;
  },

  /**
  * Checks for a value contained in a cantor reference object
  * using the key produced by the ids of two objects
  *
  * @expects All arguments defined
  * @expects Arguments in sequential "to" & "from" order
  *
  * @param {Object} from An object with an id value
  * @param {Object} to An object with an id value
  * @param {Object} reference An object with cantor numbers as lookup keys and (node / connections ids) as values
  *
  * @returns {CantorLookupResponse}
  */
  cantorLookup: function(from, to, reference) {
    const key = this.getCantorNumber(from.id, to.id);

    /**
     * @typedef {Object} CantorLookupResponse
     * @property {number} key - The cantor number key
     * @property {number} id - The id corresponsing
    */
    return {
      key,
      id: (reference.hasOwnProperty(key) ? reference[key] : undefined)
    }
  },

  /**
  * Gets a sequential id by checking a cantor reference object
  *
  * @expects All arguments defined
  * @expects Arguments in sequential "to" & "from" order
  * @expects cantorLookup to return undefined in negative case
  *
  * @param {Object} from An object with an id value
  * @param {Object} to An object with an id value
  * @param {Object} reference A mutable object with cantor numbers as lookup keys and (node / connections ids) as values
  * @param {number} lastId previous Id to increment in lieu of an existing id value
  *
  * @return {CantorIdResponse} The key and id value for the cantor refernce object
  */
  getCantorId: function(from, to, reference, lastId) {
    const response = this.cantorLookup(from, to, reference);

    /**
     * @typedef {Object} CantorIdResponse
     * @property {number} key - The cantor number key
     * @property {number} id - The sequential id
    */
    return {
      key: response.key,
      id: this.isNil(response.id) ? lastId + 1 : response.id
    }
  },

  /**
  * Takes a neat id management object and mutates it
  *
  * @param {Object} from An object with a .id property
  * @param {Object} to An object with a .id property
  * @param {Object} reference Neat id cantor-reference object with a .last property
  * @returns {number} A neat ID
  */
   manageNeatId: function(from, to, reference) {
     const res = this.getCantorId(from, to, reference, reference.last);
     reference[res.key] = res.id;
     if (res.id > reference.last) reference.last = res.id;
     return res.id;
  },

  /** 
   * 
   * MIT License
   * 
   * Copyright (c) 2018 Charles Stover
   * 
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   * 
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   * 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   * 
   */

  /**
   * Quicksort function, default comparator function sorts ascending
   * 
   * @param {number[]} unsorted An array of unsorted numbers
   * @param {function} comparator A function to compare numbers
   * 
   * @returns {number[]} An array of numbers sorted in ascending order
   *  
   * @todo Remove repeated if check by composing this function with an abstraction
   * @todo Implement / replace with pattern-defeating quicksort
   */
   sort: function (unsorted, comparator = () => (a, b) => a < b ? -1 : 1) {       
     // Create a sortable array to return.
     const sorted = [...unsorted];
     
     // Recursively sort sub-arrays.
     const recursiveSort = function (start, end) {
       // If this sub-array is empty, it's sorted.
       if (end - start < 1) return;
       
       const pivotValue = sorted[end];
       let splitIndex = start;
       for (let i = start; i < end; i++) {
         const spread = comparator(sorted[i], pivotValue);
          
         // This value is less than the pivot value.
         if (spread === -1) {
           // If the element just to the right of the split index,
           // isn't this element, swap them.
           
           if (splitIndex !== i) {
             const temp = sorted[splitIndex];
             sorted[splitIndex] = sorted[i];
             sorted[i] = temp;
            }
            
            // Move the split index to the right by one,
            // denoting an increase in the less-than sub-array size.
            splitIndex++;
          }

          // Leave values that are greater than or equal to
          // the pivot value where they are.
        }

        // Move the pivot value to between the split.
        sorted[end] = sorted[splitIndex];
        sorted[splitIndex] = pivotValue;

        // Recursively sort the less-than and greater-than arrays.
        recursiveSort(start, splitIndex - 1);
        recursiveSort(splitIndex + 1, end);
     };

    // Sort the entire array.
    recursiveSort(0, sorted.length - 1);
    return sorted;
   },

  /**
   * Quicksort function, for objects.
   * 
   * @param {Object[]} unsorted Array of unsorted objects
   * @param {string} property String to use for computed property lookups
   * @param {boolean} ascending Flag to toggle ascending or descending order
   * 
   * @returns {Object[]} An array of sorted objects
   * 
   * @todo Add tests
   */
  sortObjects: function (objects, prop, ascending = true) {
    
    const left = ascending ? -1 : 1; // If -1 returned by a < b it means left hand side of the array is less (ascending) 
    const right = !ascending ? 1 : -1; // If anything but -1 returned by a < b it means right hand side of the array is less (descending)

    const comparator = (a, b) => a[prop] < b[prop] ? left : right;
  
    this.sort(objects, comparator);

    return sorted;
 },

}

module.exports = util;
