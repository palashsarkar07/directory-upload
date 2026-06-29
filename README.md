# Directory Upload Client

A simple utility for uploading directories to the upload API.

## Clone Repository

```bash
git clone https://github.com/palashsarkar07/directory-upload
cd directory-upload
```

## Setup

Create a `.env` file:

```env
PORT=5500
API_BASE_URL=http://localhost:8081/api
```

## Install Dependencies

```bash
npm install
```

## Build

```bash
npm run compile
```

## Run

```bash
npm run start
```

## Open in Browser

```text
http://localhost:5500
```

## Usage

1. Enter the Project ID.
2. Enter a valid Bearer Token.
3. Select a directory.
4. Click **Upload Directory**.

The selected directory will be uploaded to:

```http
POST /api/projects/:projectId/uploads
```
