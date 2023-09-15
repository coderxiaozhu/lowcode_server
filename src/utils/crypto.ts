import * as cypto from 'crypto';

export default (value: string, salt: string) => cypto.pbkdf2Sync(value, salt, 1000, 18, 'sha256').toString('hex');
