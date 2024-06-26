import { useCollection, usePagination, useSquid } from '@squidcloud/react';
import { useState } from 'react';

const PlayersList = () => {
  const squid = useSquid();
  const [message, setMessage] = useState('');
  const [generating, setGenerating] = useState(false);
  const [comparePid, setComparePid] = useState(null);

  const collection = useCollection('players');
  const { data, loading, next, prev, hasPrev, hasNext } = usePagination(
    collection.query().sortBy('pts', false).dereference(),
    { pageSize: 50, subscribe: true },
  );

  const getRandomFact = async (name) => {
    setGenerating(true);
    const response = await squid.executeFunction('getRandomFact', name);
    setMessage(await response);
    setGenerating(false);
  };

  const compare = async (pid) => {
    console.log(comparePid, pid);

    if (!comparePid) {
      setComparePid(pid);
      return;
    }

    setGenerating(true);

    const response = await squid.executeFunction(
      'comparePlayers',
      comparePid,
      pid,
    );
    setComparePid(null);
    setMessage(await response);
    setGenerating(false);
  };

  // TODO: if (error) return <span>{error}</span>;

  if (!data.length && loading) return <span>Waiting...</span>;
  if (!data.length) return null;

  return (
    <div className="flex flex-col items-center">
      <span className="inline-block mb-4">
        {generating ? 'Generating...' : message}
      </span>
      <div className="flex gap-2 mb-4">
        <button onClick={prev} disabled={!hasPrev || loading}>
          Prev
        </button>
        <button onClick={next} disabled={!hasNext || loading}>
          Next
        </button>
      </div>
      <table className="align-top w-[800px]">
        <thead>
          <tr style={{ textAlign: 'left' }}>
            <th>Name</th>
            <th>Min</th>
            <th>Pts</th>
            <th>Ast</th>
            <th>Reb</th>
            <th>Blk</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr style={{ textAlign: 'left' }} key={p.playerId}>
              <td className="whitespace-nowrap truncate">
                <img
                  className="inline mr-1"
                  src={`https://cdn.nba.com/headshots/nba/latest/1040x760/${p.playerId}.png`}
                  width={32}
                />
                <span className="inline">
                  {p.firstName} {p.lastName}
                </span>
                <button
                  className="inline px-1 py-0 ml-2"
                  disabled={generating || comparePid}
                  onClick={() => getRandomFact(`${p.firstName} ${p.lastName}`)}
                >
                  ?
                </button>
                <button
                  className="inline px-1 py-0 ml-2"
                  disabled={generating || comparePid === p.playerId}
                  onClick={() => compare(p.playerId)}
                >
                  ↔
                </button>
              </td>
              <td>{p.minutes}</td>
              <td>{p.pts}</td>
              <td>{p.ast}</td>
              <td>{p.reb}</td>
              <td>{p.blk}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayersList;
