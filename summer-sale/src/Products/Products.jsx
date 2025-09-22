import { use, useState, useEffect } from 'react';
import Cards from './Cards';
import congrats from '../../images/congo.png';

const Products = ({
  dataLoad,
  handleDiscount,
  discountCouponInput,
  setDiscountCouponInput,
  setDiscount,
}) => {
  let useData = use(dataLoad);
  const [cartItems, setCartItems] = useState([]);
  const [cartPurchase, setcartPurchase] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  const [discountTk, setDiscountTk] = useState(0);
  const [isApply, setApply] = useState(false);
  const [discountCartPrice, setDiscountCartPrice] = useState(0);
  let pay = cartPrice + discountCartPrice;

  const handleCartItems = product => {
    const newItem = {
      ...product,
      cartIdx: Math.random(),
    };
    let newCartItems = [...cartItems, newItem];
    setCartPrice(cartPrice + product.price);
    setCartItems(newCartItems);
    setApply(false);
  };

  useEffect(() => {
    if (cartPrice >= 5000) {
      handleDiscount(cartPrice);
    }
  }, [cartPrice]);

  let handleApplyCoupon = () => {
    let inputCoupon = document.getElementById('cupon-input');
    if (inputCoupon.value === 'SELL5K') {
      let totalPriceText = document.getElementById('total-price');
      let totalText = document.getElementById('total');
      let totalPrice = Number(totalPriceText.innerText);
      let discount20 = (totalPrice * 20) / 100;
      setDiscountTk(discount20);

      let discountTotal = totalPrice - discount20;
      setDiscountCartPrice(discountTotal);
      totalText.innerText = discountTotal;
      setCartPrice(0);
    }
    inputCoupon.value = '';
    setDiscountCouponInput(false);

    let removeItem = document.getElementsByClassName('remove-btn');
    for (let i of removeItem) {
      i.setAttribute('disabled', true);
      setApply(true);
    }
  };

  const makePurchase = id => {
    if (pay) {
      let purchaseProduct = document.getElementById(id);
      return purchaseProduct;
    }
  };

  const goHome = () => {
    let buyItems = document.getElementsByClassName('buy');
    for (let i of buyItems) {
      console.log(i.classList.add('text-green-500'));
    }

    let removeItem = document.getElementsByClassName('remove-btn');
    for (let i of removeItem) {
      i.setAttribute('disabled', true);
      setApply(true);
    }

    setCartPrice(0);
    setDiscountCartPrice(0);
    setDiscountTk(0);
  };

  const handleRemoveItems = cartId => {
    const updatedCart = cartItems.filter(item => item.cartIdx !== cartId);
    if (!isApply) {
      const findItem = cartItems.find(item => item.cartIdx == cartId);
      let findPrice = findItem.price;
      setCartPrice(cartPrice - findPrice);
      setCartItems(updatedCart);
    }
  };

  return (
    <div className="container mx-auto px-[5%] md:px-0 grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-9">
        {useData.map((item, idx) => (
          <Cards
            key={idx}
            itemsData={item}
            cartItems={cartItems}
            handleCartItems={handleCartItems}
            handleDiscount={handleDiscount}
          ></Cards>
        ))}
      </div>
      <div className="col-span-12 lg:col-span-3 mt-15 space-y-6">
        <div
          className={`bg-[#FFFFFF] p-6 rounded-lg shadow-sm ${
            !discountCouponInput && 'cursor-not-allowed'
          }`}
        >
          <h3
            className={`text-2xl font-medium work-font text-[#111111] ${
              !discountCouponInput && 'text-gray-300'
            }`}
          >
            Have coupon?
          </h3>
          <div className="join mt-4">
            <div>
              <label className="input input-secondary validator join-item font-medium work-font text-[#111111]">
                <input
                  disabled={!discountCouponInput}
                  type="text"
                  placeholder="Coupon code"
                  required
                  id="cupon-input"
                />
              </label>
            </div>
            <button
              onClick={handleApplyCoupon}
              disabled={!discountCouponInput}
              className="btn bg-[#E527B2] text-white join-item"
            >
              Apply
            </button>
          </div>
        </div>
        <div className="bg-[#FFFFFF] p-6 rounded-lg shadow-sm">
          <div id="cart-items">
            <ul>
              <h3
                id="items"
                className="work-font text-lg md:text-xl text-[#111111] font-bold mb-3"
              >
                Items: <span>{cartItems.length}</span>
              </h3>
              {cartItems.length > 0 ? (
                cartItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="work-font text-lg md:text-xl text-[#111111] font-medium flex justify-between items-center hover:shadow-lg transition-all p-3 buy"
                  >
                    <p>
                      {idx + 1}. {item.title}
                    </p>{' '}
                    <button
                      onClick={() => handleRemoveItems(item.cartIdx)}
                      className="text-sm hover:scale-130 transition-all cursor-pointer w-[24px] h-[24px] flex justify-center items-center text-[#E527B2] disabled:text-gray-300 disabled:scale-100 disabled:cursor-not-allowed remove-btn"
                    >
                      <i className="bx  bx-x font-bold text-2xl"></i>
                    </button>
                  </li>
                ))
              ) : (
                <li className="font-medium text-[#11111180] work-font text-base md:text-lg">
                  No Items Added...
                </li>
              )}
            </ul>
            <div className="border-b border-[#11111126] my-5"></div>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-[#111111] work-font text-lg md:text-xl">
              Total price:{' '}
              <span
                id="total-price"
                className="font-medium text-[#11111180] work-font text-lg md:text-xl"
              >
                {cartPrice}
              </span>
              <span className="font-medium text-[#11111180] work-font text-lg md:text-xl">
                Tk
              </span>
            </p>
            <p className="font-medium text-[#111111] work-font text-lg md:text-xl">
              Discount:{' '}
              <span
                id="discount-price"
                className="font-medium text-[#11111180] work-font text-lg md:text-xl"
              >
                {discountTk}
              </span>
              <span className="font-medium text-[#11111180] work-font text-lg md:text-xl">
                Tk
              </span>
            </p>
            <p className="font-medium text-[#111111] work-font text-lg md:text-xl">
              Pay: &nbsp;
              <span
                id="total"
                className="font-medium text-[#11111180] work-font text-lg md:text-xl"
              >
                {pay}
              </span>
              <span className="font-medium text-[#11111180] work-font text-lg md:text-xl">
                Tk
              </span>
            </p>
            <div className="border-b border-[#11111126] my-5"></div>
          </div>
        </div>
        <button
          disabled={!pay}
          onClick={() => makePurchase('purchase_product').showModal()}
          className="bg-[#E527B2] w-full text-white work-font font-semibold text-xl py-4 text-center rounded-lg cursor-pointer disabled:bg-[#e527b24c] disabled:cursor-not-allowed"
        >
          Make Purchase
        </button>
      </div>
      <dialog
        id="purchase_product"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <form method="dialog">
            <button className="bg-[#e527b240] w-[48px] h-[48px] absolute top-0 right-0 rounded-tr-lg cursor-pointer flex items-center justify-center">
              <i
                className="bx  bx-x font-bold text-2xl"
                style={{ color: '#E527B2' }}
              ></i>
            </button>
          </form>
          <div className=" m-4 flex flex-col justify-center items-center">
            <img
              className="max-w-[160px] max-h-[160px] w-full h-full"
              src={congrats}
              alt=""
            />
            <h2 className="work-font font-bold text-[26px] md:text-[32px] lg:text-[48px] text-[#111111]">
              Congratulations
            </h2>
            <p className="work-font font-normal text-[16px] md:text-[18px] lg:text-[20px] text-[#11111180]">
              Your Purchase {cartItems.length} product
            </p>

            <form method="dialog">
              <button
                onClick={goHome}
                className="mt-[40px] py-4 px-11 bg-[#E527B2] text-white work-font font-semibold text-[16px] md:text-[18px] lg:text-[20px] rounded-lg cursor-pointer"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Products;
