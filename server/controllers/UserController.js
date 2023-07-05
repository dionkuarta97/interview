const { User, Detail } = require("../models");
const { createToken } = require("../helpers/jwt");
const { compare } = require("../helpers/bcrypt");
const sendEmail = require("../helpers/sendEmail");
const upload = require("../helpers/uploadImg");

class UserController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const result = await User.create({
        name,
        email,
        password,
      });
      res.status(201).json({ id: result.id, email: result.email });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "email required" };
      const checkUser = await User.findOne({ where: { email } });
      if (!checkUser || !compare(password, checkUser.password)) {
        throw { name: "invalid login" };
      } else {
        const payload = {
          id: checkUser.id,
          name: checkUser.name,
          email: checkUser.email,
        };
        const token = createToken(payload);
        res.status(200).json({ access_token: token, role: checkUser.role });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async getUser(req, res, next) {
    try {
      const user = req.user;
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  static async checkEmail(req, res, next) {
    try {
      const { email } = req.body;
      if (!email) throw { name: "email required" };
      const checkUser = await User.findOne({ where: { email } });
      if (!checkUser) throw { name: "not found" };

      sendEmail(checkUser.email, checkUser.password);
      res.status(200).json({ msg: "cek email" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async forgetPassword(req, res, next) {
    try {
      const { email, password, token } = req.body;
      const checkUser = await User.findOne({ where: { email } });
      if (checkUser.password !== token) {
        throw { name: "token salah" };
      } else {
        const user = await User.update(
          {
            password,
          },
          {
            where: { email: email },
            individualHooks: true,
          }
        );
        res.status(200).json({ msg: "password berhasil di perbarui" });
      }
    } catch (err) {
      next(err);
    }
  }

  static async uploadProfile(req, res, next) {
    try {
      const { id } = req.user;
      const imgUrl = await upload(req.file);

      const user = await User.update(
        {
          photo: imgUrl,
        },
        {
          where: { id: id },
        }
      );
      res.status(200).json({ msg: "foto profile berhasil di perbarui" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async changePassword(req, res, next) {
    try {
      const { id } = req.user;
      const { oldPassword, newPassword } = req.body;
      const user = await User.findByPk(id);
      if (!compare(oldPassword, user.password)) {
        throw { name: "password salah" };
      } else {
        const gantiPassword = await User.update(
          {
            password: newPassword,
          },
          {
            where: { id: id },
            individualHooks: true,
          }
        );

        res.status(200).json({ msg: "password ada sudah diganti" });
      }
    } catch (err) {
      next(err);
    }
  }

  static async submitGameData(req, res, next) {
    try {
      const { gameId, userId } = req.params;
      const { exp, coin } = req.body;
      const detail = await Detail.findOne({ where: { userId, gameId } });
      if (!detail) throw { name: "not found" };
      const updateExpCoin = await Detail.update(
        {
          exp: exp + detail.exp,
          coin: coin + detail.coin,
        },
        {
          where: { id: detail.id },
        }
      );
      res.status(200).json({ msg: "exp dan coin berhasil di perbarui" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
