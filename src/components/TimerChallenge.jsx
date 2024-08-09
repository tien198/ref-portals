import React, { useRef, useState } from 'react';
import ResultModal from './ResultModal';

function TimerChallenge({ title, targetTime }) {
    const [remainingTime, setRemainingTime] = useState(targetTime * 1000);

    const timer = useRef();
    const resultModal = useRef();
    const timerIsActive = remainingTime > 0 && remainingTime < targetTime * 1000;

    if (remainingTime <= 0) {
        clearInterval(timer.current);
        resultModal.current.showModal();
    }

    function handleReset() {
        setRemainingTime(targetTime * 1000);
    }

    function handleStart() {
        // timer.current = setTimeout(() => {
        //     setTimerExpired(true);
        //     resultModal.current.showModal();
        // }, targetTime * 1000);
        timer.current = setInterval(() => {
            setRemainingTime(prev => prev - 10);
        }, 10)
    }
    function handleStop() {
        clearInterval(timer.current);
        resultModal.current.showModal();
    }

    return (
        <>
            <ResultModal ref={resultModal} targetTime={targetTime} remainingTime={remainingTime} onReset={handleReset} />
            <section className='challenge'>
                <h2>{title}</h2>
                <p className='challenge-time'>
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? 'active' : ''}>
                    {timerIsActive ? 'Timer is running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    );
}

export default TimerChallenge;