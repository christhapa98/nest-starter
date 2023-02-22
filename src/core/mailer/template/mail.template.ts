/**
 * Forget Password Otp Form Template
 * @date 2023-02-23
 * @param {string} otp:string
 * @returns {string}
 */
export const forgetPasswordTemplate = (otp: string): string => `<html>
<head>
  <title>OTP Email Template</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6em;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto;">
    <tr>
      <td style="background-color: #f8f8f8; padding: 40px; text-align: center;">
        <img src="https://example.com/logo.png" alt="Logo" style="max-width: 100%; height: auto; margin-bottom: 20px;">
        <h1 style="font-size: 28px; margin-bottom: 20px;">OTP Email</h1>
        <p style="font-size: 18px; margin-bottom: 40px;">Subject: Your OTP is:</p>
        <p style="font-size: 24px; font-weight: bold; margin-bottom: 40px;">${otp}</p>
        <p style="font-size: 18px;">Please use this OTP to complete your login or transaction.</p>
      </td>
    </tr>
  </table>
</body>
</html>`


export const signupSuccessTemplate = (): string => ``
export const ResetPasswordTemplate = (): string => ``