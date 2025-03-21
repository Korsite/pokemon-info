export const removeNullAttributes = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(removeNullAttributes);
    } else if (obj !== null && typeof obj === 'object') {
        return Object.entries(obj)
            .filter(([_, value]) => value !== null)
            .reduce((acc, [key, value]) => {
                acc[key] = removeNullAttributes(value);
                return acc;
            }, {});
    }
    return obj;
};