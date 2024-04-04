import css from './Options.module.css';

const Options = ({ updateFeedback, handleClickReset }) => {
    return ( 
        <div className={css.buttons}>
          <button onClick={ () => updateFeedback("good") }>Good</button>
          <button onClick={ () => updateFeedback("neutral") }>Neutral</button>
          <button onClick={ () => updateFeedback("bad") }>Bad</button>
          <button onClick={ handleClickReset }>Reset</button>
        </div>   
     );
};
 
export default Options;
