const mockData = [
  { name: 'Azam', time: 1000 },
  { name: 'John Doe', time: 2000 },
  { name: 'K', time: 3000 }
];

export function Leaderboard() {
  return (
    <table className="my-2 w-full text-center">
      <caption className=" bg-black py-1 font-semibold tracking-widest text-white">
        Leaderboard
      </caption>
      <tbody>
        {mockData.map((p, i) => (
          <tr key={i} className="border-b [&>*]:py-1">
            <th scope="row">{i + 1}</th>
            <td>{p.name}</td>
            <td>{p.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
