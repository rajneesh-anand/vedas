import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

import { timeConverter } from '@components/quiz/helper/utils';

const Countdown = ({ countdownTime, timeOver, setTimeTaken }) => {
  const totalTime = countdownTime * 1000;
  const [timerTime, setTimerTime] = useState(totalTime);
  const { hours, minutes, seconds } = timeConverter(timerTime);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = timerTime - 1000;

      if (newTime >= 0) {
        setTimerTime(newTime);
      } else {
        clearInterval(timer);

        Swal.fire({
          title: `Your Time's Up`,
          icon: 'info',
          timer: 5000,
          willClose: () => timeOver(totalTime - timerTime),
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      setTimeTaken(totalTime - timerTime + 1000);
    };

    // eslint-disable-next-line
  }, [timerTime]);

  return (
    <div className="flex items-center justify-center border rounded-full  w-[196px] lg:w-[216px] py-3 bg-indigo-600">
      <div
        className="inline-flex shadow-md hover:shadow-lg focus:shadow-lg"
        role="group"
      >
        <button type="button" className="w-[56px]  text-white">
          {hours} <span>:</span>
        </button>
        <button type="button" className="w-[56px]  text-white">
          {minutes} :
        </button>
        <button type="button" className="w-[56px] text-white">
          {seconds}
        </button>
      </div>
    </div>
  );
};

Countdown.propTypes = {
  countdownTime: PropTypes.number.isRequired,
  timeOver: PropTypes.func.isRequired,
  setTimeTaken: PropTypes.func.isRequired,
};

export default Countdown;
