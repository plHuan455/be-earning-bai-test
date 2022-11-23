const sortArrToMaxNumber = (arr: number[]): number[] => {
  const newArr = [...arr];
  return newArr.sort((a, b) => Number(String(b) + String(a)) - Number(String(a) + String(b)));
}

export default sortArrToMaxNumber