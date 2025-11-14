const { toMatchImageSnapshot } = require("jest-image-snapshot");

const customSnapshotsDir = `${process.cwd()}/__image_snapshots__`;

module.exports = {
  setup() {
    expect.extend({ toMatchImageSnapshot });
  },
  async postVisit(page, context) {
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir,
      customSnapshotIdentifier: context.id,
    });
  },
};
