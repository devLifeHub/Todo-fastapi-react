import clsx from 'clsx';
import { SpinnerCircular } from 'spinners-react';
import s from './Spinner.module.scss'
import PropTypes from 'prop-types';

const SpinCircular = ({mode, size}) => {
    const color = "rgba(99, 57, 172, 1)";
    const secondaryColor = "rgba(101, 57, 172, 0.32)";

    return (
        <div className={clsx(s["spinner"], s[`spinner-${mode}`])}>
            <SpinnerCircular size={size} thickness={100} speed={100} color={color} secondaryColor={secondaryColor} />
        </div>
    )
}

SpinCircular.propTypes = {
    mode: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
}

export default SpinCircular