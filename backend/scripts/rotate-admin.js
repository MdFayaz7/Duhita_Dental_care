import dotenv from 'dotenv';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import readline from 'readline';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
const SYMBOLS = '!@#$%^&*-_=+?';

const pick = (pool, count) =>
  Array.from({ length: count }, () => pool[crypto.randomInt(pool.length)]).join('');

const shuffle = (value) => {
  const chars = [...value];
  for (let i = chars.length - 1; i > 0; i -= 1) {
    const j = crypto.randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join('');
};

const strongPassword = () => shuffle(pick(ALPHABET, 20) + pick(SYMBOLS, 4));

const askHidden = (question) =>
  new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    let first = true;
    rl._writeToOutput = (chunk) => {
      if (first) {
        rl.output.write(chunk);
        first = false;
      }
    };
    rl.question(question, (answer) => {
      rl.output.write('\n');
      rl.close();
      resolve(answer);
    });
  });

const rules = (value) => {
  if (value.length < 16) return 'must be at least 16 characters';
  if (!/[a-z]/.test(value)) return 'must contain a lowercase letter';
  if (!/[A-Z]/.test(value)) return 'must contain an uppercase letter';
  if (!/[0-9]/.test(value)) return 'must contain a number';
  if (!/[^A-Za-z0-9]/.test(value)) return 'must contain a symbol';
  return null;
};

const choosePassword = async () => {
  if (process.env.ADMIN_PASSWORD) {
    const problem = rules(process.env.ADMIN_PASSWORD);
    if (problem) throw new Error(`ADMIN_PASSWORD ${problem}.`);
    return { password: process.env.ADMIN_PASSWORD, generated: false };
  }

  if (!process.stdin.isTTY) {
    return { password: strongPassword(), generated: true };
  }

  console.log('\nChoose a password (16+ chars, upper, lower, number, symbol).');
  console.log('Press Enter on a blank prompt to generate a strong one instead.\n');

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const entered = await askHidden('New password: ');
    if (!entered) return { password: strongPassword(), generated: true };

    const problem = rules(entered);
    if (problem) {
      console.log(`  Password ${problem}. Try again.\n`);
      continue;
    }

    const again = await askHidden('Confirm password: ');
    if (again !== entered) {
      console.log('  Passwords did not match. Try again.\n');
      continue;
    }
    return { password: entered, generated: false };
  }

  throw new Error('Too many failed attempts.');
};

const run = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set in backend/.env');

  const existingAdmin = await (async () => {
    await mongoose.connect(uri);
    return Admin.findOne().select('username email');
  })();

  const username = process.env.ADMIN_USERNAME || existingAdmin?.username;
  const email = process.env.ADMIN_EMAIL || existingAdmin?.email;

  if (!username || !email) {
    throw new Error('No admin found. Set ADMIN_USERNAME and ADMIN_EMAIL for the first run.');
  }

  const { password, generated } = await choosePassword();

  const existing = await Admin.findOne({ $or: [{ email: email.toLowerCase() }, { username }] });
  let admin;

  if (existing) {
    existing.username = username;
    existing.email = email.toLowerCase();
    existing.password = password;
    admin = await existing.save();
  } else {
    admin = await Admin.create({ username, email: email.toLowerCase(), password, name: 'Administrator' });
  }

  const stale = await Admin.deleteMany({ _id: { $ne: admin._id } });

  console.log('\nAdmin credentials updated.');
  console.log('  username :', admin.username);
  console.log('  email    :', admin.email);
  console.log('  password :', generated ? password : '(the password you entered — not shown)');
  console.log('  removed  :', stale.deletedCount, 'other admin account(s)');
  console.log('\nAll existing admin sessions are now invalid. Store this password in a password manager');
  console.log('and clear ADMIN_PASSWORD / ADMIN_EMAIL / ADMIN_USERNAME from your shell history.\n');

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((error) => {
  console.error('Rotation failed:', error.message);
  process.exit(1);
});
