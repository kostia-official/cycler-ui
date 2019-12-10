import React, { useCallback, useMemo, useState } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, Slate, useSlate, withReact } from 'slate-react';
import { createEditor, Editor } from 'slate';
import { withHistory } from 'slate-history';
import { Button, Icon, Toolbar } from './SlateComponents';

const MARK_HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underlined'
};

const RichTextEditor = ({ text, onChange }) => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderMark = useCallback((props) => <Mark {...props} />, []);
  const editor = useMemo(() => withRichText(withHistory(withReact(createEditor()))), []);
  const value = parseValue(text);
  const [isShowToolbar, setIsShowToolbar] = useState(false);

  return (
    <Slate
      editor={editor}
      defaultValue={value}
      onChange={(value) => {
        onChange(JSON.stringify(value));
      }}
    >
      <Editable
        onFocus={() => setIsShowToolbar(true)}
        onBlur={() => setIsShowToolbar(false)}
        renderElement={renderElement}
        renderMark={renderMark}
        placeholder="Enter some rich text…"
        onKeyDown={(event) => {
          for (const hotkey in MARK_HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault();
              editor.exec({
                type: 'toggle_mark',
                mark: MARK_HOTKEYS[hotkey]
              });
            }
          }
        }}
      />
      {isShowToolbar ? (
        <Toolbar>
          <MarkButton type="bold" icon="format_bold" />
          <MarkButton type="italic" icon="format_italic" />
          <MarkButton type="underlined" icon="format_underlined" />
          <BlockButton type="numbered-list" icon="format_list_numbered" />
          <BlockButton type="bulleted-list" icon="format_list_bulleted" />
        </Toolbar>
      ) : (
        <React.Fragment />
      )}
    </Slate>
  );
};

const withRichText = (editor) => {
  const { exec } = editor;

  editor.exec = (command) => {
    if (command.type === 'toggle_block') {
      const { block: type } = command;
      const isActive = isBlockActive(editor, type);
      const isListType = type === 'bulleted-list' || type === 'numbered-list';
      Editor.unwrapNodes(editor, { match: { type: 'bulleted-list' } });
      Editor.unwrapNodes(editor, { match: { type: 'numbered-list' } });

      const newType = isActive ? 'paragraph' : isListType ? 'list-item' : type;
      Editor.setNodes(editor, { type: newType });

      if (!isActive && isListType) {
        Editor.wrapNodes(editor, { type, children: [] });
      }

      return;
    }

    if (command.type === 'toggle_mark') {
      const { mark: type } = command;
      const isActive = isMarkActive(editor, type);
      const cmd = isActive ? 'remove_mark' : 'add_mark';
      editor.exec({ type: cmd, mark: { type } });
      return;
    }

    exec(command);
  };

  return editor;
};

const isMarkActive = (editor, type) => {
  const [mark] = Editor.marks(editor, { match: { type } });
  return !!mark;
};

const isBlockActive = (editor, type) => {
  const [match] = Editor.nodes(editor, { match: { type } });
  return !!match;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Mark = ({ attributes, children, mark }) => {
  switch (mark.type) {
    case 'bold':
      return <strong {...attributes}>{children}</strong>;
    case 'italic':
      return <em {...attributes}>{children}</em>;
    case 'underlined':
      return <u {...attributes}>{children}</u>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const MarkButton = ({ type, icon }) => {
  const editor = useSlate();

  return (
    <Button
      active={isMarkActive(editor, type)}
      onMouseDown={(event) => {
        event.preventDefault();
        editor.exec({ type: 'toggle_mark', mark: type });
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const BlockButton = ({ type, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, type)}
      onMouseDown={(event) => {
        event.preventDefault();
        editor.exec({ type: 'toggle_block', block: type });
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

function parseValue(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    return [
      {
        type: 'paragraph',
        children: [
          {
            text: text || '',
            marks: []
          }
        ]
      }
    ];
  }
}

export default RichTextEditor;
