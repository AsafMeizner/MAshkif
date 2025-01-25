// src/components/chart-configs/applyTransformations.js
import { groupBy, calculateAverage, calculateMax, sortData } from './functions';

export function applyTransformations(data, transformations = []) {
  let result = [...data];

  transformations.forEach((t) => {
    switch (t.type) {
      case 'groupBy':
        result = groupBy(result, t.key);
        break;
      case 'aggregate':
        result = aggregate(result, t.operations || []);
        break;
      case 'sort':
        result = handleSort(result, t.key, t.order);
        break;
      default:
        console.warn('Unknown transform type:', t.type);
    }
  });

  return result;
}

function aggregate(groupedObj, operations) {
  // groupedObj is { [keyVal]: [items...] }
  return Object.keys(groupedObj).map((groupVal) => {
    const items = groupedObj[groupVal];
    const row = { teamNumber: groupVal };

    operations.forEach((op) => {
      let values = items.map((item) => {
        if (op.transformExpression) {
          return safeEval(op.transformExpression, item);
        }
        return item[op.field] || 0;
      });

      const alias = op.alias || `${op.operation}_${op.field}`;
      switch (op.operation) {
        case 'average':
          row[alias] = calculateAverage(values);
          break;
        case 'max':
          row[alias] = calculateMax(values);
          break;
        case 'sum':
          row[alias] = values.reduce((a, b) => a + b, 0);
          break;
        default:
          console.warn('Unsupported operation:', op.operation);
      }
    });
    return row;
  });
}

function handleSort(data, key, order) {
  if (!Array.isArray(data)) return data;
  return sortData(data, key, order === 'desc' ? 'desc' : 'asc');
}

function safeEval(expr, item) {
  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function('item', `return (${expr});`);
    return fn(item) || 0;
  } catch (err) {
    console.error('Error eval:', expr, err);
    return 0;
  }
}
