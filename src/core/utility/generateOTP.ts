/**
 * Generates 6 digits random otp
 * @date 2023-02-23
 * @returns {any}
 */
export function generateOTP(): string {
    // Generate a random number between 100000 and 999999
    const otp = Math.floor(Math.random() * 900000) + 100000;
    // Convert the number to a string
    return otp.toString();
}