import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Leaderboard } from './Leaderboard';
import FormatTime from '../helpers/FormatTime';
import { Link } from 'react-router-dom';
import FetchData from './FetchData';
import { LeaderboardEntries } from '../types/LeaderboardEntries';
import getUrl from '../helpers/GetUrl';

type ModalProps = {
  isOpen: boolean;
  finalTime: number;
  map_id: number;
};

export function Modal({ isOpen, finalTime, map_id }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { state, data, error, setData } = FetchData<LeaderboardEntries[]>(
    `${getUrl()}/leaderboard`
  );

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
      <ModalForm finalTime={finalTime} map_id={map_id} setData={setData} />
      <div className="px-4">
        {state === 'loading' ? (
          <p>Loading Leaderboard</p>
        ) : state === 'error' ? (
          <p>{error.message}</p>
        ) : (
          <Leaderboard leaderboardData={data} />
        )}
      </div>
      <div className="flex justify-center gap-2 border-t pt-4 text-sm">
        <button className="rounded-sm px-3 py-1 outline outline-1 outline-neutral-400">
          Play Again
        </button>
        <Link to={'/'} className="rounded-sm px-3 py-1 outline outline-1 outline-neutral-400">
          Go Home
        </Link>
      </div>
    </dialog>,
    document.body
  );
}

interface ModalFormProps {
  finalTime: number;
  map_id: number;
  setData: (data: LeaderboardEntries[]) => void;
}

function ModalForm({ finalTime, map_id, setData }: ModalFormProps) {
  const [name, setName] = useState('');
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  return !submittedSuccessfully ? (
    <>
      <h2>You made the top 10!</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="mr-2 rounded-sm px-2 py-[4px] outline outline-1 outline-gray-300"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="rounded-sm bg-sky-700 px-4 py-[4px] text-white">Submit</button>
      </form>
    </>
  ) : (
    <h2>You've been added to the leaderboard!</h2>
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/leaderboard', {
        mode: 'cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ time: finalTime, name, map_id })
      });
      const resResult = await res.json();

      if (res.status >= 400) {
        throw new Error(resResult.message);
      }
      setData(resResult);
      setName('');
      setSubmittedSuccessfully(true);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
}
