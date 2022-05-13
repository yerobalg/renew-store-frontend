const formatPrice = (price) =>
  `Rp${price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".")}`;

export { formatPrice };
