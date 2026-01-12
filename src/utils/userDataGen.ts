export function generateUserData() {
    const randomNum = Math.floor(Math.random() * 10000);
    return {
        username: `user${randomNum}`,
        password: `Pass!23${randomNum}`,
        email: `user${randomNum}@example.com`
    };
}