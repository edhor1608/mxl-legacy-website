import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const failures = [];

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

function targetExists(urlPath) {
  const cleanPath = decodeURI(urlPath.split("#")[0].split("?")[0]);
  if (!cleanPath || cleanPath === "/") {
    return existsSync(path.join(dist, "index.html"));
  }

  const target = path.join(dist, cleanPath);
  if (existsSync(target) && statSync(target).isFile()) {
    return true;
  }
  if (existsSync(path.join(target, "index.html"))) {
    return true;
  }

  return false;
}

if (!existsSync(dist)) {
  failures.push("dist/ does not exist. Run the static build first.");
} else {
  const htmlFiles = walk(dist).filter((file) => file.endsWith(".html"));

  for (const file of htmlFiles) {
    const html = readFileSync(file, "utf8");
    const refs = html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g);

    for (const [, rawRef] of refs) {
      if (/^(https?:|mailto:|tel:|data:|#)/.test(rawRef)) {
        continue;
      }

      const ref = rawRef.startsWith("/")
        ? rawRef
        : `/${path.posix.join(path.posix.dirname(path.relative(dist, file)), rawRef)}`;

      if (!targetExists(ref)) {
        failures.push(
          `${path.relative(root, file)} references missing ${rawRef}.`,
        );
      }
    }
  }
}

if (failures.length > 0) {
  console.error(failures.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}
