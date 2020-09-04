import React from 'react';

const SortingBlock = (props) => {
  return (
    < div className="sortings" >
      <button
        onClick={props.handler}
        name="sortingBySum"
      >
        {`Sum: ${props.bySum}`}
      </button>

      <button
        onClick={props.handler}
        name="sortingByDate"
      >
        {`Date: ${props.byDate}`}
      </button>

      <button
        onClick={props.handler}
        name="sortingByCategory"
      >
        {`Category: ${props.byCategory}`}
      </button>

      <button
        onClick={props.handler}
        name="sortingByTags"
      >
        {`Tags: ${props.byTags}`}
      </button>
    </div >
  )
}

export default SortingBlock;