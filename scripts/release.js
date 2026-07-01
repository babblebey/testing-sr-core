import semanticRelease, { getLogger, resolveConfig, resolveEnvCi } from "@semantic-release/core";

const cwd = process.cwd();
const env = process.env;
const stdout = process.stdout;
const stderr = process.stderr;
const envCi = resolveEnvCi({ cwd, env });
const logger = getLogger({ stdout, stderr });

const context = {
  cwd,
  env,
  envCi,
  logger,
  stdout,
  stderr,
};
const runtimeOptions = {};

const { options } = await resolveConfig(context, runtimeOptions);

const result = await semanticRelease({
  context: { ...context, options },
  plugins: [
    "@semantic-release/release-notes-generator",
    "@semantic-release/github",
  ],
});