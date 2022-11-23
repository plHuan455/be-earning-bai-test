const randomUniqueValuesFromArray = <T>(arr: T[], count: number) => {
  const newArr = [...arr];
  if(count > arr.length) return newArr;
  const result: T[] = [];
  for(let i = 0; i < count; i ++) {
    result.push(...newArr.splice(Math.floor(Math.random() * newArr.length), 1));
  }
  return result;
}

/**
 * VD: Trả về 24 phần tử 
 * randomUniqueValuesFromArray(jsonData, 24);
*/

export const get24SeedPhraseValues = (arr: string[]) => {
  const value24DataList = randomUniqueValuesFromArray<string>(arr, arr.length < 24 ? arr.length : 24);
  return value24DataList.map((value, index) => ({
    name: value,
    index: index + 1
  }))
}


interface SeedPhraseTypes  {
  name: string;
  index: number;
}

interface ConfirmSeedPhraseTypes {
  list: string[];
  primary: number;
  selectedIndex: number;
}

/**
 * trả về 6 phần tử
 */
export const get6SeedPhraseValues = (arr: SeedPhraseTypes[]): ConfirmSeedPhraseTypes[] => {
  // Lấy 18 phần tử
  const newArr: SeedPhraseTypes[] = randomUniqueValuesFromArray<SeedPhraseTypes>(arr, 18);
  
  const result: ConfirmSeedPhraseTypes[] = [];
  const count = arr.length < 6 ? arr.length : 6;
  for(let i = 0; i < count; i ++ ){

    // Chọn ra 3 phần tử
    const selectedSeedPhraseList: SeedPhraseTypes[] = [];
    for(let i = 0; i < 3; i ++){
      selectedSeedPhraseList.push(...newArr.splice(Math.floor(Math.random() * newArr.length), 1));
    }

    const chooseSeedPhraseIndex:number = Math.floor(Math.random() * selectedSeedPhraseList.length);

    result.push({
      list: selectedSeedPhraseList.map(value => value.name), 
      primary: selectedSeedPhraseList[chooseSeedPhraseIndex]?.index,
      selectedIndex: chooseSeedPhraseIndex,
    })
  }

  return result;
}