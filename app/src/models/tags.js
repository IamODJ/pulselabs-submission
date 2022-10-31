module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tags', {
    tag_name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'tags',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tag_name" },
        ]
      },
    ]
  });
};
