const statusDecoder = (status) => {
  return status == 1
    ? 'Order placed'
    : status == 2
    ? 'Paid'
    : status == 3
    ? 'Out for delivery'
    : status == 4
    ? 'Order received'
    : status == 5
    ? 'Reviewed'
    : status == 6
    ? 'Cancel requested'
    : status == 7
    ? 'Cancel denied. You may try again'
    : status == 8
    ? 'Cancel denied permanently'
    : status == 9
    ? 'Cancel accepted. Refund pending'
    : status == 10
    ? 'Refunded'
    : status == 11
    ? 'Cancelled'
    : null;
};

export default statusDecoder;
