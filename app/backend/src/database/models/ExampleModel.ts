import { Model } from 'sequelize';
import db from '.';

class Example extends Model {
}

Example.init({
}, {
  underscored: true,
  sequelize: db,
  // modelName: 'example',
  timestamps: false,
});

/**
 * `Обходной путь` для применения ассоциаций в TypeScript:
 * Ассоциации 1:N должны находиться в одном из экземпляров модели
 */


export default Example;
