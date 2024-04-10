export function generateRandomEmail(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let email = '';
    for (let i = 0; i < 10; i++) {
      email += chars[Math.floor(Math.random() * chars.length)];
    }
    return email + '@example.com';
  }