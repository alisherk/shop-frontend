const CART_KEY = 'art';
const TOKEN_KEY = 'jwt';
const STATE_KEY = 'state';

export const calculatePrice = arr => {
  return `$${arr
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2)}`;
};

export const calculateAmount = arr => {
  return Number(arr.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2));
};

//persist cart data
export const setCart = (value, cartKey = CART_KEY) => {
  if (localStorage) {
    localStorage.setItem(cartKey, JSON.stringify(value));
  }
};

export const getCart = (cartKey = CART_KEY) => {
  if (localStorage && localStorage.getItem(cartKey)) {
    return JSON.parse(localStorage.getItem(cartKey));
  }
  return [];
};

export const clearCart = (cartKey = CART_KEY) => {
  if (localStorage) {
    localStorage.removeItem(cartKey);
  }
};

export const getToken = (tokenKey = TOKEN_KEY) => {
  if (localStorage && localStorage.getItem(tokenKey)) {
    return JSON.parse(localStorage.getItem(tokenKey));
  }
  return null;
};

export const setToken = (value, tokenKey = TOKEN_KEY) => {
  if (localStorage) {
    localStorage.setItem(tokenKey, JSON.stringify(value));
  }
};

export const clearToken = (tokenKey = TOKEN_KEY) => {
  if (localStorage) {
    localStorage.removeItem(tokenKey);
  }
};

export const storeState = (value, tokenKey = STATE_KEY) => {
  if (localStorage) {
    localStorage.setItem(tokenKey, JSON.stringify(value)); 
  }
}

export const getState = (tokenKey = STATE_KEY ) => {
  if (localStorage && localStorage.getItem(tokenKey)) {
    return JSON.parse(localStorage.getItem(tokenKey));
  }
  return null;
}

export const clearState = (tokenKey = STATE_KEY) => {
  if (localStorage) {
    localStorage.removeItem(tokenKey); 
  }
}

export const validatePasswordStrength = password => {
  const reg = /(?=.*[\d])(?=.*[A-Z])[A-Za-z\d]{6,}$/;
  return reg.test(password);
};


