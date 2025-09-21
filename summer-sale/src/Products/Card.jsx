import React from 'react';

const Card = ({ product, handleCartItems }) => {
  const { title, price, image } = product;
  return (
    <div className="w-full h-auto bg-white p-5 shadow-md rounded-lg text-center">
      <div className="w-full h-[200px]  bg-[#1111110d] rounded-lg mb-5 flex justify-center items-center relative">
        <button
          onClick={() => {
            handleCartItems(product);
          }}
          className="bg-[#e527b240] w-[40px] h-[40px] absolute top-0 right-0 rounded-tr-lg cursor-pointer flex items-center justify-center"
        >
          <i
            className="bx bx-cart-plus font-bold text-2xl"
            style={{ color: '#E527B2' }}
          ></i>
        </button>
        <img
          className="w-auto h-auto"
          src={image || 'https://via.placeholder.com/150'}
          alt=""
        />
      </div>
      <div>
        <ul className="flex gap-2 justify-center items-center">
          <li>
            <i className="bx bxs-star" style={{ color: '#FFC107' }}></i>
          </li>
          <li>
            <i className="bx bxs-star" style={{ color: '#FFC107' }}></i>
          </li>
          <li>
            <i className="bx bxs-star" style={{ color: '#FFC107' }}></i>
          </li>
          <li>
            <i className="bx bx-star" style={{ color: '#FFC107' }}></i>
          </li>
          <li>
            <i className="bx bx-star" style={{ color: '#FFC107' }}></i>
          </li>
        </ul>
        <h4 className="work-font font-semibold text-[20px] text-[#111111]">
          {title}
        </h4>
        <h4 className="text-[#11111180] work-font text-xl font-normal">
          <span>{price}</span> Tk
        </h4>
      </div>
    </div>
  );
};

export default Card;
