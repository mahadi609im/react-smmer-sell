import { Suspense, useState } from 'react';
import Banner from './Banner/Banner';
import Products from './Products/Products';
import { Bounce, ToastContainer } from 'react-toastify';

const App = () => {
  let dataLoad = fetch('../data.json').then(res => res.json());
  const [discount, setDiscount] = useState(false);
  const [countDiscount, setCountDiscount] = useState(0);
  const [discountCouponInput, setDiscountCouponInput] = useState(false);
  const handleDiscount = price => {
    if (price >= 5000) {
      if (!countDiscount) {
        setDiscount(true);
      }
      setCountDiscount(1);
    }
  };

  const handleDiscountCoupon = () => {
    let inputCoupon = document.getElementById('cupon-input');
    inputCoupon.value = 'SELL5K';
    setDiscountCouponInput(true);
    setDiscount(false);
  };

  return (
    <div>
      <section className="py-[48px] md:py-[82px] bg-[#F9F6E2]">
        <Banner
          discount={discount}
          handleDiscountCoupon={handleDiscountCoupon}
        ></Banner>
      </section>
      <section
        id="card"
        className=" bg-[#f8f8f8] py-[56px] md:py-[74px] lg:py-[120px]"
      >
        <Suspense
          fallback={
            <div className="text-center font-semibold text-[#E527B2]">
              <span className="loading loading-spinner loading-xl"></span>
            </div>
          }
        >
          <Products
            handleDiscount={handleDiscount}
            dataLoad={dataLoad}
            discountCouponInput={discountCouponInput}
            setDiscountCouponInput={setDiscountCouponInput}
            setDiscount={setDiscount}
            discount={discount}
          ></Products>
        </Suspense>
      </section>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default App;
