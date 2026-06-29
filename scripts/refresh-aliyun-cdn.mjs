import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import process from "node:process";
import Cdn20180510, * as CdnModels from "@alicloud/cdn20180510";
import OpenApi, * as OpenApiModels from "@alicloud/openapi-client";
import Util, * as UtilModels from "@alicloud/tea-util";

const ENV_FILES = [".env.local", ".env"];

for (const file of ENV_FILES) {
  loadEnvFile(resolve(process.cwd(), file));
}

const args = process.argv.slice(2);
const dryRun = takeFlag(args, "--dry-run");
const objectTypeFlag = takeOption(args, "--type");

const refreshTargets = normalizeTargets(
  args.length > 0 ? args : splitTargets(process.env.ALIYUN_CDN_REFRESH_PATHS)
);
const objectType = normalizeObjectType(
  objectTypeFlag ?? process.env.ALIYUN_CDN_REFRESH_TYPE ?? inferObjectType(refreshTargets)
);

if (refreshTargets.length === 0) {
  fail(
    [
      "No CDN refresh targets were provided.",
      "Pass URLs as arguments or set ALIYUN_CDN_REFRESH_PATHS in .env.local.",
      "Example: npm run refresh:cdn -- https://www.example.com/ https://www.example.com/news/",
    ].join("\n")
  );
}

if (!dryRun) {
  requireEnv("ALIYUN_ACCESS_KEY_ID");
  requireEnv("ALIYUN_ACCESS_KEY_SECRET");
}

console.log(`Aliyun CDN refresh type: ${objectType}`);
console.log("Aliyun CDN refresh targets:");
for (const target of refreshTargets) {
  console.log(`- ${target}`);
}

if (dryRun) {
  console.log("Dry run only. No refresh request was sent.");
  process.exit(0);
}

const client = createClient();
const request = new CdnModels.RefreshObjectCachesRequest({
  objectPath: refreshTargets.join("\n"),
  objectType,
});

try {
  const response = await client.refreshObjectCachesWithOptions(
    request,
    new UtilModels.RuntimeOptions({})
  );

  console.log("Aliyun CDN refresh submitted.");
  console.log(JSON.stringify(response.body ?? response, null, 2));
} catch (error) {
  console.error("Aliyun CDN refresh failed.");
  console.error(Util.default.assertAsString(error.message ?? String(error)));
  process.exit(1);
}

function createClient() {
  const config = new OpenApiModels.Config({
    accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
    accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
    endpoint: process.env.ALIYUN_CDN_ENDPOINT || "cdn.aliyuncs.com",
  });

  return new Cdn20180510(config);
}

function loadEnvFile(path) {
  if (!existsSync(path)) {
    return;
  }

  const content = readFileSync(path, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!match || process.env[match[1]] !== undefined) {
      continue;
    }

    process.env[match[1]] = stripQuotes(match[2].trim());
  }
}

function stripQuotes(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function takeFlag(values, flag) {
  const index = values.indexOf(flag);
  if (index === -1) {
    return false;
  }

  values.splice(index, 1);
  return true;
}

function takeOption(values, flag) {
  const index = values.indexOf(flag);
  if (index === -1) {
    return undefined;
  }

  const value = values[index + 1];
  values.splice(index, value === undefined ? 1 : 2);
  return value;
}

function splitTargets(value) {
  return value?.split(/[\n,]+/) ?? [];
}

function normalizeTargets(values) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function inferObjectType(targets) {
  return targets.length > 0 && targets.every((target) => target.endsWith("/"))
    ? "Directory"
    : "File";
}

function normalizeObjectType(value) {
  const normalized = value.toLowerCase();
  if (normalized === "file") {
    return "File";
  }
  if (normalized === "directory" || normalized === "dir") {
    return "Directory";
  }

  fail("Invalid CDN refresh type. Use File or Directory.");
}

function requireEnv(name) {
  if (!process.env[name]) {
    fail(`Missing required environment variable: ${name}`);
  }
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
