import summer from '../../images/summer1.png';

const Banner = ({ discount, handleDiscountCoupon }) => {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between items-center container mx-auto px-[5%] md:px-0">
      <div className="max-w-11/12 md:max-w-1/2 w-full text-center">
        <p className="text-2xl md:text-[28px] lg:text-[32px] text-[#111111] font-medium work-font">
          ---SALE FEVER---
        </p>
        <h1 className="text-[32px] md:text-[48px] lg:text-[58px] text-[#111111] font-bold work-font pt-[26px] md:pt-[32px] lg:pt-[45px] pb-[48px] md:pb-[56px] lg:pb-[67px]">
          Purchase TK 5000 or above & get
          <span className="text-[#E527B2]"> 20% off</span>
        </h1>
        <div className="flex items-center justify-center gap-4">
          <div className="py-[14px]">
            <p className="text-lg md:text-[20px] lg:text-[24px] text-[#111111] font-medium work-font">
              Use Promo Code
            </p>
            <span
              className={`text-[12px] ]md:text-sm font-semibold work-font text-red-500 ${
                !discount ? 'hidden' : 'block'
              }`}
            >
              You can use 1 time
            </span>
          </div>
          <button
            disabled={!discount}
            onClick={() => {
              handleDiscountCoupon();
            }}
            className={`py-[12px] md:py-[14px] px-[20px] md:px-[25px] bg-[#E527B2] text-lg md:text-[20px] lg:text-[24px] text-white font-semibold work-font rounded-lg cursor-pointer disabled:bg-[#e527b24c] disabled:cursor-not-allowed`}
          >
            SELL5K
          </button>
        </div>
      </div>
      <div className="max-w-3/5 md:max-w-1/2 w-full h-full">
        <img className="w-full" src={summer} alt="" />
      </div>
    </div>
  );
};

export default Banner;
