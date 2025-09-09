import clsx from 'clsx';
import { heroData } from '../../../../storeData'
import s from './Hero.module.scss'

const Hero = () => {
  return (
    <div className={clsx(s["hero"])}>
    <div className={clsx(s["hero__img"])}></div>
    <div className={clsx(s["hero__content"])}>
        <h1 className={clsx(s["hero__title"])}>{heroData.title}</h1>
        <p className={clsx(s["hero__subtitle"])}>{heroData.subtitle}</p>
    </div>
    </div>
  );
};

export default Hero;
