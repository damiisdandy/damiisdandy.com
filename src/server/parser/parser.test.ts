import { parseMDX, readMDXFile } from "./parser";


describe('Should parser frontmatter', () => {
  it("Should return frontmatter and content", async () => {
    const content = await readMDXFile("/test/example.mdx");
    const { metadata, source } = parseMDX(content);

    expect(metadata).toEqual({
      title: 'Example Title',
      publishedAt: '2021-10-09',
      summary: 'Example Summary',
      tags: 'React, Javascript, Typescript, Pagination, Hooks, Tutorial',
      image: 'https://example.com/image.jpg',
    });

    expect(source).toEqual('Content Goes Here');

  });
})