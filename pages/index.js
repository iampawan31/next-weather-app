import Head from "next/head";
import FamousPlaces from "../components/FamousPlaces";
import SearchBox from "../components/SearchBox";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Weather App - Nextjs</title>
      </Head>
      <div className="home">
        <div className="container">
          <SearchBox placeholder="Search for a city..." />
          <FamousPlaces />
        </div>
      </div>
    </div>
  );
}
