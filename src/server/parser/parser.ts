import fs from 'fs';

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  viewCount: number;
};

type FrontMatter = Omit<Metadata, 'viewCount'>;

export const parseMDX = (mdx: string, suppressFrontMatterRequired = false): { metadata: FrontMatter; source: string } => {
  const metadata: FrontMatter = {
    title: '',
    publishedAt: '',
    summary: '',
    image: '',
  };

  const frontMatterRegex = /^---\n(.*?)\n---/s;
  const frontMatterMatch = mdx.match(frontMatterRegex);
  if (!frontMatterMatch && !suppressFrontMatterRequired) {
    throw new Error('Front matter is required');
  }
  if (frontMatterMatch) {
    const frontMatter = frontMatterMatch[1];
    const source = mdx.replace(frontMatterRegex, '');
    const frontMatterData = frontMatter!.split('\n');

    frontMatterData.forEach((line) => {
      const [key, ...valueArr] = line.split(': ');
      const value = valueArr.join(': ').trim();
      const rawValue = value.replace(/^['"](.*)['"]$/, '$1'); // Remove quotes
      metadata[key!.trim() as keyof FrontMatter] = rawValue;
    });
    return { metadata, source };
  } else {
    return { metadata, source: mdx };
  }
}

export const readMDXFile = (path: string) => {
  return fs.readFileSync(path, 'utf-8');
}
