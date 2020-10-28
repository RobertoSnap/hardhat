import type hardhat from "../lib/hardhat-lib";

import { ArgumentsParser } from "./ArgumentsParser";

interface CompletionEnv {
  line: string;
  words: number;
}

export async function complete(env: CompletionEnv): Promise<string[]> {
  let hre: typeof hardhat;
  try {
    hre = require("../lib/hardhat-lib");
  } catch (e) {
    return [];
  }

  if (env.words === 1) {
    const tasks = Object.values(hre.tasks)
      .map((x: any) => x.name)
      .filter((x: string) => !x.includes(":"));
    return tasks;
  }

  const words = env.line.split(/\s+/);

  const task = words[1];

  const flags = Object.values(hre.tasks[task].paramDefinitions)
    .map((x) => x.name)
    .map(ArgumentsParser.paramNameToCLA)
    .filter((x) => !words.includes(x));

  return flags;
}
