import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];

function fail(message) {
  failures.push(message);
}

function readJson(file) {
  return JSON.parse(readFileSync(path.join(root, file), "utf8"));
}

function walk(dir) {
  return readdirSync(path.join(root, dir)).flatMap((entry) => {
    const rel = path.join(dir, entry);
    if (["node_modules", "dist", ".git"].some((part) => rel.includes(part))) {
      return [];
    }
    const full = path.join(root, rel);
    return statSync(full).isDirectory() ? walk(rel) : [rel];
  });
}

const pkg = readJson("package.json");
if (!pkg.packageManager?.startsWith("bun@")) {
  fail("package.json must declare Bun as the package manager.");
}

for (const script of [
  "build",
  "build:static",
  "typecheck",
  "lint",
  "test",
  "test:e2e",
]) {
  if (!pkg.scripts?.[script]) {
    fail(`package.json is missing the ${script} script.`);
  }
}

if (!existsSync(path.join(root, "src/pages/fahrer/[slug].astro"))) {
  fail("German driver profile route src/pages/fahrer/[slug].astro is missing.");
}

const sourceFiles = walk("src").filter((file) =>
  /\.(astro|ts|js|mjs)$/.test(file),
);
const checkedFiles = [...sourceFiles, "README.md", "AGENTS.md"].filter((file) =>
  existsSync(path.join(root, file)),
);

for (const file of checkedFiles) {
  const content = readFileSync(path.join(root, file), "utf8");
  if (
    content.includes("/assets/og-cover.jpg") ||
    content.includes('"/MxlLegacyBanner.jpg"')
  ) {
    fail(`${file} references a missing legacy banner path.`);
  }
}

for (const file of sourceFiles) {
  const content = readFileSync(path.join(root, file), "utf8");
  const matches = content.matchAll(/["'](\/(?:images\/|MxlLegacy)[^"']+)["']/g);
  for (const match of matches) {
    const asset = match[1];
    if (!existsSync(path.join(root, "public", asset))) {
      fail(`${file} references missing public asset ${asset}.`);
    }
  }
}

if (failures.length > 0) {
  console.error(failures.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}
