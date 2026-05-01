import { expect, test } from "@playwright/test";
import { people } from "../../src/data/people";

test("home page exposes primary navigation", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("navigation")).toBeVisible();

  const menuButton = page.getByRole("button", { name: "Menü" });
  if (await menuButton.isVisible()) {
    await menuButton.click();
  }

  await expect(page.getByRole("link", { name: "Fahrer" })).toHaveAttribute(
    "href",
    "/fahrer",
  );
  await expect(page.getByRole("link", { name: "Geschichte" })).toHaveAttribute(
    "href",
    "/geschichte",
  );
});

test("driver listing links to working German profile pages", async ({
  page,
}) => {
  await page.goto("/fahrer");
  const firstPerson = people[0];

  await page
    .getByRole("link", { name: new RegExp(firstPerson.nickname) })
    .first()
    .click();
  await expect(page).toHaveURL(new RegExp(`/fahrer/${firstPerson.link}/?$`));
  await expect(
    page.getByRole("heading", { name: firstPerson.nickname }),
  ).toBeVisible();
});
