import clsx from "clsx";

export interface Confirm3SeedPhraseProps {
  list: string[];
  primary: number;
  selectedItemIndex: number | undefined;
  onItemClick: (index: number) => void;
}

const Confirm3SeedPhrase: React.FC<Confirm3SeedPhraseProps> = ({selectedItemIndex, primary, list, onItemClick}) => {
  return <div className="confirm3SeedPhrase">
    <div className="confirm3SeedPhrase_primary">
      <p className="confirm3SeedPhrase_primary_text">{primary}</p>
    </div>
    <div className="confirm3SeedPhrase_list">
      {list.map((value, index)=> (
      <div className="confirm3SeedPhrase_list_itemWrapper" key={`confirm-3-seed-phrase-${index}`}>
        <div className={clsx("confirm3SeedPhrase_list_item", selectedItemIndex === index && 'confirm3SeedPhrase_list_item-selected')} onClick={() => onItemClick(index)}>
          {value}    
        </div>
      </div>))}
    </div>
  </div>
}

export default Confirm3SeedPhrase;