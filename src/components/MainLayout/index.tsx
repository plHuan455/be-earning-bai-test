import { IoIosArrowBack } from 'react-icons/io';
import { useRef, useEffect } from 'react';
import { AiFillWarning, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { GrFormNext } from 'react-icons/gr';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { FaCheck, FaCopy } from 'react-icons/fa';
import SeedPhrase from '../SeedPhrase';
import BottomShell from '../BottomShell';
import Container from '../Container';
import Confirm3SeedPhrase from '../Confirm3SeedPhrase';
import clsx from 'clsx';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

export interface ConfirmCreatedWallet {
  isChecked?: boolean;
  label: string;
}

export interface SeedPhraseTypes {
  name: string;
  index: number;
}

export interface ConfirmSeedPhraseTypes {
  list: string[];
  primary: number;
  selectedIndex: number;
}

export interface MainLayoutProps {
  confirmButtonText?: string;
  confirmCountText?: string;
  errorText?: string;
  statusText?: string;
  seedPhraseList: SeedPhraseTypes[];
  selectedConfirmSeedPhraseList: (number | undefined)[];
  confirmCreatedWalletList?: ConfirmCreatedWallet[];
  isShowButtonShellCreatedWallet?: boolean;
  isShowButtonShellCopy?: boolean;
  isConfirmButtonDisabled: boolean;
  isDisabledUnderstandButton: boolean;
  isShowCopy?: boolean;
  isConfirmButtonLoading?: boolean
  confirmStep: number;
  confirmSeedPhraseList: ConfirmSeedPhraseTypes[];
  confirmButtonCountTime?: number;
  onStatusClick: () => void;
  onCopyClick?: () => void;
  onGoBack?: () => void;
  onCloseBottomShell?: () => void;
  onConfirmButtonClick?: () => void;
  onConfirmPhraseItemClick: (rowIndex: number, itemIndex: number) => void;
  onConfirmUnderstandClick: () => void;
  onBottomShellConfirmItemClick: (index: number) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  statusText = "",
  errorText,
  confirmButtonText = "",
  confirmButtonCountTime,
  confirmStep,
  confirmCreatedWalletList = [],
  isShowButtonShellCreatedWallet,
  isConfirmButtonLoading,
  isConfirmButtonDisabled,
  isDisabledUnderstandButton,
  isShowButtonShellCopy,
  isShowCopy,
  confirmCountText,
  seedPhraseList,
  confirmSeedPhraseList,
  selectedConfirmSeedPhraseList,
  onCopyClick,
  onCloseBottomShell,
  onConfirmButtonClick,
  onStatusClick,
  onGoBack,
  onBottomShellConfirmItemClick,
  onConfirmPhraseItemClick,
  onConfirmUnderstandClick,
}) => {
  const mainLayoutRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(errorText && mainLayoutRef.current && errorRef.current) {
      errorRef.current.scrollIntoView();
    }
  }, [errorText])
  
  return <div className="mainLayout" ref={mainLayoutRef}>
    <Container>
      <div className="mainLayout_backBar">
        <div className="mainLayout_backBar_icon">
          <IoIosArrowBack />
        </div>
        <p className="mainLayout_backBar_text" onClick={onGoBack}>Create new wallet</p>
      </div>

      <div className="mainLayout_status">
        <p className="mainLayout_status_text" onClick={onStatusClick}>{statusText}</p>
        <p className="mainLayout_status_process">
          {confirmCountText}
        </p>
      </div>

      {/* LIST SEED PHRASES */}
      {confirmStep === 0 && <div className="mainLayout_seedPhraseList">
        {seedPhraseList.map(seedPhrase => <div className="mainLayout_seedPhraseList_item" key={`mainLayout-seedPhrase-${seedPhrase.index}`}>
          <SeedPhrase index={seedPhrase.index} text={seedPhrase.name} />
        </div>
        )}
      </div>}

      {confirmStep === 1 && <div className="'mainLayout_seedPhraseListStep1">
        {confirmSeedPhraseList.map((value, index) => <div className='mainLayout_seedPhraseListStep1_item' key={`mainLayout-seedPhrse-${value.primary}`}>
          <Confirm3SeedPhrase
            list={value.list}
            primary={value.primary}
            onItemClick={(itemIndex) => { onConfirmPhraseItemClick(index, itemIndex) }}
            selectedItemIndex={selectedConfirmSeedPhraseList[index]}
          />
        </div>)}
      </div>}

      {isShowCopy && <div className="mainLayout_copy">
        <div className="mainLayout_copy_text">
          Tap to Copy or Carefully write down your seed phrase and store it in a safe place
        </div>
        <div className="mainLayout_copy_iconWrapper" onClick={onCopyClick}>
          <div className="mainLayout_copy_icon"><FaCopy color='rgb(31, 105, 226)' /></div>
        </div>
      </div>}

      {Boolean(errorText) && <div className="mainLayout_error" ref={errorRef}>
        <div className="mainLayout_error_icon">
          <AiFillWarning />
        </div>
        <div className="mainLayout_error_text">
          {errorText}
        </div>
      </div>}

    </Container>

    <div className="mainLayout_confirm">
      <Container>
        <div className="mainLayout_confirm_title">
          <p className="mainLayout_confirm_text">How does this work?</p>
          <div className="mainLayout_confirm_icon"><GrFormNext /></div>
        </div>
        <button
          className={clsx(
            'mainLayout_confirm_button',
            isConfirmButtonDisabled && 'disabled',
            isConfirmButtonLoading && 'loading',
          )}
          type='button' onClick={onConfirmButtonClick}
          disabled={isConfirmButtonDisabled}
        >
          {isConfirmButtonLoading
            ? <div className="mainLayout_confirm_buttonLoading"><AiOutlineLoading3Quarters /></div>
            : <span>{confirmButtonText}</span>
          }
        </button>
      </Container>
    </div>
    <BottomShell isShow={Boolean(isShowButtonShellCopy)}>
      <div className="mainLayout_bottomShellCopy">
        <div className="mainLayout_bottomShellCopy_icon">
          <div className="mainLayout_bottomShellCopy_iconSuccess">
            <BsFillCheckCircleFill />
          </div>
        </div>
        <div className="mainLayout_bottomShellCopy_text">Save to clipboard</div>
        <div className="mainLayout_bottomShellCopy_icon">
          {confirmButtonCountTime !== undefined && (
            <div className="mainLayout_bottomShellCopy_iconCancel">
              <CountdownCircleTimer
                isPlaying
                duration={confirmButtonCountTime / 1000}
                size={26}
                strokeWidth={1}
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[7, 5, 2, 0]}
                onComplete={onCloseBottomShell}
              >
                {({ remainingTime }) => remainingTime}
              </CountdownCircleTimer>
            </div>)}
        </div>
      </div>
    </BottomShell>


    <BottomShell isShow={Boolean(isShowButtonShellCreatedWallet)} onClose={onCloseBottomShell}>
      <Container>
        <div className="mainLayout_bottomShellConfirm">
          <div className="mainLayout_bottomShellConfirm_icon">
            <BsFillCheckCircleFill />
          </div>
          <p className="mainLayout_bottomShellConfirm_title">
            Your wallet has been created!
          </p>

          <div className="mainLayout_bottomShellConfirm_list">
            {confirmCreatedWalletList.map((value, index) => (
              <div className="mainLayout_bottomShellConfirm_item" key={`bottomShellConfirm-item-${index}`}>
                <div 
                  className={clsx("mainLayout_bottomShellConfirm_itemCheck", value.isChecked && 'checked')}
                  onClick={() => onBottomShellConfirmItemClick(index)}
                >
                  {value.isChecked && (
                  <div className='mainLayout_bottomShellConfirm_itemCheckIcon'>
                    <FaCheck />
                  </div>) }
                </div>
                <p className="mainLayout_bottomShellConfirm_itemText">{value.label}</p>
              </div>
            ))}
          </div>
          <button 
            className={clsx("mainLayout_bottomShellConfirm_button", isDisabledUnderstandButton && 'disabled')} 
            onClick={onConfirmUnderstandClick} 
            disabled={isDisabledUnderstandButton} 
          >
            I UNDERSTAND
          </button>
        </div>
      </Container>
    </BottomShell>

  </div>
}

export default MainLayout;