import { LeaderboardEntries } from '../types/LeaderboardEntries';

export function Leaderboard({ leaderboardData }: { leaderboardData: LeaderboardEntries[] }) {
  return (
    <table className="my-2 w-full text-center">
      <caption className=" bg-black py-1 font-semibold tracking-widest text-white">
        Leaderboard
      </caption>
      <tbody>
        {leaderboardData.map((p, i) => (
          <tr key={i} className="border-b [&>*]:py-1">
            <th scope="row">{i + 1}</th>
            <td>{p?.name}</td>
            <td>{p?.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
