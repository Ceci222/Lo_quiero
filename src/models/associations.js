import User from './user.js';
import ObjectModel from './object.js';
import Pickup from './pickup.js';

User.hasMany(ObjectModel, { as: 'DonatedObjects', foreignKey: 'object_donor_id' });
User.hasMany(ObjectModel, { as: 'ReceivedObjects', foreignKey: 'object_recipient_id' });
ObjectModel.belongsTo(User, { as: 'Donor', foreignKey: 'object_donor_id' });
ObjectModel.belongsTo(User, { as: 'Recipient', foreignKey: 'object_recipient_id' });
ObjectModel.hasOne(Pickup, { as: 'Pickup', foreignKey: 'pickup_object_id' });
Pickup.belongsTo(ObjectModel, { foreignKey: 'pickup_object_id' });

export default { User, ObjectModel, Pickup };

