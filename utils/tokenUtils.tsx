import { setCookie, getCookie, getCookies } from 'cookies-next';

export interface CartProductInterface {
  productId: number;
  productCount: number;
}

export interface CartCookieInterface {
  cartList: [CartProductInterface];
}

export const getCartCookies = (): { [key: number]: number } => {
  const result: { [key: number]: number } = {};
  const cartCookies = getCookies();
  const productIdList = Object.keys(cartCookies).filter(
    (elt) => Number(elt) <= 20
  );
  productIdList.forEach((productId) => {
    result[Number(productId)] = Number(getCookie(productId));
  });
  return result;
};

export const addCartCookie = (cartProduct: CartProductInterface) => {
  const { productId, productCount } = cartProduct;
  setCookie(productId.toString(), productCount.toString());
};
