import { workData } from "@/storeData";

import s from "./Work.module.scss";
import clsx from "clsx";
import WorkSwiper from "../../Swipers/WorkSwiper/WorkSwiper";

const Work = () => {
  return (
    <div className={clsx(s["work"])}>
      <div className={clsx(s["work-container"], "container", "container__indent") }>
        <h2 className={clsx(s["work-title"])}>{workData.title}</h2>
        <p className={clsx(s["work-descr"])}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem voluptatem libero nulla commodi aliquam veniam voluptates incidunt ipsum dolores nihil, voluptas nam iusto perferendis explicabo mollitia fugit ullam rerum optio!</p>

        <WorkSwiper />
      </div>
    </div>
  );
};

export default Work;
