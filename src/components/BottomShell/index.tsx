import { BsChevronCompactDown } from "react-icons/bs";

export interface ButtonShellProps {
  isShow: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const ButtonShell: React.FC<ButtonShellProps> = ({isShow, children, onClose}) => {
  if(!isShow) return null
  return <div className="buttonShell">
    <div className="buttonShell_contentWrapper">
      <div className="buttonShell_icon" onClick={() => {if(onClose) onClose()}}>
        <BsChevronCompactDown />
      </div>
      <div className="buttonShell_content">
        {children}
      </div>
    </div>
  </div>
}

export default ButtonShell;