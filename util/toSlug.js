const toSlug = (text) => {
  return text
    // .toLowerCase()
    // .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

export default toSlug;
