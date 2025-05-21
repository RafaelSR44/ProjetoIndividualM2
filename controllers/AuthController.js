const User = require('../models/User');

exports.loginForm = (req, res) => {
  res.render('auth/login', {
    title: 'Login',
    activePage: 'login',
    user: req.session.user
  });
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findByUsername(username);
    if (!user) {
      return res.render('auth/login', {
        title: 'Login',
        activePage: 'login',
        error: 'Usuário ou senha inválidos'
      });
    }

    const isValid = await User.verifyPassword(user, password);
    if (!isValid) {
      return res.render('auth/login', {
        title: 'Login',
        activePage: 'login',
        error: 'Usuário ou senha inválidos'
      });
    }

    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email
    };

    res.redirect('/');
  } catch (error) {
    console.error('Erro de login:', error);
    res.render('auth/login', {
      title: 'Login',
      activePage: 'login',
      error: 'Ocorreu um erro ao fazer login'
    });
  }
};

exports.registerForm = (req, res) => {
  res.render('auth/register', {
    title: 'Registro',
    activePage: 'register'
  });
};

exports.register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    
    if (password !== confirmPassword) {
      return res.render('auth/register', {
        title: 'Registro',
        activePage: 'register',
        error: 'As senhas não coincidem'
      });
    }

    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.render('auth/register', {
        title: 'Registro',
        activePage: 'register',
        error: 'Este nome de usuário já está em uso'
      });
    }

    const existingEmail = await User.findByEmail(email);
    if (existingEmail) {
      return res.render('auth/register', {
        title: 'Registro',
        activePage: 'register',
        error: 'Este email já está registrado'
      });
    }

    const user = await User.create(username, email, password);
    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email
    };

    res.redirect('/');
  } catch (error) {
    console.error('Erro de registro:', error);
    res.render('auth/register', {
      title: 'Registro',
      activePage: 'register',
      error: 'Ocorreu um erro ao registrar'
    });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};