import {describe, expect, test} from '@jest/globals';
import { axios } from './test-data/axios';

describe('First Steps', () => {
  test('Expects server is running', async () => {
    const response = await axios.get("/");
    const message = response.data.message;
    const version = response.data.version;
    expect(response.status).toBe(200);
    expect(message.constructor).toBe(String);
    expect(version.constructor).toBe(String);
  });
});