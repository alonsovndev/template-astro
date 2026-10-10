import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const secretHook = fileURLToPath(new URL("../.husky/check-secrets.sh", import.meta.url));
const messageHook = fileURLToPath(new URL("../.husky/commit-msg", import.meta.url));
function withFixture(action) {
  const directory = mkdtempSync(join(tmpdir(), "astro-hooks-"));
  try {
    action(directory);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}
function command(program, argumentsList, directory) {
  return spawnSync(program, argumentsList, { cwd: directory, encoding: "utf8" });
}
function scanStagedFile(directory, filename, contents) {
  assert.equal(command("git", ["init", "-b", "hook-test"], directory).status, 0);
  mkdirSync(join(directory, "nested"), { recursive: true });
  writeFileSync(join(directory, filename), contents);
  assert.equal(command("git", ["add", "--", filename], directory).status, 0);
  return command("bash", [secretHook], directory);
}

test("accepts conventional subjects and rejects invalid ones", () => {
  withFixture((directory) => {
    const message = join(directory, "message");
    for (const subject of [
      "feat(astro): add landing page",
      "fix!: correct rendering",
      "Merge branch example",
      "Revert previous change",
    ]) {
      writeFileSync(message, `${subject}\n`);
      assert.equal(command("sh", [messageHook, message], directory).status, 0, subject);
    }
    writeFileSync(message, "updated files\n");
    assert.equal(command("sh", [messageHook, message], directory).status, 1);
  });
});
test("allows example origins but blocks staged environment files", () => {
  withFixture((directory) => {
    assert.equal(
      scanStagedFile(directory, ".env.example", "SITE_URL=https://example.com\n").status,
      0
    );
  });
  for (const filename of [".env", "nested/.env.local"]) {
    withFixture((directory) => {
      const result = scanStagedFile(directory, filename, "SITE_URL=https://example.com\n");
      assert.equal(result.status, 1);
      assert.match(result.stderr, /Blocked file staged/);
    });
  }
});
test("rejects credential additions even in otherwise allowed files", () => {
  withFixture((directory) => {
    const result = scanStagedFile(
      directory,
      "settings.ts",
      "const api_key " + '= "example-sensitive-value";\n'
    );
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Possible secret/);
  });
});

test("rejects tracked files renamed to blocked destinations", () => {
  for (const destination of [".env.production", "credentials.json"]) {
    withFixture((directory) => {
      assert.equal(scanStagedFile(directory, "settings.txt", "harmless settings\n").status, 0);
      assert.equal(
        command(
          "git",
          [
            "-c",
            "user.name=Hook fixture",
            "-c",
            "user.email=fixture@example.invalid",
            "commit",
            "-m",
            "test: create fixture",
          ],
          directory
        ).status,
        0
      );
      assert.equal(command("git", ["mv", "settings.txt", destination], directory).status, 0);
      const result = command("bash", [secretHook], directory);
      assert.equal(result.status, 1);
      assert.match(result.stderr, /Blocked file staged/);
    });
  }
});

test("scans staged additions after their worktree file is removed", () => {
  withFixture((directory) => {
    const contents = "const api_key " + '= "example-sensitive-value";\n';
    assert.equal(scanStagedFile(directory, "settings.ts", contents).status, 1);
    rmSync(join(directory, "settings.ts"));
    const result = command("bash", [secretHook], directory);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Possible secret/);
  });
});
