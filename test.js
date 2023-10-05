const fs = require('fs');
const QRCode = require('qrcode');

async function generateQRCodeToFile(text, filePath) {
    try {
      // const qrCode = await QRCode.toString(text, { type: 'svg' });
      // fs.writeFileSync(filePath, qrCode);
      QRCode.toFile('./qrcode.png', `${text}`,() =>{
      console.log('done')
    })
      console.log('QR code saved successfully!');
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    }
  }

// QRCode.toString('I am a pony!',{type:'terminal'}, function (err, url) {
//     console.log(url)
//   })

generateQRCodeToFile('https://clearmdhealth.com/IV', './qrcode.svg')

