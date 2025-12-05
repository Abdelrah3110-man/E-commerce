import { createContext, useState } from "react";
export const Cart = createContext("");
export default function CartChangerContext({ children }) {
  const [isChanged, setIsChanged] = useState(true);
  return (
    <Cart.Provider value={{ isChanged, setIsChanged }}>
      {children}
    </Cart.Provider>
  );
}
