const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Helpers
const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, phone, password, confirmPassword } = req.body;

    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório!" });
      return;
    }

    if (!email) {
      res.status(422).json({ message: "O email é obrigatório!" });
      return;
    }

    if (!phone) {
      res.status(422).json({ message: "O telefone é obrigatório!" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "O password é obrigatório!" });
      return;
    }

    if (!confirmPassword) {
      res
        .status(422)
        .json({ message: "A confirmação de senha é obrigatória!" });
      return;
    }

    if (password !== confirmPassword) {
      res
        .status(422)
        .json("A senha e a confirmação de senha precisam ser iguais!");
      return;
    }

    // Check if user exists
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(422).json({
        message: "Já existe um usuário cadastrado com esse email!",
      });
      return;
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      phone,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();
      await createUserToken(newUser, req, res);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    if (!email) {
      res.status(422).json({ message: "O email é obrigatório" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória" });
      return;
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(422)
        .json({ message: "Não há usuário cadastrado com esse email!" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      res.status(422).json({ message: "Senha inválida!" });
      return;
    }

    await createUserToken(user, req, res);
  }

  static async checkUser(req, res) {
    let currentUser;

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, "secret");
      const currentUser = await User.findById(decoded.id);

      if (currentUser) {
        currentUser.password = undefined;
        return res.status(200).send(currentUser);
      }
      currentUser = null;
      return res.status(404).send(currentUser);
    }
  }

  static async getUserById(req, res) {
    const id = req.params.id;

    // Check if user exists
    const user = await User.findById(id).select("-password");
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado!" });
      return;
    }

    res.status(200).json({ user });
    return;
  }
};
