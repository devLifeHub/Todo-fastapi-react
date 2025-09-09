import PropTypes from "prop-types"
import clsx from "clsx"
import s from "./WorkSlide.module.scss"

const WorkSlide = ({img}) => {

  return (
    <div className={clsx(s["work__slide"])}>
        <div>
        <img className={clsx(s["work__slide-img"])} src={img} alt="" />
        </div>
        <div className={clsx(s["work__slide__descr"])}>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Velit nihil error ea, tempore aliquid at, perspiciatis suscipit beatae maxime quo minus incidunt deleniti dicta commodi eligendi non dolorem officiis a.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, excepturi illo! Laboriosam earum quos ipsa perferendis.
                Repellat, aut nostrum accusantium accusamus dolor perspiciatis ex nulla totam non labore facilis quod.
            </p>
        </div>

    </div>
  )
}

WorkSlide.propTypes = {
  img: PropTypes.string,
}


export default WorkSlide