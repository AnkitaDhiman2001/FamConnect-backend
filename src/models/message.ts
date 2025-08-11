import { DataTypes, Model } from 'sequelize';
import sequelizeDb from '../db/database';

class Message extends Model {
  public id!: number;
  public user_id!: string;
  public room_id!: string;
  public content!: string;
  public readonly created_at!: Date;
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    room_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: sequelizeDb,
    modelName: 'Message',
    tableName: 'messages',
    timestamps: false,
  }
);

export default Message;
