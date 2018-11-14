export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}

export function createItemInArray(datas, newItemId, newItem) {
  const foundIndex = datas.findIndex(item => item.id === newItemId);
  if (foundIndex > -1) {
    datas.splice(foundIndex, 1, newItem);
    return datas;
  }
  return datas.concat(newItem);
}

export function updateItemInArray(datas, itemId, updateItemCallback) {
  const updatedItems = datas.map(item => {
    if (item.id !== itemId) {
      // Since we only want to update one item, preserve all others as they are now
      return item;
    }
    // Use the provided callback to create an updated item
    const updatedItem = updateItemCallback(item);
    return updatedItem;
  });

  return updatedItems;
}

export function deleteItemInArray(datas, itemId) {
  return datas.filter(item => item.id !== itemId);
}
