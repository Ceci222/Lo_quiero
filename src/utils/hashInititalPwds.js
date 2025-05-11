import bcrypt from 'bcrypt';

const users = [
    { user_email: 'ana@example.com', user_pwd: 'AZ123456', user_name: 'AnaG' },
    { user_email: 'benito@example.com', user_pwd: 'AZ123456', user_name: 'BenitoR' },
    { user_email: 'clara@example.com', user_pwd: 'AZ123456', user_name: 'ClaraM' },
    { user_email: 'diego@example.com', user_pwd: 'AZ123456', user_name: 'DiegoT' },
    { user_email: 'elena@example.com', user_pwd: 'AZ123456', user_name: 'ElenaP' },
    { user_email: 'fernando@example.com', user_pwd: 'AZ123456', user_name: 'FernandoS' },
    { user_email: 'gema@example.com', user_pwd: 'AZ123456', user_name: 'GemaL' },
    { user_email: 'hugo@example.com', user_pwd: 'AZ123456', user_name: 'HugoV' },
    { user_email: 'irene@example.com', user_pwd: 'AZ123456', user_name: 'IreneC' },
    { user_email: 'javier@example.com', user_pwd: 'AZ123456', user_name: 'JavierN' },
    { user_email: 'karen@example.com', user_pwd: 'AZ123456', user_name: 'KarenB' },
    { user_email: 'luis@example.com', user_pwd: 'AZ123456', user_name: 'LuisF' }
];

async function rehashPasswords() {
    try {
        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.user_pwd, 10);
            console.log(`Usuario: ${user.user_email}, Nuevo Hash: ${hashedPassword}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

rehashPasswords();