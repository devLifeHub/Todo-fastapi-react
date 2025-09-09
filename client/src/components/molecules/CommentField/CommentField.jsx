import clsx from "clsx";
import TextareaWrap from "@/components/atoms/TextareaWrap/TextareaWrap";
import s from "./CommentField.module.scss";
import PropTypes from "prop-types";

const CommentField = ({ comment, setComment }) => {
  return (
    <div className={clsx(s["review__comment"])}>
      <label className={clsx(s["review__comment-label"])}>Comment:</label>
      <div className={clsx(s["review__comment-wrap"])}>
        <TextareaWrap className={clsx(s["review__comment-bg"])} />
        <textarea
          className={clsx(s["review__comment-textarea"])}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="auto"
          required
        />
      </div>
    </div>
  );
};

CommentField.propTypes = {
  comment: PropTypes.string.isRequired,
  setComment: PropTypes.func.isRequired,
};

export default CommentField;
