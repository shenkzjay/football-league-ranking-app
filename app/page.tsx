import Image from "next/image";

export default function Home() {
  return (
    <section>
      <nav>
        <h1>City Footbal League Standings</h1>
        <section>
          <table className="w-1/2 text-left">
            <caption>League standings</caption>
            <thead>
              <tr>
                <th>Pos</th>
                <th>Team</th>
                <th>P</th>
                <th>W</th>
                <th>L</th>
                <th>D</th>
                <th>GF</th>
                <th>GA</th>
                <th>GD</th>
                <th>Pts</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Team A</td>
                <td>10</td>
                <td>3</td>
                <td>5</td>
                <td>2</td>
                <td>10</td>
                <td>13</td>
                <td>-3</td>
                <td>14</td>
              </tr>
            </tbody>
          </table>
        </section>
      </nav>
    </section>
  );
}
