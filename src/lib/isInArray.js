const isInArray = (itemName, array) => {
  const itemFind = array.includes(item => item.name === itemName);

  return itemFind;
};

export default isInArray;
