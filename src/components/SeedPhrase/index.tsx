import React from "react";

export interface SeedPhraseProps {
  index: number;
  text: string;
}

const SeedPhrase: React.FC<SeedPhraseProps> = ({index, text}) => {
  return <div className="seedPhrase">
    <p className="seedPhrase_index">
      {index}
    </p>
    <div className="seedPhrase_text" title={text}>
      {text}
    </div>
  </div>
}

export default SeedPhrase;