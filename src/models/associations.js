import User from './user.js';
import Object from './object.js';
import Pickup from './pickup.js';

User.hasMany(Object, { as: 'DonatedObjects', foreignKey: 'object_donor_id' });
User.hasMany(Object, { as: 'ReceivedObjects', foreignKey: 'object_recipient_id' });
Object.belongsTo(User, { as: 'Donor', foreignKey: 'object_donor_id' });
Object.belongsTo(User, { as: 'Recipient', foreignKey: 'object_recipient_id' });
Object.hasOne(Pickup, { as: 'Pickup', foreignKey: 'pickup_object_id' });
Pickup.belongsTo(Object, { foreignKey: 'pickup_object_id' });

export default { User, Object, Pickup };