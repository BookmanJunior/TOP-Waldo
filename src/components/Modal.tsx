import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Leaderboard } from './Leaderboard';
import FormatTime from '../helpers/FormatTime';
import { Link } from 'react-router-dom';
import FetchData from './FetchData';
import { LeaderboardEntries } from '../types/LeaderboardEntries';
import ErrorMessage from './ErrorMessage';
import getUrl from '../helpers/GetUrl';

type ModalProps = {
  isOpen: boolean;
  finalTime: number;
  map_id: number;
  handleRestart: () => void;
};

export function Modal({ isOpen, finalTime, map_id, handleRestart }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { state, data, error, setData } = FetchData<LeaderboardEntries[]>(
    `${getUrl()}/leaderboard/${map_id}`
  );

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  const didMakeTop10 = !data?.length || data.length < 10 || data[data.length - 1].time > finalTime;

  return createPortal(
    <dialog
      ref={modalRef}
      className={`${isOpen ? 'flex' : ''} w-[min(400px,100%)] flex-col gap-4 rounded-md border border-gray-700 border-opacity-50 px-4 py-4 text-center`}>
      <h2 className="border-b pb-4 text-3xl font-bold">You did it!</h2>
      <p>
        Your final time is: <span className="font-bold">{FormatTime(finalTime)}</span>
      </p>
      {didMakeTop10 ? (
        <ModalForm map_id={map_id} setData={setData} />
      ) : (
        <p>Can you make it to the top 10?</p>
      )}
      {state === 'loading' ? (
        <p>Loading Leaderboard</p>
      ) : state === 'error' ? (
        <p>{error.message}</p>
      ) : (
        <Leaderboard leaderboardData={data} />
      )}
      <div className="flex justify-center gap-2 border-t pt-4 text-sm">
        <button
          onClick={handleRestart}
          className="rounded-sm px-3 py-1 outline outline-1 outline-neutral-400">
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
  map_id: number;
  setData: (data: LeaderboardEntries[]) => void;
}

interface ModalResponseErrors {
  name?: string;
  message?: string;
  unexpectedError?: string;
}

function ModalForm({ map_id, setData }: ModalFormProps) {
  const [name, setName] = useState('');
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const [error, setError] = useState<ModalResponseErrors | null>(null);
  const [loading, setLoading] = useState(false);
  return !submittedSuccessfully ? (
    <>
      <h2 className="font-semibold">You made the top 10!</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="mr-2 rounded-sm px-2 py-[4px] outline outline-1 outline-gray-300"
          type="text"
          name="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
        />
        <button
          disabled={loading}
          className="rounded-sm bg-sky-700 px-4 py-[4px] text-white disabled:bg-gray-600">
          Submit
        </button>
        <ErrorMessage
          error={error?.name ?? error?.message ?? error?.unexpectedError}
          className="mt-1 font-semibold"
        />
      </form>
    </>
  ) : (
    <h2>You've been added to the leaderboard!</h2>
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (name.trim().length < 2 || name.trim().length > 15) {
      setError({ name: 'Name must be longer than 2 characters and less than 15 characters' });
    }

    setLoading(!loading);
    try {
      const res = await fetch(`${getUrl()}/leaderboard`, {
        mode: 'cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, map_id })
      });
      const resResult = await res.json();

      if (res.status >= 400) {
        setError(resResult);
        return;
      }
      setData(resResult);
      setName('');
      setSubmittedSuccessfully(true);
    } catch (error) {
      if (error instanceof Error) {
        setError({ ...error, unexpectedError: error.message });
      }
    } finally {
      setLoading(!!loading);
    }
  }
}
