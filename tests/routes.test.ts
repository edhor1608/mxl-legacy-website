import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { people } from "../src/data/people";

describe("route contracts", () => {
  it("has a German canonical driver profile route", () => {
    expect(
      existsSync(path.join(process.cwd(), "src/pages/fahrer/[slug].astro")),
    ).toBe(true);
  });

  it("can generate a German profile URL for every person", () => {
    const urls = people.map((person) => `/fahrer/${person.link}`);
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls).toContain("/fahrer/matri-x");
  });
});
