import { useChannel } from 'storybook/internal/preview-api';

// src/withHTML.ts

// src/constants.ts
var ADDON_ID = "storybook/html";
var EVENTS = {
  CODE_UPDATE: `${ADDON_ID}/codeUpdate`
};

// src/withHTML.ts
var withHTML = (storyFn, { parameters: { html: parameters = {} } = {} }) => {
  const emit = useChannel({});
  setTimeout(async () => {
    const rootSelector = parameters.root || "#storybook-root, #root";
    const root = document.querySelector(rootSelector);
    let code = root ? root.innerHTML : `${rootSelector} not found.`;
    const { removeEmptyComments, removeComments, transform } = parameters;
    if (removeEmptyComments) {
      code = code.replace(/<!--\s*-->/g, "");
    }
    if (removeComments === true) {
      code = code.replace(/<!--[\S\s]*?-->/g, "");
    } else if (removeComments instanceof RegExp) {
      code = code.replace(/<!--([\S\s]*?)-->/g, (match, p1) => removeComments.test(p1) ? "" : match);
    }
    if (typeof transform === "function") {
      try {
        code = transform(code);
      } catch (e) {
        console.error(e);
      }
    }
    const prettier = await import('./standalone-ER56XUEX.js');
    const prettierPluginHtml = await import('./html-EK4X23QO.js');
    code = await prettier.format(code, {
      parser: "html",
      plugins: [prettierPluginHtml]
    });
    emit(EVENTS.CODE_UPDATE, { code, options: parameters });
  }, 0);
  return storyFn();
};

// src/preview.ts
var preview = {
  decorators: [withHTML]
};
var preview_default = preview;

export { preview_default as default };
