import { prop, pick, where, contains, whereEq } from "ramda"


export type StoreHeader = {
  id: string,
  name: string,
  postalCodes: string[]
}
export type StoreData = StoreHeader & {
  quisine: string[],
  menu: MenuCategory[],
}
export type MenuCategory = {
  id: string,
  name: string,
  items: MenuItem[],
}
export type MenuItem = {
  id: string,
  name: string,
  price: string,
  options: (MenuItemOption[]) | (MenuItemOption[]),
}
export type MenuItemOptionGroup = {
  type: "group"
  name: string,
  options: MenuItemOption[],
}
export type MenuItemOption = MenuItemOptionToggle | MenuItemOptionChoice
export type MenuItemOptionToggle = {
  type: "toggle",
  id: string,
  name: string,
  price: string,
}
export type MenuItemOptionChoice = {
  type: "choice",
  id: string,
  name: string,
  options: { name: string, price: string }[],
}

// TODO: move to backend and stuff
const stores: StoreData[] = [1,2,3,4,5,6,7,8,9].flatMap(i => [
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

export const storeHeaders = (): Promise<StoreHeader[]> =>
  Promise.resolve(stores.map(pick(["id", "name", "postalCodes"])))

export const getAllStoreIds = (): Promise<string[]> => 
  Promise.resolve(stores.map(prop("id")))

export const getStoresForPostalCode = (postalCode: string): Promise<StoreHeader[]> =>
  Promise.resolve(stores.filter(where({ postalCodes: contains(postalCode) })))

export const getStoreData = async (id: string): Promise<StoreData> => {
  let store = stores.find(whereEq({ id }))
  return store
    ? Promise.resolve(store)
    : Promise.reject(`no store found with id ${id}`)
}