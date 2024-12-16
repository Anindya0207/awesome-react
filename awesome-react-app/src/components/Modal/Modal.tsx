import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Flex1, FlexColumn } from '../../Flex';
import { Box } from '../../BaseElements';
import { createPortal } from 'react-dom';

interface ModalConfig {
  showCloseIcon?: boolean;
  easyClose?: boolean;
}
export interface WithModalInjectedProps {
  showModal: (content: JSX.Element, config?: ModalConfig) => void;
  hideModal: () => void;
}
interface ModalGlobalConfig {
  modalContentClassName?: string;
  modalOverlayClassName?: string;
}
const withModal =
  <T extends {}>(globalConfig: ModalGlobalConfig) =>
  (Komponent: React.ComponentType<T & WithModalInjectedProps>) => {
    const Modal: React.FC<T> = (props: T) => {
      const [visible, setVisible] = useState<boolean>(false);
      const [showCloseIcon, setShowClose] = useState<boolean>(false);
      const [easyClose, setEasyClose] = useState<boolean>(false);
      const [modalContent, setModalContent] = useState<JSX.Element | null>(
        null,
      );
      useEffect(() => {
        document.addEventListener('keydown', onEscape);
        return () => {
          hideModal();
          document.removeEventListener('keydown', onEscape);
        };
      }, [easyClose]);
      const onEscape = (event: KeyboardEvent) => {
        if (event.key == 'Escape' && easyClose) {
          hideModal();
        }
      };
      const showModal = useCallback(
        (content: JSX.Element, config?: ModalConfig) => {
          setModalContent(content);
          setEasyClose(!!config?.easyClose);
          setShowClose(!!config?.showCloseIcon);
          setVisible(true);
        },
        [],
      );
      const hideModal = () => {
        setModalContent(null);
        setVisible(false);
      };
      return (
        <Flex1>
          {visible && (
            <Fragment>
              {createPortal(
                <Fragment>
                  <Box
                    position="fixed"
                    top={0}
                    left={0}
                    width="100%"
                    height="100%"
                    background="rgba(0,0,0,0.5)"
                    {...(globalConfig?.modalOverlayClassName && {
                      className: globalConfig?.modalOverlayClassName,
                    })}
                    onClick={() => {
                      easyClose && hideModal();
                    }}
                  ></Box>
                  <FlexColumn
                    position="fixed"
                    background="#fff"
                    minHeight={200}
                    minWidth={500}
                    borderRadius={'5px'}
                    padding="30px"
                    {...(globalConfig?.modalContentClassName && {
                      className: globalConfig?.modalContentClassName,
                    })}
                    style={{
                      boxShadow: '0 0 2px #000',
                      transform: 'translate(-50%, -50%)',
                      left: '50%',
                      top: '50%',
                    }}
                  >
                    {showCloseIcon && (
                      <Box
                        style={{
                          position: 'absolute',
                          right: '20px',
                          top: '17px',
                          filter: 'grayscale(1)',
                          cursor: 'pointer',
                        }}
                        onClick={() => hideModal()}
                      >
                        &#x274c;
                      </Box>
                    )}
                    {modalContent}
                  </FlexColumn>
                </Fragment>,
                document.body,
              )}
            </Fragment>
          )}
          <Komponent
            {...(props as T)}
            showModal={showModal}
            hideModal={hideModal}
          />
        </Flex1>
      );
    };
    return Modal;
  };

export default withModal;
