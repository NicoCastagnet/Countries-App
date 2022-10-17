import { React, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, postActivity } from '../../Redux/Actions';
import NavBarAct from '../NavBar/NavBar-Act';

import './newActivity.scss';

export const NewActivity = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const countries = useSelector((state) => state.countries);
  const allActivities = useSelector((state) => state.activities);
  const [errors, setErrors] = useState({});

  function validation(input) {
    let errors = {};
    let dur = Number(input.duration);

    if (!input.name) errors.name = 'Must provide a name.';
    else if (/[^A-Za-z ]+/g.test(input.name))
      errors.name = 'Name must have only letters.';
    else if (
      allActivities.find(
        (el) => el.name.toLowerCase() === input.name.toLowerCase()
      )
    )
      errors.name =
        'This activity already exists. Please use a different name.';

    if (!input.duration)
      errors.duration = 'Must provide a duration (01 to 24).';
    else if (dur <= 0 || dur > 24)
      errors.duration = 'Duration must be a number between 1 and 24.';

    if (!input.difficulty || input.difficulty.length === 0)
      errors.difficulty = 'Must provide a difficulty.';

    if (!input.season || input.season.length === 0)
      errors.season = 'Must provide a season.';

    if (!input.countries || input.countries.length === 0)
      errors.countries = 'Must provide at least one country.';

    if (
      input.url &&
      !input.url.match(
        /(http[s]*:\/\/)([a-z\-_0-9/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_/._~:?#[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png|gif)/i
      )
    ) {
      errors.url = 'Must provide a valid image URL.';
    }

    return errors;
  }

  const [input, setInput] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: '',
    url: '',
    countries: [],
  });

  useEffect(() => {
    dispatch(getCountries());

    if (validation(input)) {
      setErrors(validation(input));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validation({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setInput((estado) => {
      if (e.target.name === 'countries') {
        if (!input.countries.includes(e.target.value)) {
          return {
            ...estado,
            countries: [...estado.countries, e.target.value],
          };
        } else {
          return {
            ...estado,
            countries: [...estado.countries],
          };
        }
      } else {
        return {
          ...estado,
          [e.target.name]: e.target.value,
        };
      }
    });

    setErrors(
      validation({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !input.name ||
      !input.difficulty ||
      !input.duration ||
      !input.season ||
      !input.countries ||
      input.countries.length === 0
    ) {
      alert('Whoops! You must complete the form.');
    } else {
      dispatch(postActivity(input));
      alert('Yay! Activity created sucessfully.');

      setInput({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        url: '',
        countries: [],
      });
      history.push('/home');
    }
  }

  function handleDelete(e) {
    setInput({
      ...input,
      countries: input.countries.filter((con) => con !== e),
    });
  }
  return (
    <>
      <NavBarAct />
      <div className='newActivity__form-container'>
        <div className='newActivity__form'>
          <div className='newActivity__title'>Let's create a new activity!</div>
          <form onSubmit={handleSubmit}>
            <div className='newActivity__input-container ic1'>
              <input
                className='input'
                type='text'
                placeholder=' '
                value={input.name}
                name='name'
                id='name'
                onChange={(e) => handleChange(e)}
              />
              <p className='newActivity__input-error'>{errors.name}</p>
              <div className='cut cut-med'></div>
              <label
                htmlFor='act-name'
                className='placeholder'>
                Name
              </label>
            </div>
            <div className='newActivity__input-container ic2'>
              <input
                className='input'
                type='number'
                placeholder=' '
                min='1'
                max='24'
                value={input.duration}
                name='duration'
                id='duration'
                onChange={(e) => handleChange(e)}
              />
              {errors.duration && (
                <p className='newActivity__input-error'>{errors.duration}</p>
              )}
              <div className='cut cut-short'></div>
              <label
                htmlFor='duration'
                className='placeholder'>
                Duration
              </label>
            </div>
            <div className='newActivity__input-container ic2'>
              <input
                className='input'
                type='url'
                placeholder=' '
                value={input.url}
                name='url'
                id='url'
                onChange={(e) => handleChange(e)}
              />
              {errors.url && (
                <p className='newActivity__input-error'>{errors.url}</p>
              )}
              <div className='cut cut'></div>
              <label
                htmlFor='url'
                className='placeholder'>
                Image URL
              </label>
            </div>
            <div className='newActivity__input-container ic2'>
              <select
                defaultValue='dif'
                id='difficulty'
                name='difficulty'
                className='input'
                onChange={(e) => handleChange(e)}>
                <option
                  disabled
                  key={'dif'}
                  value={'dif'}>
                  Select an option below ↓
                </option>
                <option
                  key={'SA'}
                  value={'Super easy'}>
                  Super easy
                </option>
                <option
                  key={'E'}
                  value={'Easy'}>
                  Easy
                </option>
                <option
                  key={'N'}
                  value={'Normal'}>
                  Normal
                </option>
                <option
                  key={'H'}
                  value={'Hard'}>
                  Hard
                </option>
                <option
                  key={'UH'}
                  value={'Ultra Hard'}>
                  Ultra Hard
                </option>
              </select>
              {errors.difficulty && (
                <p className='newActivity__input-error'>{errors.difficulty}</p>
              )}
              <div className='cut cut-short'></div>
              <label
                htmlFor='difficulty'
                className='placeholder'>
                Difficulty
              </label>
            </div>
            <div className='newActivity__input-container ic2'>
              <select
                defaultValue='sea'
                name='season'
                id='season'
                className='input'
                onChange={(e) => handleChange(e)}>
                <option
                  key={'sea'}
                  disabled
                  value={'sea'}>
                  Select an option below ↓
                </option>
                <option
                  key={'W'}
                  value={'Winter'}>
                  Winter
                </option>
                <option
                  key={'A'}
                  value={'Autumn'}>
                  Autumn
                </option>
                <option
                  key={'S'}
                  value={'Summer'}>
                  Summer
                </option>
                <option
                  key={'SP'}
                  value={'Spring'}>
                  Spring
                </option>
              </select>
              {errors.season && (
                <p className='newActivity__input-error'>{errors.season}</p>
              )}
              <div className='cut cut-short'></div>
              <label
                htmlFor='season'
                className='placeholder'>
                Season
              </label>
            </div>
            <div className='newActivity__input-container ic2'>
              <select
                defaultValue='cc'
                id='countries'
                name='countries'
                className='input'
                onChange={(e) => handleSelect(e)}>
                <option
                  disabled
                  key={'cc'}
                  value={'cc'}>
                  Select an option below ↓
                </option>
                {countries.map((con) => (
                  <option
                    key={con.id}
                    value={con.id}>
                    {con.name}
                  </option>
                ))}
              </select>
              {errors.countries && (
                <p className='newActivity__input-error'>{errors.countries}</p>
              )}
              <div className='cut'></div>
              <label
                htmlFor='countries'
                className='placeholder'>
                Countries
              </label>
            </div>
            <button
              className='submit'
              type='submit'
              disabled={Object.keys(errors).length === 0 ? false : true}>
              Create activity
            </button>
          </form>
        </div>
        <div
          className={
            input.countries.length
              ? 'newActivity__selected-cc'
              : 'newActivity__none-selected'
          }>
          <p className='newActivity__selected-title'>Selected Countries</p>
          <div>
            {input.countries.map((e) => (
              <div
                key={e}
                className='newActivity__selected-container'>
                <p>{e}</p>
                <svg
                  onClick={() => handleDelete(e)}
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
