import postgres from 'postgres';
import { nanoid } from 'nanoid';

const sql = postgres(process.env.DATABASE_URL!);

async function setup() {
  try {
    console.log('Adding password column...');
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS password VARCHAR(255)`;
    console.log('✓ Password column added');

    // Check if BCX user exists
    const existing = await sql`SELECT * FROM users WHERE email = 'santhosh@bcx.co.za'`;
    
    if (existing.length > 0) {
      console.log('BCX user already exists, updating password...');
      await sql`UPDATE users SET password = 'bcx123', "loginMethod" = 'email' WHERE email = 'santhosh@bcx.co.za'`;
      console.log('✓ BCX user password updated');
    } else {
      console.log('Creating BCX user...');
      const userId = nanoid();
      await sql`
        INSERT INTO users (id, name, email, password, "loginMethod", role, "createdAt", "lastSignedIn")
        VALUES (
          ${userId},
          'Santhosh',
          'santhosh@bcx.co.za',
          'bcx123',
          'email',
          'admin',
          NOW(),
          NOW()
        )
      `;
      console.log('✓ BCX user created');
    }

    console.log('\n✅ Setup complete!');
    console.log('Login credentials:');
    console.log('Email: santhosh@bcx.co.za');
    console.log('Password: bcx123');
    
  } catch (error) {
    console.error('Setup failed:', error);
    throw error;
  } finally {
    await sql.end();
  }
}

setup();

