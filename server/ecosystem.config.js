/**
 * PM2 Ecosystem Configuration File
 * This file is used to configure the PM2 process manager for Node.js applications.
 * It defines the application name, script to run, and environment variables.
 * PM2 is a production process manager for Node.js applications with a built-in load balancer.
 * It allows you to keep your applications alive forever, reload them without downtime, and facilitate common system admin tasks.
 */
module.exports = {
  apps: [
    {
      name: "inventory-management",
      script: "npm",
      args: "run dev",
      env: { NODE_ENV: "development", ENV_VAR1: "environment-variable" },
    },
  ],
};
