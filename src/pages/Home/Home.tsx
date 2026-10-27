import Feeds from "./Feeds/Feeds";
import Sidebar from "./Sidebar/Sidebar";
import Suggestions from "./suggestion/Suggestions";

export default function Home() {

  return (
    <>
      <div className="grid grid-cols-12 gap-5 xl:gap-15">
        <section className="col-span-3 hidden xl:block">
          <h3 className="text-xl font-bold text-heading">
            People you may know
          </h3>
          <Suggestions />
        </section>

        <section className="col-span-12 md:col-span-8 xl:col-span-6">
          <Feeds />
        </section>

        <section className="hidden md:block md:col-span-4 xl:col-span-3">
          <Sidebar />
        </section>
      </div>
    </>
  )
}
