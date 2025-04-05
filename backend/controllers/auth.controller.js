const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const pool = require('../database/db');
const axios = require('axios');
const ONESIGNAL_APP_ID = 'b4ea2016-3636-4a96-a550-e20e60be8147';
const ONESIGNAL_API_KEY = 'os_v2_app_wtvcafrwgzfjnjkq4ihgbpubi5d7rbkxz3yemznpjlzlosks4tpfw7xk74jlvfcrljtgxwwqzzdpa2vfphxkie2esoo5ieew25fxjza';

exports.register = async (req, res) => {
  const { name, email, password, type } = req.body;
  try {
    const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length > 0) return res.status(400).json({ message: 'Email já cadastrado' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();

    await pool.query(
      'INSERT INTO users (id, name, email, password_hash, type) VALUES (?, ?, ?, ?, ?)',
      [id, name, email, hashedPassword, type]
    );

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      if (rows.length === 0) return res.status(401).json({ message: 'Credenciais inválidas' });
  
      const user = rows[0];
      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) return res.status(401).json({ message: 'Credenciais inválidas' });
  
      const token = jwt.sign({ id: user.id, email: user.email, type: user.type }, process.env.JWT_SECRET, {
        expiresIn: '1d'
      });
  
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  };

  exports.sendOTP = async (req, res) => {
    const { email } = req.body;
  
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      if (rows.length === 0)
        return res.status(404).json({ message: 'Usuário não encontrado' });
  
      const user = rows[0];
  
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const expiresAt = new Date(Date.now() + 5 * 60000); // 5 minutos
      const id = uuidv4();
  
      await pool.query(
        'INSERT INTO otp_codes (id, user_id, code, expires_at, used) VALUES (?, ?, ?, ?, ?)',
        [id, user.id, otp, expiresAt, false]
      );
  
      console.log('Disparando notificação OTP:', otp);
  
      const onesignalPayload = {
        app_id: ONESIGNAL_APP_ID,
        contents: { en: `Seu código OTP é: ${otp}` },
        headings: { en: 'Código de Verificação' },
        included_segments: ["All"]
      };
  
      const headers = {
        Authorization: `Basic ${ONESIGNAL_API_KEY}`, 
        'Content-Type': 'application/json',
      };
  
      const response = await axios.post('https://api.onesignal.com/notifications', onesignalPayload, { headers });
  
      console.log('Resposta do OneSignal:', response.data);
      res.json({ message: 'Código OTP enviado com sucesso' });
  
    }  catch (error) {
      if (error.response) {
        console.error('Erro ao enviar OTP (resposta da API):', error.response.data);
      } else {
        console.error('Erro ao enviar OTP:', error.message || error);
      }
    
      res.status(500).json({ message: 'Erro ao enviar OTP' });
    }
  };

  exports.verifyOTP = async (req, res) => {
    const { email, code } = req.body;
    try {
      const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      if (users.length === 0) return res.status(404).json({ message: 'Usuário não encontrado' });
  
      const user = users[0];
      const [rows] = await pool.query(
        'SELECT * FROM otp_codes WHERE user_id = ? AND code = ? AND used = FALSE AND expires_at > NOW()',
        [user.id, code]
      );
  
      if (rows.length === 0) return res.status(400).json({ message: 'Código inválido ou expirado' });
  
      await pool.query('UPDATE otp_codes SET used = TRUE WHERE id = ?', [rows[0].id]);
      res.json({ message: 'Código verificado com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao verificar código' });
    }
  };
  
  exports.requestPasswordReset = async (req, res) => {
    const { email, codeOtp } = req.body;
    try {
      const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      if (users.length === 0) return res.status(404).json({ message: 'Usuário não encontrado' });
  
      const user = users[0];
      const expiresAt = new Date(Date.now() + 5 * 60000);
      const id = uuidv4();
  
      await pool.query('INSERT INTO password_reset_requests (id, user_id, code, expires_at, used) VALUES (?, ?, ?, ?, ?)', [
        id, user.id, codeOtp, expiresAt, false
      ]);
  
      console.log(`Código de redefinição para ${email}: ${codeOtp}`);
      res.json({ message: 'Código enviado (simulado via console)' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao solicitar redefinição' });
    }
  };
  
  exports.resetPassword = async (req, res) => {
    const { email, codeOtp, password } = req.body;
    try {
      const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      if (users.length === 0) return res.status(404).json({ message: 'Usuário não encontrado' });
  
      const user = users[0];
      const [requests] = await pool.query(
        'SELECT * FROM password_reset_requests WHERE user_id = ? AND code = ? AND used = FALSE AND expires_at > NOW()',
        [user.id, codeOtp]
      );
  
      if (requests.length === 0) return res.status(400).json({ message: 'Código inválido ou expirado' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [hashedPassword, user.id]);
      await pool.query('UPDATE password_reset_requests SET used = TRUE WHERE id = ?', [requests[0].id]);
  
      res.json({ message: 'Senha redefinida com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao redefinir senha' });
    }
  };
  
  
