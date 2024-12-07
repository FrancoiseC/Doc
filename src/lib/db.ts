import initSqlJs from 'sql.js';

export class Database {
  private static instance: Database;
  private db: any;

  private constructor() {}

  static async getInstance(): Promise<Database> {
    if (!Database.instance) {
      Database.instance = new Database();
      await Database.instance.initialize();
    }
    return Database.instance;
  }

  private async initialize() {
    const SQL = await initSqlJs({
      locateFile: file => `https://sql.js.org/dist/${file}`
    });
    this.db = new SQL.Database();
    await this.createTables();
    await this.seedData();
  }

  private async createTables() {
    const tables = [
      `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        role TEXT CHECK(role IN ('client', 'realtor')) NOT NULL,
        created_at TEXT NOT NULL
      )`,
      `CREATE TABLE IF NOT EXISTS documents (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        status TEXT NOT NULL,
        file_url TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id)
      )`,
      `CREATE TABLE IF NOT EXISTS document_requests (
        id TEXT PRIMARY KEY,
        from_user_id TEXT NOT NULL,
        to_user_id TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        due_date TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY(from_user_id) REFERENCES users(id),
        FOREIGN KEY(to_user_id) REFERENCES users(id)
      )`,
      `CREATE TABLE IF NOT EXISTS forms (
        id TEXT PRIMARY KEY,
        creator_id TEXT NOT NULL,
        title TEXT NOT NULL,
        fields TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY(creator_id) REFERENCES users(id)
      )`,
      `CREATE TABLE IF NOT EXISTS form_responses (
        id TEXT PRIMARY KEY,
        form_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        responses TEXT NOT NULL,
        submitted_at TEXT NOT NULL,
        FOREIGN KEY(form_id) REFERENCES forms(id),
        FOREIGN KEY(user_id) REFERENCES users(id)
      )`,
      `CREATE TABLE IF NOT EXISTS notifications (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        read INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id)
      )`
    ];

    for (const table of tables) {
      this.db.run(table);
    }
  }

  private async seedData() {
    // Add sample users
    const users = [
      {
        id: '1',
        email: 'realtor@example.com',
        name: 'John Realtor',
        role: 'realtor',
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        email: 'client@example.com',
        name: 'Alice Client',
        role: 'client',
        created_at: new Date().toISOString()
      }
    ];

    for (const user of users) {
      this.db.run(
        'INSERT OR IGNORE INTO users (id, email, name, role, created_at) VALUES (?, ?, ?, ?, ?)',
        [user.id, user.email, user.name, user.role, user.created_at]
      );
    }
  }

  async query(sql: string, params: any[] = []): Promise<any[]> {
    try {
      const result = this.db.exec(sql, params);
      if (!result || result.length === 0) return [];
      
      const columns = result[0].columns;
      const values = result[0].values;
      
      return values.map((row: any[]) => {
        const obj: any = {};
        columns.forEach((col: string, i: number) => {
          obj[col] = row[i];
        });
        return obj;
      });
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  }
}

// Initialize database function
export async function initializeDatabase() {
  await Database.getInstance();
}