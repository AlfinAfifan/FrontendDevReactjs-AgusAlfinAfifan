import { CheckCircleIcon, ChevronRightIcon, ClockIcon, MapPinIcon, StarIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const DetailPage = () => {
  // Get Detail Id
  const { id } = useParams();

  // Get Detail Data
  const [detailResto, setDetailResto] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`https://restaurant-api.dicoding.dev/detail/${id}`);
        setDetailResto(res.data.restaurant);
      } catch (error) {
        console.log('Error get detail data', error);
      }
    };

    fetchDetail();
  }, []);

  return (
    <div className="px-32 py-12">
      <div className="grid grid-cols-2 gap-x-20 gap-y-7">
        <div className="flex gap-1 items-center font-medium text-blue-800">
          <Link to="/" className="flex items-center gap-1">
            Home <ChevronRightIcon className="h-4 mt-0.5" />
          </Link>
          <Link> {detailResto?.name} </Link>
        </div>
        {/* Left Column */}
        <div className="flex flex-col col-start-1">
          <img src={detailResto ? `https://restaurant-api.dicoding.dev/images/medium/${detailResto?.pictureId}` : ''} alt="" className="rounded-lg shadow-lg" />
          <h1 className="text-5xl font-bold mt-5">{detailResto?.name}</h1>
          <div className="flex justify-between items-center gap-1 mt-4 text-gray-600">
            <div className="flex items-center gap-2">
              Category:
              {detailResto?.categories.map((category, idx) => (
                <h5 key={idx}>{category.name}</h5>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <StarIcon className="h-4" />
              <h5>{detailResto?.rating} / 5</h5>
            </div>
          </div>
          <div className="flex gap-1 items-center mt-4 font-medium">
            <MapPinIcon className="h-5" />
            <h5>{`${detailResto?.city},`}</h5>
            <h5>{detailResto?.address}</h5>
          </div>

          <Link to="/home" className="btn bg-blue-900 hover:bg-blue-700 text-white mt-10">
            Go Back
          </Link>
        </div>
        {/* End Left Column */}

        {/* Right Column */}
        <div className="flex flex-col">
          {/* Description */}
          <h1 className="text-2xl font-bold">Description</h1>
          <p className="mt-3 text-justify">{detailResto?.description}</p>

          {/* Food Menu */}
          <h1 className="text-2xl font-bold mt-8">Food Menu</h1>
          <div className="grid grid-cols-3 mt-3 gap-3">
            {detailResto?.menus.foods.map((food, idx) => (
              <h5 className="flex items-center gap-1" key={idx}>
                <CheckCircleIcon className="h-5" />
                {food.name}
              </h5>
            ))}
          </div>

          {/* Drink Menu */}
          <h1 className="text-2xl font-bold mt-8">Drink Menu</h1>
          <div className="grid grid-cols-3 mt-3 gap-3">
            {detailResto?.menus.drinks.map((drink, idx) => (
              <h5 className="flex items-center gap-1" key={idx}>
                <CheckCircleIcon className="h-5" />
                {drink.name}
              </h5>
            ))}
          </div>

          <div className="w-full h-0.5 rounded-full mt-5 bg-gray-300"></div>

          {/* Customer Review */}
          <h1 className="text-lg font-semibold mt-10">Customer Review</h1>
          {detailResto?.customerReviews.map((review, idx) => (
            <div className="flex flex-col mt-3 py-3 shadow" key={idx}>
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-bold">{review.name}</h1>
                <h1 className="text-gray-500 text-sm flex gap-1 items-center">
                  <ClockIcon className="h-4 mt-0.5" />
                  {review.date}
                </h1>
              </div>
              <p className="mt-2">{review.review}</p>
            </div>
          ))}
        </div>
        {/* End Right Column */}
      </div>
    </div>
  );
};

export default DetailPage;
