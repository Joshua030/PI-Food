import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getRecipesByQueryName } from '../store/actions/actions';

export const Recipe = () => {
  const filterByQuery = useSelector((state) => state.filterByQuery);
  const location = useLocation();
  const q = location.search.split('=')[1];
  console.log(q)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecipesByQueryName(q));
  }, [q]);
  return (
    <div>
        {filterByQuery?.map(({title,id}) => (
          <li key={id}>{title}</li>
        ))}
      </div>
  )
}
