
const getAttributeTotal = ({ item }) => {
  let total = 0;
  item &&
    item.attributes &&
    item.attributes.forEach((att) => {
      att.options[0] &&
        att.options.forEach((opt) => {
          console.log(opt.option_price);
          total = total + opt.option_price * (opt.quantity ? opt.quantity : 0);
        });
    });
  console.log('setAttributeTotal', total);

  return total;
};

export default getAttributeTotal;
