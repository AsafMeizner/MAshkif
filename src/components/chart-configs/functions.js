// src/components/chart-configs/functions.js
export function groupBy(data, key) {
    return data.reduce((acc, item) => {
      const val = item[key];
      if (!acc[val]) acc[val] = [];
      acc[val].push(item);
      return acc;
    }, {});
  }
  
  export function calculateAverage(nums) {
    if (!nums.length) return 0;
    const sum = nums.reduce((a, b) => a + b, 0);
    return Math.round((sum / nums.length) * 100) / 100;
  }
  
  export function calculateMax(nums) {
    if (!nums.length) return 0;
    return Math.max(...nums);
  }
  
  export function sortData(arr, key, order = 'asc') {
    return arr.sort((a, b) => {
      if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }
  