const { User, Product, ImgProduct, Order, OrderDetail, Review, Category } = require("../models/Schema");
const { mutipleMongooseToObj } = require("../../until/mongoose");
const mongoose = require("../../until/mongoose");
const { mongooseToObj } = require("../../until/mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const express = require('express')
const session = require('express-session');

class AccountController {

  static accessToken(data) {
    return jwt.sign({
      id: data.id,
      username: data.username
    }, process.env.JWT_ACCESS_KEY, { expiresIn: '30s'})
  }

  static refreshToken(data) {
    return jwt.sign({
      id: data.id,
      username: data.username
    }, process.env.JWT_REFRESH_KEY, {expiresIn : '365d'})
  }

  // [GET] /auth/login
  login(req, res, next) {
    res.render('authentication/login')
  }

  // [POST] /auth/login
  async checklogin(req, res, next) {
    try {
      const data = await User.findOne({ accountname: req.body.username })
      if(data) {
        const comparePash = await bcrypt.compareSync(req.body.password, data.password)
        if(comparePash) {
          const accessToken =  'Bearer ' + AccountController.accessToken(data)
          const refreshToken = 'Bearer ' + AccountController.refreshToken(data)

          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict'
          })

          // Sử dụng destructing assignment để loại bỏ tạo 1 đối tượng mới k có trường password
          const {password, ...others} = data._doc
          // req.session.userId = data._id
          // req.session.username = data.Name;

          console.log(req.session)

          res.cookie("username", req.session.username, {
            httpOnly: false,
            secure: false,
            path: '/',
            sameSite: 'strict'
          });

          res.redirect('/')
        }
        else {
          res.json({ message: 'Mật khẩu không chính xác'})
        }
      }
    }
    catch(err) {
      console.log(err)
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // [GET] /auth/register
  register(req, res, next) {
    res.render('authentication/register')
  }

  // [POST] /auth/register
  async checkregister(req, res, next) {
    try {
      const check = await User.findOne({ username: req.body.username })
      if(check) {
        req.flash('error', 'Tài khoản đã tồn tại!');
        console.log(req.flash('error'));
        res.status(400).json({ message: 'Tài khoản đã tồn tại' });
      }
      else {
        const salt = bcrypt.genSaltSync(5);
        const hashPass = bcrypt.hashSync(req.body.password, salt);

        const newAccount = new User({
          Name: req.body.name,
          DOB: req.body.dob,
          Email: req.body.email,
          accountname: req.body.username,
          password: hashPass,
          Address: req.body.address,
          Phone: req.body.phone,
          Role: 2
        })

        newAccount.slug = newAccount._id.toString();

        const user = await newAccount.save();
        console.log(user);
        req.flash('success', 'Đăng ký thành công!');
        console.log(req.flash('success'));
        res.status(200).json({ message: 'Tạo tài khoản thành công' });
      }
    }
    catch(err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // [POST] /auth/refresh
  refresh(req, res, next) {
    const refreshToken = req.cookies.refreshtoken
    if(!refreshToken) return res.status(401).json({ message: 'You are not authenticated'})
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, data) => {
      if(err) {
        return res.status(403).json("Refresh token is not valid");
      }
      const newAccessToken = AccountController.accessToken(data)
      const newRefreshToken = AccountController.refreshToken(data)

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        path: '/',
        secure: false,
        sameSite: 'strict'
      })
      res.json({newAccessToken, newRefreshToken})
    })
  }

  logout(req, res, next) {
    res.clearCookie("username")
    res.clearCookie("refreshToken")
    res.redirect('/')
  }
}

module.exports = new AccountController;
