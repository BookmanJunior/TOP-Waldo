import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Leaderboard } from './Leaderboard';
import FormatTime from '../helpers/FormatTime';

type ModalProps = {
  isOpen: boolean;
  finalTime: number;
};

export function Modal({ isOpen, finalTime }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  return createPortal(
    <dialog
      ref={modalRef}
      className={`${isOpen ? 'flex' : ''} w-[min(400px,100%)] flex-col gap-4 rounded-md border border-gray-700 border-opacity-50 py-4 text-center`}>
      <h2 className="border-b pb-4 text-3xl font-bold">You did it!</h2>
      <p>
        Your final time is: <span className="font-bold">{FormatTime(finalTime)}</span>
      </p>
      <div className="px-4">
        <Leaderboard />
      </div>
      <div className="flex justify-center gap-2 border-t pt-4 text-sm">
        <button className="rounded-sm px-3 py-1 outline outline-1 outline-neutral-400">
          Play Again
        </button>
        <button className="rounded-sm px-3 py-1 outline outline-1 outline-neutral-400">
          Go Home
        </button>
      </div>
    </dialog>,
    document.body
  );
}
