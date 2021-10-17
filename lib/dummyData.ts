import { MenuCategoryId, MenuItemId, StoreData, StoreId } from "lib/types"
import { range } from "ramda"

// TODO: move to backend and stuff
export const stores: StoreData[] = range(0, 10).flatMap(i => [
  {
    id: `${i * 3}` as StoreId,
    name: `Pizzeria ${i}`,
    postalCodes: ["28203"],
    quisine: ["Pizza", "Pasta", "Italienisch"],
    menu: [
      {
        id: "1" as MenuCategoryId,
        name: "Pizza",
        items: [
          {
            id: "1" as MenuItemId,
            name: "Margarita",
            price: "6.50",
          },
          {
            id: "2" as MenuItemId,
            name: "Tonno",
            price: "7.50",
          },
          {
            id: "3" as MenuItemId,
            name: "Hawai",
            price: "999.99",
          },
          {
            id: "4" as MenuItemId,
            name: "Margarita",
            price: "6.50",
          },
          {
            id: "5" as MenuItemId,
            name: "Tonno",
            price: "7.50",
          },
          {
            id: "6" as MenuItemId,
            name: "Hawai",
            price: "999.99",
          },
        ]
      },
      {
        id: "2" as MenuCategoryId,
        name: "Pasta",
        items: [
          {
            id: "7" as MenuItemId,
            name: "Carbonara",
            price: "5",
          },
          {
            id: "8" as MenuItemId,
            name: "Aglio E Olio",
            price: "5",
          },
          {
            id: "9" as MenuItemId,
            name: "Carbonara",
            price: "5",
          },
          {
            id: "10" as MenuItemId,
            name: "Aglio E Olio",
            price: "5",
          },
          {
            id: "11" as MenuItemId,
            name: "Carbonara",
            price: "5",
          },
          {
            id: "12" as MenuItemId,
            name: "Aglio E Olio",
            price: "5",
          },
        ]
      },
      {
        id: "3" as MenuCategoryId,
        name: "Pasta",
        items: [
          {
            id: "7" as MenuItemId,
            name: "Carbonara",
            price: "5",
          },
          {
            id: "8" as MenuItemId,
            name: "Aglio E Olio",
            price: "5",
          },
          {
            id: "9" as MenuItemId,
            name: "Carbonara",
            price: "5",
          },
          {
            id: "10" as MenuItemId,
            name: "Aglio E Olio",
            price: "5",
          },
          {
            id: "11" as MenuItemId,
            name: "Carbonara",
            price: "5",
          },
          {
            id: "12" as MenuItemId,
            name: "Aglio E Olio",
            price: "5",
          },
        ]
      }
    ],
  },
  {
    id: `${i * 3 + 1}` as StoreId,
    name: `Asia Laden ${i}`,
    postalCodes: ["28203", "28204"],
    quisine: ["Asiatisch", "Chinesisch"],
    menu: [],
  },
  {
    id: `${i * 3 + 2}` as StoreId,
    name: `Burger ${i}`,
    postalCodes: ["28204"],
    quisine: ["Burger", "US Americanisch"],
    menu: [],
  },
])
