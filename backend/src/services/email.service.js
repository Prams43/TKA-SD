import nodemailer from 'nodemailer';
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

  // Jika belum ada konfigurasi SMTP di .env, kita kembalikan null untuk mode dev/simulasi
  return null;
};

/**
 * Mengirim email kode verifikasi OTP ke pengguna secara nyata melalui SMTP
 * @param {string} to - Alamat email penerima
 * @param {string} otpCode - 6 digit kode OTP
 * @param {string} username - Nama pengguna
 * @returns {Promise<{ sent: boolean }>}
 */
export const sendOtpEmail = async (to, otpCode, username = 'Siswa') => {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error(
      'Server belum dikonfigurasi untuk mengirim email. Silakan isi SMTP_USER dan SMTP_PASS di backend/.env.'
    );
  }

  const transporter = createTransporter();
  if (!transporter) {
    throw new Error('Gagal menginisialisasi pengirim email. Periksa konfigurasi SMTP di backend/.env.');
  }

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0;">
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="display: inline-block; width: 52px; height: 52px; line-height: 52px; background: #2563eb; color: #ffffff; border-radius: 14px; font-size: 24px; font-weight: bold;">
          🎓
        </div>
        <h2 style="color: #0f172a; margin: 12px 0 4px 0; font-size: 22px;">Verifikasi Akun TKA SD</h2>
        <p style="color: #64748b; font-size: 14px; margin: 0;">Portal Tes Kemampuan Akademik SD</p>
      </div>

      <p style="color: #334155; font-size: 15px; line-height: 1.6;">
        Halo <strong>${username}</strong>,
      </p>
      <p style="color: #334155; font-size: 15px; line-height: 1.6;">
        Gunakan kode OTP 6-digit di bawah ini untuk memverifikasi akun Anda di Portal TKA SD:
      </p>

      <div style="text-align: center; margin: 28px 0;">
        <div style="display: inline-block; background: #eff6ff; border: 2px dashed #3b82f6; border-radius: 14px; padding: 14px 28px;">
          <span style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #1d4ed8; font-family: monospace;">
            ${otpCode}
          </span>
        </div>
        <p style="color: #64748b; font-size: 12px; margin-top: 8px;">
          Kode ini berlaku selama <strong>10 menit</strong>. Jangan berikan kode ini kepada siapapun demi keamanan akun Anda.
        </p>
      </div>

      <p style="color: #64748b; font-size: 13px; line-height: 1.5; border-top: 1px solid #f1f5f9; padding-top: 16px;">
        Jika Anda tidak merasa mendaftar di TKA SD, silakan abaikan email ini.
      </p>

      <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #94a3b8;">
        &copy; ${new Date().getFullYear()} TKA SD. Seluruh hak cipta dilindungi.
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Portal TKA SD" <${process.env.SMTP_USER}>`,
      to,
      subject: `[${otpCode}] Kode Verifikasi Akun TKA SD`,
      html: htmlContent,
    });
    console.log(`[EMAIL] Kode OTP berhasil dikirim ke: ${to}`);
    return { sent: true };
  } catch (err) {
    console.error(`[EMAIL ERROR]:`, err);
    throw new Error(`Gagal mengirim email OTP ke ${to}: ${err.message}`);
  }
};

