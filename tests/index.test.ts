import axiosRoot from "axios";
import { describe, expect, test } from "@jest/globals";
import { axios } from "./test-data/axios";
import { users, coins, coinRates } from "./test-data/data";

describe("First Steps", () => {
  test("Expects server is running", async () => {
    const clean = await axios.get("/clean");
    expect(clean.status).toBe(200);
    expect(clean.data.message).toBe("Database cleaned");
    const response = await axios.get("/");
    const message = response.data.message;
    const version = response.data.version;
    expect(response.status).toBe(200);
    expect(message.constructor).toBe(String);
    expect(version.constructor).toBe(String);
  });
});

describe("User Routes", () => {
  test("Create coins", async () => {
    for (const coin of coins) {
      const response = await axios.post("/api/v1/createCoin", {
        input: coin,
      });
      expect(response.status).toBe(200);
      const { data } = response;
      expect(data.message).toBe("Coin created successfully");
      expect(data.coin.id).toBeDefined();
      expect(data.coin.name).toBe(coin.name);
    }
    for (const coinRate of coinRates) {
      try {
        const response = await axios.post("/api/v1/createCoinRate", {
          input: coinRate,
        });
        expect(response.status).toBe(200);
        const { data } = response;
        expect(data.message).toBe("Coin rate created successfully");
        expect(data.coinRate.id).toBeDefined();
      } catch (error) {
        if (axiosRoot.isAxiosError(error)) {
          console.log(error.response?.data);
          expect(error.response?.status).toBe(200);
        }
      }
    }
  });
  test("Create User", async () => {
    for (const user of users) {
      try {
        const response = await axios.post("/api/v1/createUser", {
          input: user,
        });
        expect(response.status).toBe(200);
        const { data } = response;
        expect(data).toBeDefined();
      } catch (error) {
        if (axiosRoot.isAxiosError(error)) {
          console.log(error.response?.data);
          expect(error.response?.status).toBe(200);
        }
      }
    }
  });
});
