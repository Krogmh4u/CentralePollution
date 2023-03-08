const db = require("../models");
const Entries = db.entries;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  //Validate request
  if (!req.body.type) {
    res.status(400).send({
      message: "Le contenu ne peut pas être vide!"
    });
    return;
  }

  const entry = {
    type: req.body.type,
    value: req.body.value,
  };

  Entries.create(entry)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue lors de la creation de l\'entrée."
      });
    });
};

exports.findAll = (req, res) => {
  const type = req.query.type;
  var condition = type ? { type: { [Op.like]: `%${type}%` } } : null;

  Entries.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue lors de la récéption des entrées."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Entries.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Impossible de trouver une entrée ayant pour id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur en essayant de trouver une entrée ayant pour id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Entries.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Entrée mise à jour avec succès."
        });
      } else {
        res.send({
          message: `Impossible de mettre à jour l'entrée ayant pour id=${id}. Peut être 'Entry' n'a pas été trouvée ou req.body est vide!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur en essayant de mettre à jour l'entrée ayant pour id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Entries.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Entrée supprimée avec succès!"
        });
      } else {
        res.send({
          message: `Impossible de supprimer l'entrée avec l'id=${id}. Peut être 'Entry' n'a pas été trouvée!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de supprimée l'entrée avec l'id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Entries.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Les entrées ont été supprimées avec succès` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue en tentant de supprimer les entrées."
      });
    });
};

exports.findAllCO2 = (req, res) => {
  Entries.findAll({ where: { type: "CO2" } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur est survenue en tentant de récupérer le contenu de la table."
      });
    });
};
