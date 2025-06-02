import Url from "./Url";
import Statistics from "./Statistics";
import Booster from "./Booster";

export default function Main() {
  return (
    <main className="url mt-20 bg-n-lGray" role="main">
      {/* url */}
      <div className="px-dyp pb-50">
        <Url />
        {/* stats */}
        <Statistics />
      </div>
      {/* booster */}
      <Booster />
    </main>
  );
}
