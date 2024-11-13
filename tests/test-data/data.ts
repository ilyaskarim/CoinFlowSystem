import { v4 as uuidv4 } from "uuid";

export const users = [
  {
    id: "b680a082-b999-4fed-871c-4a194b5710ad",
    application_user_id: "11231234567890",
    username: "user_1",
    email: "user_1@example.com",
  },
  {
    id: uuidv4(),
    username: "user_2",
    application_user_id: "131",
    email: "user_2@example.com",
  },
  {
    id: uuidv4(),
    username: "user_3",
    application_user_id: "167890",
    email: "user_3@example.com",
  },
  {
    id: uuidv4(),
    username: "user_4",
    application_user_id: "12345123167890",
    email: "user_4@example.com",
  },
  {
    id: uuidv4(),
    username: "user_5",
    application_user_id: "1231",
    email: "user_5@example.com",
  },
];

export const coins = [
  {
    id: uuidv4(),
    name: "UC",
  },
  {
    id: uuidv4(),
    name: "USDT",
  },
  {
    id: uuidv4(),
    name: "USDC",
  },
];

export const coinRates = [
  {
    id: uuidv4(),
    coin_one_id: "UC",
    coin_two_id: "USDT",
    rate: 1,
  },
  {
    id: uuidv4(),
    coin_one_id: "UC",
    coin_two_id: "USDC",
    rate: 2,
  },
];
