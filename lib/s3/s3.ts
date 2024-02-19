import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({ region: process.env.AWS_REGION });

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

async function createPostImageKey(postTitle: string, index: number) {
  return `${postTitle}-${Date.now()}-${index}`;
}

async function fileToBuffer(file: File): Promise<Buffer> {
  return (await file.arrayBuffer()) as Buffer;
}

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
    return `https://${AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.name}`;
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw new Error("Failed to upload file to S3");
  }
}

export async function uploadPostImagesToS3(
  files: File[],
  title: string,
): Promise<string[]> {
  // loop through the files and upload them to S3, give them a unique name with date, time and index
  const imageUrls = await Promise.all(
    files.map(async (file, index) => {
      const fileKey = await createPostImageKey(title, index);
      return uploadFileToS3(file, fileKey);
    }),
  );

  return imageUrls;
}
