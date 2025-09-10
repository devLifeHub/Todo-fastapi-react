import { useState, useEffect, useRef } from "react";
import img from "@/assets/decors/decor_man.png";
import img_2 from "../../../../assets/graphe.png";
import s from "./About.module.scss";
import StatsCounter from '../../StatsCounter/StatsCounter'
import clsx from "clsx";

import Highlight from '../../../atoms/Highlight/Highlight'
import { aboutData } from '../../../../storeData'


const About = () => {

  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      {
        threshold: 1,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    if (aboutRef.current) obs.observe(aboutRef.current);
    return () => obs.disconnect();
  }, []);


  return (
    <div id="about" className={clsx(s["about"])}>
      <div className={clsx(s["about-container"], "container", "container__indent")}>
        <h2 className={clsx(s["about-title"])}>{aboutData.title}</h2>

        <div className={clsx(s["about__content"])}>
          <div className={clsx(s["about__content__descr"])}>
            {/* <p className={clsx(s["about__content__descr-text"])}>
              Welcome to 
              <Highlight type="rect">ToDo</Highlight> 
              – a portable and visible tool for managing tasks! …
            </p> */}
            <p className={clsx(s["about__content__descr-text"])}>
              TodoList is a lightweight and intuitive web application for task management. It is built with an emphasis on ease of launch, minimal dependencies, and maximum reproducibility of the environment. Suitable for both personal use and as a teaching example of architecture where transparency, predictability and maintainability of code are important.
            </p>

            <div className={clsx(s["about__content__descr-pros"])}>
              <div className={clsx(s["about__content__pros-descr"])}>
                <h3 className={clsx(s["about__content__pros-title"])}>
                    <Highlight type="oval">
                      {aboutData.advantage.title}
                    </Highlight>
                  </h3>
                <ul className={clsx(s["about__pros__list"])}>
                  {aboutData.advantage.items.map(({descr}, index) => (
                    <li key={index} className={clsx(s["about__pros__list-item"])}>{descr}</li>
                  ))}
                </ul>
              </div>
              <div className={clsx(s["about__content__pros-graphe"])}>
                <img className={clsx(s["about__content__pros-img"])} src={img_2} alt="Graph illustration"/>
              </div>
            </div>

            <div ref={aboutRef} className={clsx(s["about__content__count"])}>
              <StatsCounter isVisible={isVisible} />
            </div>

          </div>

          <img className={clsx(s["about__content-img"])} src={img} alt="About illustration" />
        </div>
      </div>
    </div>
  );
}

export default About