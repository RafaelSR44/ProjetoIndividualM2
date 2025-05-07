// Controlador da rota /
exports.index = (req, res) => {
  res.render('pages/home', {
    titulo: 'Página Inicial',
    mensagem: 'Bem-vindo a Arte Della Pizza!'
  });
};