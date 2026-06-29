declare global {
  interface Window {
    APP_CONFIG: {
      API_BASE_URL: string;
    };
  }
}

export {};

const API_BASE_URL = window.APP_CONFIG.API_BASE_URL;

const folderInput = document.getElementById("folderInput") as HTMLInputElement;

const projectIdInput = document.getElementById("projectId") as HTMLInputElement;

const userIdInput = document.getElementById("userId") as HTMLInputElement;

const tokenInput = document.getElementById("token") as HTMLInputElement;

const statusElement = document.getElementById("status") as HTMLParagraphElement;

const uploadButton = document.getElementById("uploadBtn") as HTMLButtonElement;

uploadButton.addEventListener("click", upload);

async function upload(): Promise<void> {
  if (!folderInput.files?.length) {
    statusElement.textContent = "Please select a folder.";
    return;
  }

  const projectId = projectIdInput.value.trim();

  if (!projectId) {
    statusElement.textContent = "Please enter a project ID.";
    return;
  }

  const formData = new FormData();

  for (const file of Array.from(folderInput.files)) {
    console.log("name:", file.name, "relativePath:", file.webkitRelativePath);

    formData.append("files", file, file.webkitRelativePath);
    formData.append("paths", file.webkitRelativePath);
  }

  statusElement.textContent = "Uploading...";

  try {
    const token = tokenInput.value.trim();
    const userId = userIdInput.value.trim();
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

    if (userId) {
      headers["x-user-id"] = userId;
    }
    const response = await fetch(
      `${API_BASE_URL}/projects/${projectId}/uploads`,
      {
        method: "POST",
        headers,
        body: formData,
      },
    );

    const data = await response.json();

    if (response.ok) {
      statusElement.textContent = `Upload successful! uploadId: ${data.uploadId}`;
    } else {
      statusElement.textContent = `Upload failed: ${JSON.stringify(data, null, 2)}`;
    }
  } catch (error) {
    statusElement.textContent = `Error: ${(error as Error).message}`;
  }
}
