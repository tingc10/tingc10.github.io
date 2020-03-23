import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './styles.module.scss';

interface Props  {
  onClickBackground?: () => void;
}

const Modal: React.SFC<Props> = ({ 
  children,
  onClickBackground
}) => {
  const portalRef = React.useRef<HTMLDivElement>(document.createElement('div'));

  React.useEffect(() => {
    const portalRoot = document.getElementById('js-portal');
    const node = portalRef.current;
    portalRoot?.appendChild(node)

    return () => {
      portalRoot?.removeChild(node)
    }
  }, [])

  function handleChildClick(e: React.MouseEvent) {
    e.nativeEvent.stopImmediatePropagation();
  }
  
  return ReactDOM.createPortal(
    <div
      className={styles.container}
      onClick={onClickBackground}>
      <div onClick={handleChildClick}>
        {children}
      </div>
    </div>,
    portalRef.current
  )
}

export default Modal;
