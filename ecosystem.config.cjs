module.exports = {
    apps: [
      {
        name: 'inehackathon-front',
        script: 'yarn',
        args: 'run start',
        env: {
          NODE_ENV: 'production',
          NITRO_PORT: 1339
        }
      }
    ]
}

  