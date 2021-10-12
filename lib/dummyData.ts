import { StoreData } from "lib/types"
import { range } from "ramda"

// TODO: move to backend and stuff
export const stores: StoreData[] = range(0, 10).flatMap(i => [
  {
    id: `${i * 3}`,
    name: `Pizzeria ${i}`,
    postalCodes: ["28203"],
    quisine: ["Pizza", "Pasta", "Italienisch"],
    menu: [
      {
        id: "1",
        name: "Pizza",
        items: [
          {
            id: "1",
            name: "Margarita",
            price: "6.50",
            options: [],
          },
          {
            id: "2",
            name: "Tonno",
            price: "7.50",
            options: [],
          },
          {
            id: "3",
            name: "Hawai",
            price: "999.99",
            options: [],
          },
          {
            id: "4",
            name: "Margarita",
            price: "6.50",
            options: [],
          },
          {
            id: "5",
            name: "Tonno",
            price: "7.50",
            options: [],
          },
          {
            id: "6",
            name: "Hawai",
            price: "999.99",
            options: [],
          },
        ]
      },
      {
        id: "2",
        name: "Pasta",
        items: [
          {
            id: "7",
            name: "Carbonara",
            price: "5",
            options: [],
          },
          {
            id: "8",
            name: "Aglio E Olio",
            price: "5",
            options: [],
          },
          {
            id: "9",
            name: "Carbonara",
            price: "5",
            options: [],
          },
          {
            id: "10",
            name: "Aglio E Olio",
            price: "5",
            options: [],
          },
          {
            id: "11",
            name: "Carbonara",
            price: "5",
            options: [],
          },
          {
            id: "12",
            name: "Aglio E Olio",
            price: "5",
            options: [],
          },
        ]
      }
    ],
  },
  {
    id: `${i * 3 + 1}`,
    name: `Asia Laden ${i}`,
    postalCodes: ["28203", "28204"],
    quisine: ["Asiatisch", "Chinesisch"],
    menu: [],
  },
  {
    id: `${i * 3 + 2}`,
    name: `Burger ${i}`,
    postalCodes: ["28204"],
    quisine: ["Burger", "US Americanisch"],
    menu: [],
  },
])
