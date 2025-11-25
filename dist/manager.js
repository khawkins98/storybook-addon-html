import { addons, types, useAddonState, useChannel, useParameter } from 'storybook/internal/manager-api';
import React2 from 'react';
import { AddonPanel, SyntaxHighlighter } from 'storybook/internal/components';

// src/manager.ts

// src/constants.ts
var ADDON_ID = "storybook/html";
var PANEL_ID = `${ADDON_ID}/panel`;
var PARAM_KEY = `html`;
var EVENTS = {
  CODE_UPDATE: `${ADDON_ID}/codeUpdate`
};
var PanelContent = ({ code, showLineNumbers = false, wrapLines = false }) => /* @__PURE__ */ React2.createElement(
  SyntaxHighlighter,
  {
    language: "html",
    copyable: true,
    padded: true,
    showLineNumbers,
    wrapLongLines: wrapLines,
    format: "html"
  },
  code
);

// src/Panel.tsx
var Panel = (props) => {
  const [{ code }, setState] = useAddonState(ADDON_ID, {
    code: null
  });
  useChannel({
    [EVENTS.CODE_UPDATE]: ({ code: code2 }) => {
      setState((state) => ({ ...state, code: code2 }));
    }
  });
  const parameters = useParameter(PARAM_KEY, {
    highlighter: { showLineNumbers: false, wrapLines: true }
  });
  const { highlighter: { showLineNumbers = false, wrapLines = true } = {} } = parameters;
  return /* @__PURE__ */ React2.createElement(AddonPanel, { ...props }, /* @__PURE__ */ React2.createElement(PanelContent, { code, showLineNumbers, wrapLines }));
};

// src/manager.ts
addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "HTML",
    match: ({ viewMode }) => viewMode === "story",
    render: Panel,
    paramKey: PARAM_KEY
  });
});
