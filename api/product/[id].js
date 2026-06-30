const fs = require('fs');
const path = require('path');
const productsData = require('../../src/data/product.json');

const BASE_URL = 'https://mohitsdecor.vercel.app';

const BOT_PATTERN = /facebookexternalhit|WhatsApp|Twitterbot|LinkedInBot|TelegramBot|Googlebot|bingbot|Slackbot/i;

module.exports = (req, res) => {
  const { id } = req.query;
  const userAgent = req.headers['user-agent'] || '';
  const isBot = BOT_PATTERN.test(userAgent);

  const product = productsData.find(p => p.id === Number(id));

  if (isBot && product) {
    const imageUrl = `${BASE_URL}/img/product/${product.imageFolder}/1.png`;
    const pageUrl  = `${BASE_URL}/product/${id}`;
    const title    = `${product.name} | Mohit's Decor`;
    const desc     = product.details.slice(0, 2).join(' · ');

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <meta property="og:type"        content="product" />
  <meta property="og:title"       content="${title}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:image"       content="${imageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url"         content="${pageUrl}" />
  <meta property="og:site_name"   content="Mohit's Decor" />
  <meta name="twitter:card"       content="summary_large_image" />
  <meta name="twitter:title"      content="${title}" />
  <meta name="twitter:description" content="${desc}" />
  <meta name="twitter:image"      content="${imageUrl}" />
</head>
<body>
  <script>window.location.replace("${pageUrl}");</script>
</body>
</html>`);
  }

  // Non-bot: serve the React app shell so react-router takes over
  try {
    const html = fs.readFileSync(path.join(process.cwd(), 'build', 'index.html'), 'utf8');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(html);
  } catch {
    res.writeHead(302, { Location: `/product/${id}` });
    return res.end();
  }
};
