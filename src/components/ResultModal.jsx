import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal({ targetTime, remainingTime, onReset }, ref) {
    const dialogRef = useRef();
    const timeRemainFormat = (remainingTime / 1000).toFixed(2);
    // remainingTime (milisecond) - targetTime (second) => need to convert mutiplying 1000
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
    const userLost = remainingTime <= 0;
    useImperativeHandle(ref, () => {
        return {
            showModal() {
                dialogRef.current.showModal();
            }
        }
    })
    return createPortal(
        <dialog ref={dialogRef} className='result-modal' onClose={onReset}>
            {userLost && <h2>You Lost</h2>}
            {!userLost && <h2>Your score: {score}</h2>}
            <p>
                The target time was <strong>{targetTime} second{targetTime > 1 ? 's' : ''}.</strong>
            </p>
            <p>
                You stopped the timer with <strong>{timeRemainFormat} seconds left.</strong>
            </p>
            <form method='dialog'>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
})

export default ResultModal;