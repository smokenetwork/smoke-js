const smoke = require('../lib');

/* Generate private active WIF */
const username = process.env.SMOKE_USERNAME;
const password = process.env.SMOKE_PASSWORD;
const privActiveWif = smoke.auth.toWif(username, password, 'active');

/** Add posting key auth */
smoke.broadcast.addKeyAuth({
    signingKey: privActiveWif,
    username,
    authorizedKey: 'SMK88CPfhCmeEzCnvC1Cjc3DNd1DTjkMcmihih8SSxmm4LBqRq5Y9',
    role: 'posting',
  },
  (err, result) => {
    console.log(err, result);
  }
);
