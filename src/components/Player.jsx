import { useRef, useState } from 'react';

export default function Player() {
  const [entName, setEntName] = useState('');
  const refInName = useRef();
  const onSetName = e => {
    setEntName(refInName.current.value);
    refInName.current.value = '';
  }
  return (
    <section id='player'>
      <h2>Welcome {entName ? entName : 'unknown entity'}</h2>
      <p>
        <input ref={refInName} type='text' />
        <button onClick={onSetName}>Set Name</button>
      </p>
    </section>
  );
}
