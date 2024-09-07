export function findInputError(errors, name) {
  const filtered = Object.keys(errors)
    .filter(key => key.includes(name))
    .reduce((cur, key) => {
      return Object.assign(cur, { error: errors[key] })
    }, {})
  return filtered
}

export const isFormInvalid = err => {
  if (Object.keys(err).length > 0) return true;
  return false;
}

export const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`; // Format the date as DD/MM/YYYY
};

export const formatTableHeaders = (recordArray) => {
  // Find the object with the most key-value pairs
  const objectWithMostKeys = recordArray.reduce((maxObj, currentObj) => {
    return Object.keys(currentObj).length > Object.keys(maxObj).length ? currentObj : maxObj;
  }, {});

  // Create an array of the keys from the object with the most key-value pairs
  const tableHeaders = Object.keys(objectWithMostKeys);

  return tableHeaders
}

export const formatTableCells = (recordArray) => {
  const valuesArray = recordArray.map((obj) => Object.values(obj));
  return groupItemsForPagination(valuesArray, 10);
}

export const groupItemsForPagination = (items, itemsPerPage = 10) => {
  const groupedItems = [];

  for (let i = 0; i < items.length; i += itemsPerPage) {
    const group = items.slice(i, i + itemsPerPage);
    groupedItems.push(group);
  }

  return groupedItems;
};