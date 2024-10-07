const parseEnv = () => {
  const rss_env = process.env;
  const envVars = [];
  for (const key in rss_env) {
    if (key.startsWith('RSS_')) {
        envVars.push(`${key}=${rss_env[key]}`);
    }
  }
  const formatEnv = envVars.join('\n');
  return formatEnv;
};

console.log(parseEnv());
