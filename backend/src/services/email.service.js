import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

// Buat transporter jika SMTP dikonfigurasi di .env
const createTransporter = () => {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, '') : '';

  if (user && pass) {
    if (host.includes('gmail') || user.includes('@gmail.com')) {
      return nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass },
      });
    }

    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }

  return null;
};

/**
 * Mengirim email kode verifikasi OTP ke pengguna secara nyata (Resend API atau SMTP)
 * @param {string} to - Alamat email penerima
 * @param {string} otpCode - 6 digit kode OTP
 * @param {string} username - Nama pengguna
 * @returns {Promise<{ sent: boolean }>}
 */
export const sendOtpEmail = async (to, otpCode, username = 'Siswa') => {
  const resendApiKey = process.env.RESEND_API_KEY;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!resendApiKey && (!user || !pass)) {
    throw new Error(
      'Server belum dikonfigurasi untuk mengirim email. Silakan isi RESEND_API_KEY atau SMTP_USER & SMTP_PASS di backend/.env.'
    );
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="utf-8">
      <title>Kode Verifikasi TKA SD</title>
    </head>
    <body style="font-family: Arial, Helvetica, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; margin: 0 auto;">
        <tr>
          <td style="padding: 24px 28px 16px 28px; text-align: center; background-color: #2563eb;">
            <h1 style="color: #ffffff; font-size: 20px; margin: 0; font-weight: bold; letter-spacing: 0.5px;">Portal TKA SD</h1>
            <p style="color: #dbeafe; font-size: 13px; margin: 4px 0 0 0;">Tes Kemampuan Akademik Sekolah Dasar</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 28px;">
            <p style="font-size: 15px; line-height: 1.5; margin: 0 0 16px 0; color: #334155;">
              Halo <strong>${username}</strong>,
            </p>
            <p style="font-size: 14px; line-height: 1.6; margin: 0 0 20px 0; color: #475569;">
              Terima kasih telah mendaftar di Portal Latihan Soal TKA SD. Berikut adalah kode verifikasi akun Anda:
            </p>
            <div style="text-align: center; margin: 24px 0;">
              <div style="display: inline-block; background-color: #eff6ff; border: 2px dashed #2563eb; border-radius: 8px; padding: 12px 28px;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #1d4ed8; font-family: monospace;">
                  ${otpCode}
                </span>
              </div>
            </div>
            <p style="font-size: 13px; line-height: 1.5; color: #64748b; margin: 0 0 16px 0; text-align: center;">
              Kode ini berlaku selama <strong>10 menit</strong>. Jangan bagikan kode ini kepada siapa pun.
            </p>
            <hr style="border: none; border-top: 1px solid #f1f5f9; margin: 24px 0 16px 0;" />
            <p style="font-size: 12px; line-height: 1.5; color: #94a3b8; margin: 0;">
              Jika Anda tidak merasa melakukan pendaftaran akun di Portal TKA SD, abaikan email ini.
            </p>
          </td>
        </tr>
        <tr>
          <td style="background-color: #f8fafc; padding: 16px 28px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="font-size: 11px; color: #94a3b8; margin: 0;">
              &copy; ${new Date().getFullYear()} Portal TKA SD. Seluruh hak cipta dilindungi.
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const textContent = `Halo ${username},\n\nKode verifikasi akun TKA SD Anda adalah: ${otpCode}\n\nKode ini berlaku selama 10 menit. Jangan berikan kode ini kepada siapapun demi keamanan akun Anda.\n\nSalam,\nTim Portal TKA SD`;

  // 1. Prioritaskan pengiriman via Resend API jika API Key tersedia
  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      const fromSender = process.env.RESEND_FROM || 'Portal TKA SD <onboarding@resend.dev>';

      const { data, error } = await resend.emails.send({
        from: fromSender,
        to: [to],
        subject: `Kode Verifikasi Pendaftaran TKA SD: ${otpCode}`,
        text: textContent,
        html: htmlContent,
      });

      if (error) {
        console.error('[RESEND ERROR]:', error);
        throw new Error(`Resend: ${error.message}`);
      }

      console.log(`[EMAIL/RESEND] Kode OTP berhasil dikirim ke: ${to} (ID: ${data?.id})`);
      return { sent: true };
    } catch (err) {
      console.error('[RESEND FAILED]:', err.message);
      if (!user || !pass) {
        throw new Error(`Gagal mengirim email via Resend: ${err.message}`);
      }
      console.log('[EMAIL] Mencoba fallback ke Google SMTP...');
    }
  }

  // 2. Pengiriman via Transporter SMTP
  const transporter = createTransporter();
  if (!transporter) {
    throw new Error('Gagal menginisialisasi pengirim email SMTP. Periksa konfigurasi di backend/.env.');
  }

  try {
    await transporter.sendMail({
      from: `"TKA SD" <${process.env.SMTP_USER}>`,
      replyTo: process.env.SMTP_USER,
      to,
      subject: `Kode Verifikasi Pendaftaran TKA SD: ${otpCode}`,
      text: textContent,
      html: htmlContent,
      headers: {
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        Importance: 'Normal',
      },
    });
    console.log(`[EMAIL/SMTP] Kode OTP berhasil dikirim ke: ${to}`);
    return { sent: true };
  } catch (err) {
    console.error(`[EMAIL ERROR]:`, err);
    throw new Error(`Gagal mengirim email OTP ke ${to}: ${err.message}`);
  }
};

