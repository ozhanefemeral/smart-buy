import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import sharp from "sharp";

const AWS_REGION = process.env.AWS_REGION;
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

const s3 = new S3Client({ region: AWS_REGION });

async function createPostImageKey(postTitle: string, index: number) {
  return encodeURI(
    `${postTitle.replaceAll(" ", "-")}-${Date.now()}-${index}.webp`,
  );
}

async function fileToBuffer(file: File): Promise<Buffer> {
  return (
    sharp(await file.arrayBuffer())
      // https://sharp.pixelplumbing.com/api-output#webp
      .webp()
      .toBuffer()
  );
}

export const S3BaseUrl = `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com`;

export async function uploadFileToS3(
  file: File,
  fileKey: string,
): Promise<string> {
  const params: PutObjectCommandInput = {
    Bucket: AWS_BUCKET_NAME,
    Key: fileKey,
    Body: await fileToBuffer(file),
    ContentType: file.type,
  };

  const command = new PutObjectCommand(params);

  try {
    const data = await s3.send(command);
    return fileKey;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw new Error("Failed to upload file to S3");
  }
}

export async function uploadBufferToS3(
  buffer: Buffer,
  fileKey: string,
  contentType: string,
): Promise<string> {
  const params: PutObjectCommandInput = {
    Bucket: AWS_BUCKET_NAME,
    Key: fileKey,
    Body: buffer,
    ContentType: contentType,
  };

  const command = new PutObjectCommand(params);

  try {
    const data = await s3.send(command);
    return fileKey;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw new Error("Failed to upload file to S3");
  }
}

export async function createThumbnailFromImage(
  file: File,
  thumbnailIndex: number,
): Promise<string> {
  const thumbnail = await sharp(await file.arrayBuffer())
    .webp()
    .resize(300, 300)
    .toBuffer();

  const thumbnailKey = file.name.replace(/\.[^/.]+$/, "") + "-thumbnail.webp";

  return uploadBufferToS3(thumbnail, thumbnailKey, "image/webp");
}

export async function uploadPostImagesToS3(
  files: File[],
  title: string,
  thumbnailIndex: number,
): Promise<{ imageUrls: string[]; thumbnail: string }> {
  const imageUrls = await Promise.all(
    files.map(async (file, index) => {
      const fileKey = await createPostImageKey(title, index);
      return uploadFileToS3(file, fileKey);
    }),
  );

  const thumbnail = await createThumbnailFromImage(
    files[thumbnailIndex],
    thumbnailIndex,
  );

  return { imageUrls, thumbnail };
}
