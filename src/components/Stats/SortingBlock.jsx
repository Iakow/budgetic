import React from 'react';
import CSS from './sortingblock.module.css';

const SortingBlock = (props) => {
  return (
    < div className={CSS.sorting_block} >
      <button
        className={CSS.button}
        onClick={props.handler}
        name="sortingBySum"
      >
        {`Sum: ${props.bySum}`}
      </button>

      <button
        className={CSS.button}
        onClick={props.handler}
        name="sortingByDate"
      >
        {`Date: ${props.byDate}`}
      </button>

      <button
        className={CSS.button}
        onClick={props.handler}
        name="sortingByCategory"
      >
        {`Category: ${props.byCategory}`}
      </button>

      <button
        className={CSS.button}
        onClick={props.handler}
        name="sortingByTags"
      >
        {`Tags: ${props.byTags}`}
      </button>
    </div >
  )
}

export default SortingBlock;