import { User } from '../modules/user/user.model';
import logger from '../config/logger';

export const seedAdmin = async () => {
  const adminEmail = 'rmdkayesur@gmail.com';
  const adminPassword = 'admin@123'; // Default password for the requested admin

  try {
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      if (existingAdmin.role !== 'admin') {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        logger.info('👤 Admin user role updated to admin');
      } else {
        logger.info('👤 Admin user already exists');
      }
      return;
    }

    const adminUser = {
      name: 'System Admin',
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    };

    await User.create(adminUser);
    logger.info('✅ Admin user seeded successfully');
    logger.info(`📧 Credentials: ${adminEmail} / ${adminPassword}`);
  } catch (error) {
    logger.error('❌ Error seeding admin user:', error);
  }
};
