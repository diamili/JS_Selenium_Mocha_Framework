export function generateRandomPassword(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789!_?';
    let pass = '';
    for (let i = 0; i < 10; i++) {
      pass += chars[Math.floor(Math.random() * chars.length)];
    }
    return pass;
  }