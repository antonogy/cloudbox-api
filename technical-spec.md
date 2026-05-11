# Study Project “CloudBox API”
For a Middle-level developer (NestJS + TypeScript), a cloud storage project is an ideal choice because it involves working with binary data, resource optimization, and system design.
Here is a detailed technical specification (TS) for developing the “CloudBox API”.

## Technical Specification: Cloud Storage API (CloudBox)

### Technology Stack
  * Framework: NestJS (TypeScript)
  * Database: PostgreSQL (via Prisma ORM)
  * Storage: Local uploads/ folder (initial stage) or S3-compatible storage
  * Processing: Sharp library (for image processing)
  * Auth: JWT (Access + Refresh tokens)

### Functional Requirements
- _User Management_
    * Registration and login
    * Disk space limit (for example, 100 MB per user)
- _File Management_
    * `POST /files/upload` — upload one or multiple files (use Multer)
    * `GET /files` — retrieve a list of all user files with metadata
    * `GET /files/:id` — download a file
    * `DELETE /files/:id` — delete a file (from both the database and the file system)
    * `GET /files/preview/:id` — get a thumbnail preview (images only)
- _Image Processing_
    * When an image is uploaded, the server should automatically generate a preview thumbnail (for example, 200x200 px) and save it separately.

### Database Structure (Prisma Schema)
You will need at least two tables:
1. User
Fields:
    * id
    * email
    * passwordHash
    * usedSpace (how many bytes are occupied)
2. File
Fields:
    * id
    * originalName
    * filename (unique system filename)
    * mimeType
    * size (in bytes)
    * path (path to the original file)
    * previewPath (path to preview, if available)
    * userId (relation to the owner)

### Implementation Stages (Roadmap)
1. Environment Setup
    * Initialize NestJS
    * Set up PostgreSQL via Docker
    * Configure Prisma
2. Auth Module
    * Implement Passport JWT
    * All file-related requests must be protected
3. Uploads (Multer)
    * Configure DiskStorage
    * Files should be stored with unique names (e.g., UUIDs) to avoid conflicts
4. Preview Generation
    * Integrate Sharp
    * On upload, check the MIME type
    * If it is `image/*`, generate a thumbnail automatically
5. Storage Limits
    * Before saving a file, verify that: `user.usedSpace + file.size` does not exceed the allowed limit (100 MB)
6. Deletion
    * Implement cleanup logic
    * When a database record is deleted, the physical file must also be removed from disk

### What Would Make the Project “Cool” (Advanced Tasks)
- Streaming
    * Implement video/audio streaming using Readable Stream
    * This allows media playback without full download
- Hashing / Deduplication
    * Check the file MD5 hash before upload
    * If the file already exists on the server (uploaded by another user), do not store it again — just create a reference (space-efficient)
- Search
    * Search files by name or extension
