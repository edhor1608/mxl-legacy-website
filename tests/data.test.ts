import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { people } from "../src/data/people";
import { phrases } from "../src/data/phrases";
import { SITE } from "../src/data/site";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function expectUnique(values: string[]) {
  expect(new Set(values).size).toBe(values.length);
}

function expectPublicAsset(asset: string) {
  expect(asset.startsWith("/")).toBe(true);
  expect(existsSync(path.join(process.cwd(), "public", asset))).toBe(true);
}

describe("data contracts", () => {
  it("keeps driver links unique and route-safe", () => {
    expectUnique(people.map((person) => person.link));
    for (const person of people) {
      expect(person.link).toMatch(slugPattern);
      expectPublicAsset(person.img);
    }
  });

  it("keeps phrase ids unique and route-safe", () => {
    expectUnique(phrases.map((phrase) => phrase.id));
    for (const phrase of phrases) {
      expect(phrase.id).toMatch(slugPattern);
    }
  });

  it("uses an existing default social image", () => {
    expectPublicAsset(SITE.defaultImage);
  });
});
