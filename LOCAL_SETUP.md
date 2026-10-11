# Local setup (macOS)

1. Install Node.js and pnpm.
2. Open this directory (the directory containing `pnpm-workspace.yaml`) in VS Code.
3. In the VS Code terminal, run:

   ```sh
   pnpm install --force
   ```

4. Start the portfolio:

   ```sh
   PORT=5173 BASE_PATH=/ pnpm --filter @workspace/devansh-portfolio run dev
   ```

5. Visit `http://localhost:5173`.

Keep the terminal running while viewing the site. Press `Ctrl+C` to stop it.

If pnpm updates `pnpm-lock.yaml` while installing, keep the updated lockfile with the project. Do not remove the `minimumReleaseAge: 1440` policy in `pnpm-workspace.yaml`.
