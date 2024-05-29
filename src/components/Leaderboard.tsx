import FormatTime from '../helpers/FormatTime';
import { LeaderboardEntries } from '../types/LeaderboardEntries';

export function Leaderboard({ leaderboardData }: { leaderboardData: LeaderboardEntries[] }) {
  if (!leaderboardData.length) return <div>Leaderboard has no entries</div>;

  return (
    <table className="my-2 w-full text-center">
      <caption className=" bg-black py-1 font-semibold tracking-widest text-white">
        Leaderboard
      </caption>
      <tbody>
        {leaderboardData.map((entry, i) => (
          <tr key={i} className="border-b [&>*]:py-1">
            <th scope="row">{i + 1}</th>
            <td>{entry.name}</td>
            <td>{FormatTime(entry.time)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
