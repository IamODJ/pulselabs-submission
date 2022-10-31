module.exports = function(sequelize, DataTypes) {
  return sequelize.define('discussion_tags', {
    discussion_id_fk: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'discussions',
        key: 'discussion_id'
      }
    },
    tag_name_fk: {
      type: DataTypes.STRING(128),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'tags',
        key: 'tag_name'
      }
    }
  }, {
    sequelize,
    tableName: 'discussion_tags',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "discussion_id_fk" },
          { name: "tag_name_fk" },
        ]
      },
      {
        name: "tag_name_fk",
        using: "BTREE",
        fields: [
          { name: "tag_name_fk" },
        ]
      },
    ]
  });
};
