
import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children:any
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal relative">
      <div className="modal-content bg-[url('../../public/modal-bg.png')]">{children}</div>
      <AiOutlineCloseCircle className='text-white absolute right-72 top-16 h-10 w-10 cursor-pointer' onClick={onClose} />
    </div>
  );
};

export default Modal;
