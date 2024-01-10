import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronDownIcon, MapPinIcon, StarIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const HomePage = () => {
  // Get All Data
  const [allResto, setAllResto] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://restaurant-api.dicoding.dev/list');
        setAllResto(res.data.restaurants);
      } catch (error) {
        console.log('Error get data', error);
      }
    };

    fetchData();
  }, []);

  // Dropdown Filter Location
  const getLocation = new Set(allResto?.map((data) => data.city));
  const location = Array.from(getLocation);

  // Filter Open Now
  const [checked, setChecked] = useState(false);
  const [selectLoc, setSelectLoc] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  // Filter Rating
  const [minRating, setMinRating] = useState(null);
  const [maxRating, setMaxRating] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);

  const handleRatingFilter = (value) => {
    if (value === '1 - 2') {
      setMinRating(1);
      setMaxRating(2);
    } else if (value === '2 - 3') {
      setMinRating(2);
      setMaxRating(3);
    } else if (value === '3 - 4') {
      setMinRating(3);
      setMaxRating(4);
    } else if (value === '4 - 5') {
      setMinRating(4);
      setMaxRating(5);
    }

    setSelectedRating(value);
  };

  // Search
  const [inputSearch, setInputSearch] = useState('');
  const [dataSearch, setDataSearch] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    const res = await axios.get(`https://restaurant-api.dicoding.dev//search?q=${inputSearch}`);
    setDataSearch(res.data.restaurants);
  };

  // Logic Data Final
  useEffect(() => {
    const updateFilteredData = () => {
      let result = dataSearch ? dataSearch : allResto;

      if (checked) {
        result = result.slice(10, 20);
      }
      if (selectLoc) {
        result = result.filter((data) => data.city === selectLoc);
      }
      if (minRating !== null) {
        result = result.filter((data) => data.rating >= minRating && data.rating <= maxRating);
      }

      setFilteredData(result);
    };

    updateFilteredData();
  }, [checked, selectLoc, allResto, dataSearch, minRating, maxRating]);

  const [showData, setShowData] = useState(12);

  // Handle Clear Filter
  const handleResetFilter = () => {
    setChecked(null);
    setSelectLoc(null);
    setInputSearch('');
    setDataSearch(null);
    setMinRating(null);
    setMaxRating(null);
    setSelectedRating(null);
  };

  return (
    <div>
      {/* Filter */}
      <div className="px-20 h-20 w-full shadow-lg flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center gap-7 w-full">
            <h1>Filter By :</h1>

            {/* Open Now */}
            <div className="open flex items-center gap-2">
              <input id="open" type="checkbox" checked={checked ? checked : false} className="checkbox border-gray-800" onChange={() => setChecked(!checked)} />
              <label htmlFor="open" className="font-semibold text-base">
                Open Now
              </label>
            </div>

            {/* Filter Rating */}
            <select className="select select-sm select-bordered font-semibold text-base border-gray-800" value={selectedRating ? selectedRating : 'rating'} onChange={(e) => handleRatingFilter(e.target.value)}>
              <option disabled value="rating">
                Rating
              </option>
              <option value="1 - 2">1 - 2</option>
              <option value="2 - 3">2 - 3</option>
              <option value="3 - 4">3 - 4</option>
              <option value="4 - 5">4 - 5</option>
            </select>

            {/* Filter Location */}
            <select className="select select-sm select-bordered font-semibold text-base border-gray-800" value={selectLoc ? selectLoc : 'location'} onChange={(e) => setSelectLoc(e.target.value)}>
              <option disabled value="location">
                Location
              </option>

              {location.map((loc, idx) => (
                <option value={loc} key={idx}>
                  {loc}
                </option>
              ))}
            </select>

            {/* Clear Filter */}
            <button className="btn btn-sm bg-gray-300" onClick={handleResetFilter}>
              Clear Filter
            </button>
          </div>
        </div>

        {/* Search */}
        <form className="flex items-center w-64" onSubmit={handleSearch}>
          <input type="text" placeholder="Type restaurant name" className="input input-sm input-bordered border-gray-800 w-full rounded-r-none" value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} />
          <button type="submit" className="btn btn-sm rounded-l-none bg-gray-800 border-gray-800 hover:bg-gray-700 hover:border-gray-700 text-white">
            Search
          </button>
        </form>
      </div>
      {/* End Filter */}

      {/* Page */}
      <div className="my-10 px-20">
        <h1 className="text-2xl">All Restaurants</h1>

        {/* Card */}
        <div className="grid grid-cols-4 gap-x-8 gap-y-14 mt-6">
          {filteredData?.slice(0, showData).map((data, idx) => (
            <div className="card card-compact w-full bg-base-100 shadow-xl" key={idx}>
              <figure className="h-40">
                <img src={`https://restaurant-api.dicoding.dev/images/medium/${data.pictureId}`} alt="Shoes" className="object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{data.name}</h2>

                {/* Rating & Location */}
                <div className="flex items-center justify-between text-base text-gray-600">
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-5 " />
                    <h5 className="">{data.rating} / 5</h5>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="h-5 " />
                    <h5 className="">{data.city}</h5>
                  </div>
                </div>
                {/* End Rating & Location */}

                <div className="card-actions mt-5">
                  <Link to={`/detail/${data.id}`} className="btn btn-sm w-full bg-blue-900 hover:bg-blue-700 text-white">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* End Card */}
      </div>

      {/* Pagination */}
      {showData < filteredData?.length && (
        <div className="flex justify-center flex-col font-medium mb-10 mt-16 text-blue-900" onClick={() => setShowData(showData + 12)}>
          <button className="w-fit mx-auto flex flex-col items-center justify-center">
            Load More
            <ChevronDownIcon className="h-5 -mt-1 text-blue-900" />
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
