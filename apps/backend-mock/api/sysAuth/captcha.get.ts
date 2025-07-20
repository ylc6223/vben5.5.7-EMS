export default defineEventHandler(async (event) => {
  // 生成一个简单的验证码ID
  const codeId = Date.now().toString();

  // 生成一个简单的验证码文本
  const captchaText = Math.random().toString(36).substring(2, 6).toUpperCase();

  // 创建一个简单的SVG验证码图片
  const svgContent = `
    <svg width="120" height="40" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f8f9fa;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e9ecef;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="120" height="40" fill="url(#bg)" rx="6"/>
      <text x="60" y="25" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#495057">${captchaText}</text>
      <line x1="10" y1="15" x2="110" y2="25" stroke="#dee2e6" stroke-width="1"/>
      <line x1="20" y1="30" x2="100" y2="10" stroke="#dee2e6" stroke-width="1"/>
    </svg>
  `;

  // 转换为base64
  const base64Image = Buffer.from(svgContent).toString('base64');
  const dataUrl = `data:image/svg+xml;base64,${base64Image}`;

  return useResponseSuccess({
    codeId,
    img: dataUrl,
  });
});
