const form = document.getElementById('video-form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const videoUrl = document.getElementById('video-url').value;
    const outputName = document.getElementById('output-name').value;

    try {
        const response = await fetch('/download-upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ videoUrl, outputName })
        });

        if (response.ok) {
            alert('Video downloaded and uploaded successfully!');
        } else {
            alert('Failed to download and upload the video.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while downloading and uploading the video.');
    }
});
