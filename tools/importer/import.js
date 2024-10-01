const hr = (doc) => doc.createElement('hr');
const createMetadataBlock = (main, document) => {
  const meta = {};

    // find the <title> element
    const title = document.querySelector('title');
    if (title) {
      meta.Title = title.innerHTML.replace(/[\n\t]/gm, '');
    }
    const desc = document.querySelector('[property="og:description"]');
    if (desc) {
      meta.Description = desc.content;
    }
    const img = document.querySelector('[property="og:image"]');
    if (img) {
      const el = document.createElement('img');
      el.src = img.content;
      meta.Image = el;
    }
    const block = WebImporter.Blocks.getMetadataBlock(document, meta);
    main.append(block);
    return meta;
  };

  export default {
    transformDOM: ({ document }) => {
      const main = document.querySelector('body');
      createMetadataBlock(main, document);
      WebImporter.DOMUtils.remove(main, [
        'header', 'footer',
      ]);
      return main;
    },
    generateDocumentPath: ({
        // eslint-disable-next-line no-unused-vars
        document, url, html, params,
      }) => WebImporter.FileUtils.sanitizePath(new URL(url).pathname.replace(/\/$/, '')),
  };