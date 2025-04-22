const { execSync } = require("child_process");

try {
  console.log("Installing/overwriting aurora-text component...");
  execSync(
    'npx shadcn@latest add "https://v3.magicui.design/r/aurora-text" --overwrite',
    {
      stdio: "inherit",
    }
  );

  console.log("Installing/overwriting orbiting-circles component...");
  execSync(
    'npx shadcn@latest add "https://v3.magicui.design/r/orbiting-circles" --overwrite',
    { stdio: "inherit" }
  );

  console.log("Components installed (or overwritten) successfully!");
} catch (error) {
  console.error("Error installing/overwriting components:", error);
  process.exit(1);
}
