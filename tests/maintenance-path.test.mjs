import test from "node:test";
import assert from "node:assert/strict";
import { getSafeReturnPath } from "../src/lib/maintenance-path.ts";

test("keeps safe in-site return paths and canonical paths", () => {
  assert.equal(
    getSafeReturnPath("/news/example/?from=home#article"),
    "/news/example/?from=home#article",
  );
  assert.equal(getSafeReturnPath("/about/"), "/about/");
});

test("rejects external and URL-normalized backslash destinations", () => {
  assert.equal(getSafeReturnPath("//evil.example"), "/");
  assert.equal(getSafeReturnPath("https://evil.example/"), "/");
  assert.equal(getSafeReturnPath("/\\evil.example"), "/");
  assert.equal(getSafeReturnPath("/\\/evil.example"), "/");
});

test("does not return users to the maintenance page or its unlock API", () => {
  assert.equal(getSafeReturnPath("/maintenance"), "/");
  assert.equal(getSafeReturnPath("/maintenance/"), "/");
  assert.equal(getSafeReturnPath("/maintenance/?next=/about/"), "/");
  assert.equal(getSafeReturnPath("/api/maintenance/unlock/"), "/");
});
