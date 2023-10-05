const express = require('express');
const { execSync } = require('child_process');
const qr = require('qrcode');
const bodyParser = require('body-parser')


const app = express();
app.use(bodyParser.json())
const port = 5006;
app.post('/laptoplabel', (req, res) => {
    console.log(req.body)
    let user = req.body
    console.log('request')
    //execSync(`printf "     NAME\n${user.firstName}\n${user.lastName}\n\n  DEVICE NUMBER\n${user.deviceID}\n\n  DEVICE TYPE\n${user.deviceName}" | enscript -B -M Label -f Times5 -o  - | lp -n 2`);
    execSync(`printf "NAME\n${user.firstName}\n${user.lastName}\n\nDEVICE NUMBER\n${user.deviceID}\n\nDEVICE TYPE\n${user.deviceName}" | enscript -B -M Label -o - | lp -n 2`);
	// qr.toFile('./qrcode.png', `${user.notionLink}`,() =>{
    //     execSync(` lpr -o -fit-on-page -o media=Label -#2 ./qrcode.png`);
    // })
    qr.toFile('./qrcode.png', `${user.notionLink}`, { margin : 10}, () => {
        execSync(`lpr -o fit-on-page -o media=Label -#2 ./qrcode.png`);
    });
    res.send('Finished')
    res.status(200)
})
app.post('/adapterlabel', (req, res) => {
    console.log(req.body)
    let user = req.body
    console.log('request')
    //execSync(`printf "     NAME\n${user.firstName}\n${user.lastName}\n\n  DEVICE NUMBER\n${user.deviceID}\n\n  DEVICE TYPE\n${user.deviceName}" | enscript -B -M Label -f Times5 -o  - | lp -n 2`);
    execSync(`printf "DEVICE ID" | enscript -B -M Label -f Times5 -o  - | lp -n 2`);
	qr.toFile('./qrcode.png', `${user.notionLink}`,() =>{
        execSync(`lpr -o -fit-on-page -o -# 2 -o media=Label./qrcode.png`);
    })
    res.send('Finished')
    res.status(200)
})
app.listen(port , () => {
    console.log('Now listening on PORT', port);
});
