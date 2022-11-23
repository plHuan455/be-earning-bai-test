import { useEffect, useMemo, useState } from "react";
import MainLayout, { ConfirmCreatedWallet, SeedPhraseTypes } from "../../components/MainLayout";
import jsonData from '../../bai_test/data.json';
import { get24SeedPhraseValues, get6SeedPhraseValues } from "../../bai_test/bai2";

export interface MainLayoutContainerProps {
}

const MainLayoutContainer: React.FC<MainLayoutContainerProps> = () => {
  // const seedPhraseList: SeedPhraseTypes[] = useMemo(() => get24SeedPhraseValues(jsonData), []);

  const [seedPhraseList, setSeedPhraseList] = useState<SeedPhraseTypes[]>(get24SeedPhraseValues(jsonData))

  // 0: View 24 seed phrases, 1: View 6 rows of 3 seed phrases
  const [confirmStep, setConfirmStep] = useState<number>(0);

  const [isShowButtonShellCopy, setIsShowButtonShellCopy] = useState<boolean>(false);
  const [isShowBottomShellCreatedWallet, setIsShowBottomShellCreatedWallet] = useState<boolean>(false);

  const [selectedSeedPhraseList, setSelectedSeedPhraseIndexList] = useState<(number | undefined)[]>([]);

  // 6 rows of 3 seed phrase
  const confirmSeedPhraseList = useMemo(() => get6SeedPhraseValues(seedPhraseList), [seedPhraseList]);

  const [errorText, setErrorText] = useState<string>();
  const [isConfirmButtonLoading, setIsConfirmButtonLoading] = useState<boolean>(false);

  const [confirmCreatedWalletList, setConfirmCreatedWalletList] = useState<ConfirmCreatedWallet[]>([
    { label: 'Metanode cannot recover your seed phrase. You should back up your seed phrase and keep it safe, it\'s your responsibility.' },
    { label: 'Your transaction data is one of the most important security keys which is needed for every incurred transaction. You should back up your data automatically and secure back up file with a strong pasword.' },
    { label: 'To keep your backup file safe, you should also keep secret your back up location and secure it.' },
  ]);

  const statusTextHash: { [key: number]: string } = {
    0: "Auto gen seed phrase ?",
    1: "Confirm Your Seed Phrase",
  }

  const isDisabledUnderstandButton = useMemo<boolean>(
    () =>
      confirmCreatedWalletList.some(value => !value.isChecked)
    , [confirmCreatedWalletList]
  );

  const confirmCount = useMemo(
    () =>
      selectedSeedPhraseList.filter(value => value !== undefined).length
    , [selectedSeedPhraseList]
  );

  useEffect(() => {
    setErrorText(undefined);
    setSelectedSeedPhraseIndexList([]);
  }, [confirmStep])

  const handleSaveClick = () => {
    setIsShowButtonShellCopy(true);
  }

  const handleConfirmClick = () => {
    if (confirmStep === 0) {
      setConfirmStep(preStep => preStep + 1);
      return;
    }

    if (confirmStep === 1) {
      setConfirmCreatedWalletList(preState => preState.map(value => ({ label: value.label })))
      setIsConfirmButtonLoading(true);
      setErrorText(undefined);

      // Fake loading and verify
      setTimeout(
        () => {
          const isTrueSeedPhrase = confirmSeedPhraseList.every(
            (value, index) => value.selectedIndex === selectedSeedPhraseList[index]
          );

          // Success
          if (isTrueSeedPhrase) {
            setErrorText(undefined);
            setIsConfirmButtonLoading(false);
            setIsShowBottomShellCreatedWallet(true);
            return;
          }

          // Failed
          setErrorText("Wrong seed phrases. Please try again!");
          setIsConfirmButtonLoading(false);
        },
        1000
      );
    }
  }

  const handleGoBack = () => {
    if (confirmStep !== 0) {
      setConfirmStep(preState => preState - 1)
    }
  }

  const handleCloseBottomShell = () => {
    if (confirmStep === 0) {
      setIsShowButtonShellCopy(false);
      return;
    }

    if (confirmStep === 1) {
      setIsShowBottomShellCreatedWallet(false);
    }
  }

  const handleStatusClick = () => {
    if (confirmStep === 0) {
      setSeedPhraseList(get24SeedPhraseValues(jsonData));
    }
  }

  const handleBottomShellConfirmItemClick = (index: number) => {
    const newList = [...confirmCreatedWalletList];
    newList[index].isChecked = true;
    setConfirmCreatedWalletList(newList);
  }

  return <MainLayout
    statusText={statusTextHash[confirmStep]}
    errorText={errorText}
    confirmCreatedWalletList={confirmCreatedWalletList}
    isDisabledUnderstandButton={isDisabledUnderstandButton}
    isConfirmButtonDisabled={confirmStep === 1 && confirmCount !== confirmSeedPhraseList.length}
    isShowButtonShellCopy={isShowButtonShellCopy}
    isConfirmButtonLoading={isConfirmButtonLoading}
    isShowButtonShellCreatedWallet={isShowBottomShellCreatedWallet}
    isShowCopy={confirmStep === 0}
    confirmButtonText={confirmStep === 0 ? "Next" : "SUBMIT"}
    selectedConfirmSeedPhraseList={selectedSeedPhraseList}
    confirmSeedPhraseList={confirmSeedPhraseList}
    onGoBack={handleGoBack}
    confirmStep={confirmStep}
    confirmCountText={confirmStep === 1 ? `${confirmCount}/${confirmSeedPhraseList.length}` : ''}
    seedPhraseList={seedPhraseList}
    onCopyClick={handleSaveClick}
    onCloseBottomShell={handleCloseBottomShell}
    onConfirmButtonClick={handleConfirmClick}
    confirmButtonCountTime={2000}
    onConfirmPhraseItemClick={(rowIndex, itemIndex) => {
      const newSelectedSeedPhraseList = [...selectedSeedPhraseList];
      newSelectedSeedPhraseList[rowIndex] = itemIndex;
      setSelectedSeedPhraseIndexList(newSelectedSeedPhraseList);
    }}
    onBottomShellConfirmItemClick={handleBottomShellConfirmItemClick}
    onStatusClick={handleStatusClick}
    onConfirmUnderstandClick={() => { }}
  />
}

export default MainLayoutContainer;