import tabtab from "@pnpm/tabtab";
import { spawnSync } from "child_process";
import { complete } from "hardhat/internal/cli/autocomplete";

export async function main() {
  const cmd = process.argv[2];

  if (cmd === "install-completion") {
    await tabtab
      .install({
        name: "hh",
        completer: "hh",
      })
      .catch((err: any) => {
        console.error("INSTALL ERROR", err); // TODO
      });

    return;
  }

  if (cmd === "uninstall-completion") {
    await tabtab
      .uninstall({
        name: "hh",
      })
      .catch((err: any) => console.error("UNINSTALL ERROR", err)); // TODO

    return;
  }

  if (cmd === "completion") {
    const env = tabtab.parseEnv(process.env);
    const suggestions = await complete(env);
    return tabtab.log(suggestions);
  }

  spawnSync("npx", ["hardhat", ...process.argv.slice(2)], {
    stdio: "inherit",
  });
}
