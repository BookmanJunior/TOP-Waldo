import FormatTime from '../helpers/FormatTime';
import { LeaderboardEntries } from '../types/LeaderboardEntries';

interface LeaderboardProps {
  leaderboardData: LeaderboardEntries[];
  showCaption?: boolean;
}

export function Leaderboard({ leaderboardData, showCaption = true }: LeaderboardProps) {
  if (!leaderboardData.length) return <div>Leaderboard has no entries</div>;

  return (
    <table className="w-full text-center">
      {showCaption && (
        <caption className=" mb-4 bg-black py-1 font-semibold tracking-widest text-white">
          Leaderboard
        </caption>
      )}
      <thead>
        <tr>
          <th>Place</th>
          <th>Name</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {leaderboardData.map((entry, i) => (
          <tr key={i} className="border-b last:border-0 [&>*]:py-1">
            <th scope="row">{i + 1}</th>
            <td>{entry.name}</td>
            <td>{FormatTime(entry.time)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
