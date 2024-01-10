import React from 'react';
import { useNavigate } from 'react-router-dom';
import notFound from '../assets/img/not-found.jpg';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-[#fdfbff] flex items-center justify-center">
      <div className="flex flex-col justify-center gap-24">
        <div className="flex flex-col items-center gap-4">
          <img src={notFound} alt="not-found-img" className="w-64" />
          <div className="w-[290px] h-[96px] flex flex-col text-center gap-3">
            <h1 className="font-face-ro font text-4xl">Page 404 Not Found</h1>
            <p className="font-face-ro text-base">Halaman tidak ditemukan. Kamu bisa kembali ke halaman sebelumnya</p>
          </div>
        </div>
        <button className="btn btn-primary w-[360px]  h-[50px] rounded-2xl" onClick={() => navigate(-1)}>
          Get Back
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
