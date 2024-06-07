import { useState } from 'react';
import { Leaderboard } from './Leaderboard';
import { useRootData } from '../router/Root';
import getUrl from '../helpers/GetUrl';
import { LeaderboardEntries } from '../types/LeaderboardEntries';
import FetchData from './FetchData';
import Spinner from './Spinner';

export default function SwitchableLeaderboard() {
  const [currentLeaderboard, setCurrentLeaderboard] = useState(1);
  const { state, data, error } = FetchData<LeaderboardEntries[]>(`${getUrl()}/leaderboard`);
  const { mapData } = useRootData();

  const leaderboardToDisplay = data
    ?.filter((entry) => entry.map_id === currentLeaderboard)
    ?.filter((entry, i) => {
      if (i >= 10) return;
      return entry;
    });

  return (
    <div>
      <div className="buttons my-4 bg-black text-white">
        <h2 className="px-4 py-2 text-[1.3rem] font-bold">Leaderboard</h2>
        {mapData.map((item) => (
          <button
            key={item.map_id}
            disabled={state !== 'loaded'}
            onClick={(e) => {
              if (currentLeaderboard === item.map_id) {
                e.preventDefault();
                return;
              }
              setCurrentLeaderboard(item.map_id);
            }}
            className={`mr-2 cursor-pointer px-4 py-1 disabled:text-gray-400
             ${item.map_id === currentLeaderboard ? 'bg-[#f5f5f5] text-black first:border-r first:border-r-black' : ''}`}>
            {item.title}
          </button>
        ))}
      </div>
      {state === 'loading' ? (
        <Spinner />
      ) : state === 'error' ? (
        <div>{error.message}</div>
      ) : (
        <Leaderboard leaderboardData={leaderboardToDisplay} showCaption={false} />
      )}
    </div>
  );
}
