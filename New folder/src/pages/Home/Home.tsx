import Feeds from "./Feeds/Feeds";
import Sidebar from "./Sidebar/Sidebar";
import Suggestions from "./suggestion/Suggestions";

export default function Home() {


  return (
    <>
      <div className="grid grid-cols-12 gap-15">
        <section className="col-span-3 ">
          <h3 className="text-heading font-bold text-xl">People you may know</h3>
          <Suggestions />
        </section>
        <section className="col-span-6">
          <Feeds />
        </section>
        <section className="col-span-3">
          <Sidebar  />
        </section>
      </div>
    </>
  )
}
