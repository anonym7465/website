const express = require('express');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const axios = require('axios');
const crypto = require('crypto');
const FormData = require('form-data');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/download-upload', async (req, res) => {
    const { videoUrl, outputName } = req.body;

    try {
        const response = await axios.get(videoUrl, { responseType: 'arraybuffer' });
        fs.writeFileSync(`public/${outputName}.m3u8`, response.data);

        const command = ffmpeg(`public/${outputName}.m3u8`);
        command.format('mp4');
        command.save(`public/${outputName}.mp4`).on('end', () => {
            console.log('Video downloaded and uploaded successfully!');
        });

        const fileStream = fs.createReadStream(`public/${outputName}.mp4`);
        const form = new FormData();
        form.append('file', fileStream);

        await fetch('https://your-file-upload-api-url', {
            method: 'POST',
            body: form
        });

        res.status(200).send('Success');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
