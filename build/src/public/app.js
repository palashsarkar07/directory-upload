const API_BASE_URL = window.APP_CONFIG.API_BASE_URL;
const folderInput = document.getElementById('folderInput');
const projectIdInput = document.getElementById('projectId');
const statusElement = document.getElementById('status');
const uploadButton = document.getElementById('uploadBtn');
uploadButton.addEventListener('click', upload);
async function upload() {
    if (!folderInput.files?.length) {
        statusElement.textContent = 'Please select a folder.';
        return;
    }
    const projectId = projectIdInput.value.trim();
    if (!projectId) {
        statusElement.textContent = 'Please enter a project ID.';
        return;
    }
    const formData = new FormData();
    for (const file of Array.from(folderInput.files)) {
        formData.append('files', file, file.webkitRelativePath);
    }
    statusElement.textContent = 'Uploading...';
    try {
        const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}/uploads`, {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        if (response.ok) {
            statusElement.textContent = `Upload successful! uploadId: ${data.uploadId}`;
        }
        else {
            statusElement.textContent = `Upload failed: ${JSON.stringify(data)}`;
        }
    }
    catch (error) {
        statusElement.textContent = `Error: ${error.message}`;
    }
}
export {};
