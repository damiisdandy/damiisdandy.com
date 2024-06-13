import fs from "fs";
import path from "path";

export type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  tags: string;
  image?: string;
  viewCount: number;
  type: string;
};

type FrontMatter = Omit<Metadata, "viewCount">;

export const parseMDX = (
  mdx: string,
  suppressFrontMatterRequired = false,
): { metadata: FrontMatter; source: string } => {
  const metadata: FrontMatter = {
    title: "",
    publishedAt: "",
    summary: "",
    image: "",
    tags: "",
    type: "post",
  };

  const frontMatterRegex = /^---\n(.*?)\n---/s;
  const frontMatterMatch = mdx.match(frontMatterRegex);
  if (!frontMatterMatch && !suppressFrontMatterRequired) {
    throw new Error("Front matter is required");
  }
  if (frontMatterMatch) {
    const frontMatter = frontMatterMatch[1];
    const source = mdx.replace(frontMatterRegex, "");
    const frontMatterData = frontMatter!.split("\n");

    frontMatterData.forEach((line) => {
      const [key, ...valueArr] = line.split(": ");
      const value = valueArr.join(": ").trim();
      const rawValue = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
      metadata[key!.trim() as keyof FrontMatter] = rawValue;
    });
    return { metadata, source: source.trim() };
  } else {
    return { metadata, source: mdx };
  }
};

export const readMDXFile = (filePath: string) => {
  const contentPath = path.join(process.cwd(), "src", "content", filePath);
  return new Promise<string>((resolve, reject) => {
    fs.readFile(contentPath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

export const getAllFilesInDir = (
  dirPath: string,
  fileList: string[] = [],
  fullPath = false,
) => {
  const contentPath = fullPath
    ? dirPath
    : path.join(process.cwd(), "src", "content", dirPath);
  const files = fs.readdirSync(contentPath);
  files.forEach((file) => {
    const filePath = path.join(contentPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFilesInDir(filePath, fileList, true);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
};
