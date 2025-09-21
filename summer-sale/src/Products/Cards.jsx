import Card from './Card';

const Cards = ({ itemsData, handleCartItems }) => {
  const { sectionTitle, products } = itemsData;

  return (
    <div className="mb-[32px] md:mb-[48px] lg:mb-[56px]">
      <h3 className="work-font font-semibold text-[26px] md:text-[32px] lg:text-[40px] text-[#111111]">
        {sectionTitle}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <Card
            key={product.id}
            product={product}
            handleCartItems={handleCartItems}
          ></Card>
        ))}
      </div>
    </div>
  );
};

export default Cards;
