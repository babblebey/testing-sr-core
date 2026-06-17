import semanticRelease, { getLogger, resolveConfig, resolveEnvCi } from "@semantic-release/core";

const cwd = process.cwd();
const env = process.env;
const stdout = process.stdout;
const stderr = process.stderr;
const envCi = resolveEnvCi({ cwd, env });
const logger = getLogger({ stdout, stderr });

Object.assign(env, {
  GIT_AUTHOR_NAME: "semantic-release-bot",
  GIT_AUTHOR_EMAIL: "semantic-release-bot@testing-sr-core.com",
  GIT_COMMITTER_NAME: "semantic-release-bot",
  GIT_COMMITTER_EMAIL: "semantic-release-bot@testing-sr-core.com",
  ...env,
  GIT_ASKPASS: "echo",
  GIT_TERMINAL_PROMPT: 0,
});

const context = {
  cwd,
  env,
  envCi,
  logger,
  stdout,
  stderr,
};
const runtimeOptions = {};

const { options, plugins } = await resolveConfig(context, runtimeOptions, {
  buildPlugins: true,
});

const result = await semanticRelease({
  context: { ...context, options },
  plugins,
});