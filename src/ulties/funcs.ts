export const randomUniqueValuesFromArray = (arr: any[], count: number) => {
  const newArr = [...arr];
  if(count > arr.length) return newArr;

  const result: any[] = [];
  for(let i = 0; i < count; i ++) {
    result.push(...newArr.splice(Math.floor(Math.random() * newArr.length), 1));
  }
  return result;
}

interface SeedPhraseTypes  {
  value: string;
  index: number;
}

interface ConfirmSeedPhraseTypes {
  list: string[];
  primary: number;
  selectedIndex: number;
}

export const randomUniqueConfirmSeedPhrase = (arr: SeedPhraseTypes[]): ConfirmSeedPhraseTypes[] => {
  const newArr: SeedPhraseTypes[] = [...arr];
  const count = arr.length < 6 ? arr.length : 6;

  const result: ConfirmSeedPhraseTypes[] = [];
  for(let i = 0; i < count; i ++ ){
    const selectedSeedPhraseList: SeedPhraseTypes[] = [];

    for(let i = 0; i < 3; i ++){
      selectedSeedPhraseList.push(...newArr.splice(Math.floor(Math.random() * newArr.length), 1));
    }

    const chooseSeedPhraseIndex: number = Math.floor(Math.random() * selectedSeedPhraseList.length);

    result.push({
      list: selectedSeedPhraseList.map(value => value.value), 
      primary: selectedSeedPhraseList[chooseSeedPhraseIndex]?.index,
      selectedIndex: chooseSeedPhraseIndex,
    })
  }

  return result;
}