import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Search = () => {
   const navigate = useNavigate();
   const [keyword , setKeyword ] = useState('');
   const submitHandler = e => {
      e.preventDefault();
      navigate(`/products/search/${keyword.trim()}`)
   }

   return (
      <div className='searchBox w-full min-h-100 flex items-center justify-center '>
         <form onSubmit={submitHandler}>
            <input type='text' value={keyword} 
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Search Products'
            required
            />
            <button type='submit'>Search</button>
         </form>
      </div>
   )
}

export default Search