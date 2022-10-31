const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('discussions', {
    discussion_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    discussion_text: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'discussions',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "discussion_id" },
        ]
      },
      {
        name: "discussion_text",
        type: "FULLTEXT",
        fields: [
          { name: "discussion_text" },
        ]
      },
    ]
  });
};
