import PropTypes from "prop-types";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import statsThunk from "@/store/stats/statsThunks";
import {
    selectUsersCount,
    selectTodosCount,
    selectStatsStatus,
    selectStatsError
} from "@/store/stats/statsSelectors";

import StatItem from '../../atoms/StatItem'

import clsx from "clsx";
import s from "./StatsCounter.module.scss";


const StatsCounter = ({ isVisible }) => {
    const { fetchStatsThunk } = statsThunk

    const dispatch = useDispatch();
    
    const totalUsers = useSelector(selectUsersCount);
    const totalTodos = useSelector(selectTodosCount);
    const status = useSelector(selectStatsStatus);
    const error = useSelector(selectStatsError);

    const [usersCount, setUsersCount] = useState(0);
    const [todosCount, setTodosCount] = useState(0);

    useEffect(() => {
        if (isVisible && status === "idle") {
            dispatch(fetchStatsThunk());
        }
    }, [isVisible, status, dispatch]);


    useEffect(() => {
        if (status !== "succeeded") return;
        const STEPS = 50;
        const INTERVAL = 200;

        let u = 0, t = 0;
        const stepU = Math.ceil(totalUsers / STEPS);
        const stepT = Math.ceil(totalTodos / STEPS);

        const timerU = setInterval(() => {
            u = Math.min(u + stepU, totalUsers);
            setUsersCount(u);
            if (u === totalUsers) clearInterval(timerU);
        }, INTERVAL);

        const timerT = setInterval(() => {
            t = Math.min(t + stepT, totalTodos);
            setTodosCount(t);
            if (t === totalTodos) clearInterval(timerT);
        }, INTERVAL);

        return () => {
            clearInterval(timerU);
            clearInterval(timerT);
        };
    }, [status, totalUsers, totalTodos]);


    const items = [
        { label: "Total number of users:", value: usersCount, prefix: "stat__user" },
        { label: "Total number of notes:", value: todosCount, prefix: "stat__todo" },
    ];

  return (
    <div className={clsx(s.stats)}>
        {status === "failed" && <p className="error">Error: {error}</p>}

        {items.map(({ label, value, prefix }) => (
            <StatItem key={prefix} label={label} value={value} prefix={prefix} />
        ))}
    </div>
  );
};

StatsCounter.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

export default StatsCounter;

