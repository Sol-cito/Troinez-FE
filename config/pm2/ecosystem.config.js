module.exports = {
  apps: [
    {
      name: "Troinez-FE",
      exec_mode: "fork",
      instances: 1,
      script: "node_modules/next/dist/bin/next",
      args: "start",
      env_local: {
        PORT: "3000",
        PROFILE: "local",
      },
      env_development: {
        PORT: "3000",
        PROFILE: "dev",
      },
      env_production: {
        PORT: "3000",
        PROFILE: "prod",
      },
    },
  ],
};
