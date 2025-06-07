import React from 'react';
import Modal from 'react-modal';
import { useModal, ModalTypes } from '../ModalContext/ModalContext'; // Import useModal hook

const CustomModal = () => {
  const { closeModal, modalContent, modalIsOpen, currentModalType } = useModal();

  let modalStyle = {};
  let otherStyling = {}; //for removing predefined styling outside of the close button

  switch (currentModalType) {
    case ModalTypes.FULLSCREEN:
      modalStyle = {
        content: {
          backgroundColor: 'var(--bg-color)', // Apply theme background color
          color: 'var(--text-color)', // Apply theme text color
          transition: 'background-color 0.3s, color 0.3s', // Add smooth transition
        },
      };
      break;
    case ModalTypes.SMALLBOX:
      modalStyle = {
        content: {
          width: '50%',
          height: '50%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'var(--bg-color)', // Apply theme background color
          color: 'var(--text-color)', // Apply theme text color
          transition: 'background-color 0.3s, color 0.3s', // Add smooth transition
        },
      };
      break;
    case ModalTypes.SMALLBOXMINIMUM:
        //minStyling = true;
        otherStyling = {
          minWidth: '100%',
          minHeight: '100%',
          display: 'flex',
        }

        modalStyle = {
          content: {
            width: '50%',
            height: '50%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'var(--bg-color)', // Apply theme background color
            color: 'var(--text-color)', // Apply theme text color
            transition: 'background-color 0.3s, color 0.3s', // Add smooth transition
          },
        };
        break;
    case ModalTypes.SMALLBOXCUSTOM:
      modalStyle = {
        content: {
          width: '50%',
          height: '50%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'var(--bg-color)', // Apply theme background color
          color: 'var(--text-color)', // Apply theme text color
          transition: 'background-color 0.3s, color 0.3s', // Add smooth transition
        },
      };
      break;
    default:
      modalStyle = {
        backgroundColor: 'var(--bg-color)', // Apply theme background color
        color: 'var(--text-color)', // Apply theme text color
        transition: 'background-color 0.3s, color 0.3s', // Add smooth transition
      };
      break;
  }

  //console.log('Modal Content: ', modalContent);

  return (
    <Modal
      isOpen={modalIsOpen} // Check if modalContent is a function
      onRequestClose={closeModal}
      style={modalStyle}
      contentLabel="Main Modal"
      ariaHideApp={false}
    >
      {currentModalType !== ModalTypes.SMALLBOXCUSTOM && (
        <button className='bg-Primary-Color hover:bg-Primary-Color-Dark px-4 py-2 rounded-md mt-4'
            style={{ 
                      position: 'absolute', right: '5px', top: '-10px',
                      borderRadius: '50%', border: 'none', display: 'flex', 
                      justifyContent: 'center', alignItems: 'center', cursor: 'pointer'
                  }}
            onClick={closeModal}
            >
            <span style={{ color: 'blue', fontSize: '20px' }}>X</span>
          </button> 
      )}

      {modalContent && typeof modalContent === 'object' && (
        <div style={otherStyling ? { ...otherStyling } : {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100%', // Ensure the modal takes up the full height of the viewport
          padding: '20px', // Adjust padding as needed
        }}>
          {modalContent}
        </div>
      )} {/* Ensure modalContent is a function before calling it */}
    </Modal>
  );
};

export default CustomModal;
