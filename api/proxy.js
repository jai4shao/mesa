import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 你的 GAS Web App URL
    const GAS_URL = 'https://script.google.com/macros/s/AKfycbxSly_6PEMVdv12ELjPEw3cL20JQV135_G3hyuMVYtBwcpdp1Ka-wiuT72mHgP7hvo0/exec';

    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    // 加入 CORS header，允許前端跨域呼叫
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}
