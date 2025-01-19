// functions.js

/**
 * Groups data by a specified key.
 * @param {Array} data - The dataset to group.
 * @param {String} key - The key to group by.
 * @returns {Object} - An object where each key is a group and the value is an array of items in that group.
 */
export const groupBy = (data, key) => {
    return data.reduce((acc, item) => {
        const groupKey = item[key];
        if (!acc[groupKey]) acc[groupKey] = [];
        acc[groupKey].push(item);
        return acc;
    }, {});
};

/**
 * Calculates the average of an array of numbers.
 * @param {Array} numbers - Array of numbers.
 * @returns {Number} - The average value rounded to two decimal places.
 */
export const calculateAverage = (numbers) => {
    if (numbers.length === 0) return 0;
    const total = numbers.reduce((acc, num) => acc + num, 0);
    return Math.round((total / numbers.length) * 100) / 100;
};

/**
 * Calculates the maximum value in an array of numbers.
 * @param {Array} numbers - Array of numbers.
 * @returns {Number} - The maximum value.
 */
export const calculateMax = (numbers) => {
    if (numbers.length === 0) return 0;
    return Math.max(...numbers);
};

/**
 * Sorts data based on a specified key and order.
 * @param {Array} data - The dataset to sort.
 * @param {String} key - The key to sort by.
 * @param {String} order - 'asc' for ascending or 'desc' for descending.
 * @returns {Array} - Sorted data.
 */
export const sortData = (data, key, order = 'asc') => {
    return data.sort((a, b) => {
        if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
        return 0;
    });
};

/**
 * Applies a series of transformations to the scouting data.
 * @param {Array} data - The raw scouting data.
 * @param {Array} transformations - Array of transformation steps.
 * @returns {Array} - Transformed data.
 */
export const transformData = (data, transformations) => {
    validateTransformations(transformations);
    let transformedData = [...data];

    transformations.forEach((transformation) => {
        switch (transformation.type) {
            case 'filter':
                transformedData = filterData(transformedData, transformation.condition);
                break;

            case 'groupBy':
                transformedData = groupBy(transformedData, transformation.key);
                break;

            case 'aggregate':
                transformedData = aggregate(transformedData, transformation.operations);
                break;

            case 'map':
                transformedData = transformedData.map(transformation.func);
                break;

            case 'sort':
                transformedData = sortData(transformedData, transformation.key, transformation.order);
                break;

            default:
                throw new Error(`Unsupported transformation type: ${transformation.type}`);
        }
    });

    return transformedData;
};

/**
 * Filters data based on a specified condition.
 * @param {Array} data - The dataset to filter.
 * @param {Function} condition - The condition function to apply.
 * @returns {Array} - Filtered data.
 */
export const filterData = (data, condition) => {
    return data.filter(condition);
};

/**
 * Aggregates grouped data based on specified operations.
 * @param {Object} groupedData - The data grouped by a key.
 * @param {Array} operations - Array of operations to perform.
 * @returns {Array} - Aggregated data.
 */
const aggregate = (groupedData, operations) => {
    return Object.keys(groupedData).map((group) => {
        const items = groupedData[group];
        const aggregated = { teamNumber: group };

        operations.forEach((op) => {
            let values = items.map(op.fieldGetter || ((item) => item[op.field]));

            // If a transformation function is provided, apply it to each value
            if (op.transform) {
                values = items.map(op.transform).filter((val) => val !== undefined && val !== null);
            }

            switch (op.operation) {
                case 'average':
                    aggregated[op.alias || `average${capitalize(op.field)}`] = calculateAverage(values);
                    break;

                case 'max':
                    aggregated[op.alias || `max${capitalize(op.field)}`] = calculateMax(values);
                    break;

                case 'sum':
                    aggregated[op.alias || `sum${capitalize(op.field)}`] = values.reduce((a, b) => a + b, 0);
                    break;

                case 'count':
                    aggregated[op.alias || `count${capitalize(op.field)}`] = values.length;
                    break;

                case 'percentage':
                    // Special case: Calculate percentage based on a total field
                    if (!op.totalField) {
                        throw new Error(`"percentage" operation requires a "totalField" property.`);
                    }
                    const total = aggregated[op.totalField] || 0;
                    aggregated[op.alias || `${capitalize(op.field)}Percentage`] = total > 0
                        ? Math.round((values.reduce((a, b) => a + b, 0) / total) * 100 * 100) / 100
                        : 0;
                    break;

                default:
                    throw new Error(`Unsupported aggregation operation: ${op.operation}`);
            }
        });

        return aggregated;
    });
};

/**
 * Capitalizes the first letter of a string.
 * @param {String} str - The string to capitalize.
 * @returns {String} - Capitalized string.
 */
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Validates the transformation steps.
 * @param {Array} transformations - Array of transformation steps.
 * @throws {Error} - If an invalid transformation type or missing required properties are detected.
 */
const validateTransformations = (transformations) => {
    const validTypes = ['filter', 'groupBy', 'aggregate', 'map', 'sort'];
    transformations.forEach((transformation, index) => {
        if (!validTypes.includes(transformation.type)) {
            throw new Error(`Invalid transformation type "${transformation.type}" at index ${index}.`);
        }
        switch (transformation.type) {
            case 'filter':
                if (typeof transformation.condition !== 'function') {
                    throw new Error(`"filter" transformation requires a "condition" function at index ${index}.`);
                }
                break;
            case 'groupBy':
                if (!transformation.key) {
                    throw new Error(`Missing "key" in "groupBy" transformation at index ${index}.`);
                }
                break;
            case 'aggregate':
                if (!Array.isArray(transformation.operations)) {
                    throw new Error(`"aggregate" transformation requires an "operations" array at index ${index}.`);
                }
                break;
            case 'map':
                if (typeof transformation.func !== 'function') {
                    throw new Error(`"map" transformation requires a "func" function at index ${index}.`);
                }
                break;
            case 'sort':
                if (!transformation.key) {
                    throw new Error(`Missing "key" in "sort" transformation at index ${index}.`);
                }
                break;
            default:
                break;
        }
    });
};
