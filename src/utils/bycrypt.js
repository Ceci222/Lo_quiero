import bcrypt from 'bcrypt';

async function hash(password) {
    return await bcrypt.hash(password, 10);
}

async function compare(password, hash) {
    return await bcrypt.compare(password, hash);
}

export { hash, compare };