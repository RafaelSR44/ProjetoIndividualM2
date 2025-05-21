exports.index = (req, res) => {
  res.render('pages/home', {
    titulo: 'Página Inicial',
    activePage: 'overview',
    user: req.session.user || null
  });
};