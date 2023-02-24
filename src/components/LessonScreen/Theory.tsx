import React from 'react';

function Theory({theory, setShowTheory, showTheory}: any) {
    const [imgUrl, ...text] = theory
    return (
        <div>
            <button onClick={() => setShowTheory(false)}> hide </button>
            {imgUrl && <img src={imgUrl} alt="pic.1"/>}
            {text.map((line: string, index: number) => {
              return index % 2 === 0
                  ? <p key={index}>{line}</p>
                  : <p key={index}><b>{line}</b></p>
            })}
        </div>
    );
}

export default Theory;