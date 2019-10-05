const Spot = require('../models/Spot');
const User = require('../models/Users');

module.exports = {
  async index(req, res) {
    const { tecnologia } = req.query;

    const spots = await Spot.find({ tecnologias: tecnologia });

    return res.json(spots);
  },

  async store(req, res) {
    const { filename } = req.file;
    const { empresa, preco, tecnologias } = req.body;
    const { usuario_id } = req.headers;

    const user = await User.findById(usuario_id);

    if (!user) {
      return res.status(400).json({ erro: 'Usuário não existe' });
    }

    const spot = await Spot.create({
      user: usuario_id,
      imagem: filename,
      empresa,
      preco,
      tecnologias: tecnologias.split(',').map(tecnologias => tecnologias.trim())
    });

    return res.json({ spot });
  }
}