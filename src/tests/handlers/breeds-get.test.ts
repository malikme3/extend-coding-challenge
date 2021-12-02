import fetch from "node-fetch";
import { GetBreedsResponse } from "../../domain/breed.domain";
import { getBreedsHandler } from "../../handlers/breeds.handler";
const context = require("aws-lambda-mock-context");

const mockedFetch: jest.Mock = fetch as any;
const ctx = context();
jest.mock("node-fetch");

describe("getBreedsHandler() lambda tests", () => {
  beforeEach(() => {});
  afterEach(() => {});

  it("should return success response   ", async () => {
    mockedFetch.mockReturnValueOnce({
      json: () => {
        return mockApiData;
      },
    });
    const { statusCode, body }: GetBreedsResponse = await getBreedsHandler(
      {},
      ctx,
      {} as any
    );
    expect(statusCode).toBe(200);
    expect(mockResponse).toMatchObject(body);
  });

  it("should return notFound response   ", async () => {
    mockedFetch.mockReturnValueOnce({
      json: () => {
        return [];
      },
    });
    const { statusCode }: GetBreedsResponse = await getBreedsHandler(
      {},
      ctx,
      {} as any
    );
    expect(statusCode).toBe(404);
  });
  it("should return server error response   ", async () => {
    mockedFetch.mockReturnValueOnce({
      json: () => {
        throw new Error("Server is down");
      },
    });
    const { statusCode, message }: GetBreedsResponse = await getBreedsHandler(
      {},
      ctx,
      {} as any
    );
    expect(statusCode).toBe(500);
    expect(message).toBe("request failed due to Error: Server is down");
  });
});

// mock data
const mockApiData = {
  message: {
    brabancon: [],
    briard: [],
    buhund: ["norwegian"],
    bulldog: ["boston", "english", "french"],
  },
  status: "success",
};

const mockResponse = {
  breeds: [
    "brabancon",
    "briard",
    "norwegian buhund",
    "boston bulldog",
    "english bulldog",
    "french bulldog",
  ],
};
