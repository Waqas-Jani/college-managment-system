module.exports = {
  extends: ["@commitlint/cli", "@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // feat: implement user profile page
        "fix", // fix: correct typo in user profile page
        "docs", // docs: add jsdoc to user profile page
        "style", // style: add css to user profile page
        "refactor", // refactor: extract user profile page to component
        "perf", // perf: improve user profile page load time
        "test", // test: add unit test for user profile page
        "build", // build: update webpack config
        "ci", // ci: add github actions
        "chore", // chore: update dependencies
        "revert" // revert: revert changes
      ]
    ],
    "subject-case": [2, "never", "sentence-case"]
  }
};
