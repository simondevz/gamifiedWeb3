import Banner from "../components/home/banner";
import Explore from "../components/home/explore";
import Games from "../components/home/games";
import Newsletter from "../components/home/newsletter";

export default function Home() {
  return (
    <section className="flex flex-col font-inter w-full">
      <Banner />
      <div>
        <Games />
        <Explore />
        <Newsletter />
      </div>
    </section>
  );
}
