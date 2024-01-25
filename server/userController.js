const bcrypt = require('bcryptjs');

const database = [
  {
    email: 'sallybonnet@yahoo.com',
    passwordHash: 'g16b3r!$h',
    destiny: 'becoming the new Santa'
  },
]

const destinies = [
  'become a well-respected bartender',
  'cure cancer',
  'become a bear whisperer',
  'become a hoarder',
  'become the lead in a high-budget film, filling in for Henry Cavill when he unexpectedly goes MIA',
  'summit Everest',
  'become the next Bruce Willis',
]

module.exports = {
  signup: (req, res) => {
    const { email, password } = req.body;
    let destiny = destinies[Math.floor(Math.random() * destinies.length)];

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);


    let newDataEntry = {
      email: email,
      passwordHash: passwordHash,
      destiny: destiny
    }
    console.log("New database entry: ", newDataEntry);
    database.push(newDataEntry);
    res.status(200).send({ success: true })
  },

  login: (req, res) => {
    console.log(database);
    const { email, password } = req.body;
    let userData;
    for (const user of database) {
      if (email === user.email) {
        userData = user;
        break;
      }
    }
    console.log(database);
    if (!userData) {
      res.status(200).send({ success: false, message: "Invalid email" })
    }
    else if (bcrypt.compareSync(password, userData.passwordHash)) {
      res.status(200).send({ success: true, destiny: userData.destiny });
    }
    else {
      res.status(200).send({ success: false, message: "Invalid password" })
    }
  }
}