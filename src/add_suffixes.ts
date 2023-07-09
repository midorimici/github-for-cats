import { fetchFromStorage } from './lib/storage';

export const addSuffixes = async () => {
  const paragraphs = document.querySelectorAll('p[dir="auto"]');
  for (const p of paragraphs) {
    const textNodes = findTextNodes(p);
    for (const textNode of textNodes) {
      if (textNode.textContent === null) {
        continue;
      }

      const { abSuffix, jaSuffix } = await fetchSuffixes();
      textNode.textContent = suffixAddedText(textNode.textContent, abSuffix, jaSuffix);
    }
  }
};

const findTextNodes = (node: Node): Node[] => {
  if (!node.hasChildNodes()) {
    if (node.nodeType === Node.TEXT_NODE) {
      return [node];
    } else {
      return [];
    }
  }

  if (node.nodeName === 'CODE') {
    return [];
  }

  let foundNodes: Node[] = [];

  for (const n of node.childNodes) {
    const nodes = findTextNodes(n);
    if (nodes.length === 0) {
      continue;
    }

    foundNodes = foundNodes.concat(nodes);
  }

  return foundNodes;
};

const fetchSuffixes = async () => {
  const suffixes = await fetchFromStorage(['abSuffix', 'jaSuffix']);
  return suffixes;
};

const ellipsisRegex = '\\.{2,}|…+';
const lineEndCharsRegex = `([.。!！?？~～]|${ellipsisRegex})`;
const lineEndRegex = `${lineEndCharsRegex}?$`;

const abLineEndRegex = new RegExp(`(\\w)${lineEndRegex}`, 'g');
const abLineMiddleRegex = new RegExp(`(\\w)${lineEndCharsRegex} `, 'g');

const jaChars = '\\p{scx=Hiragana}\\p{scx=Katakana}\\p{scx=Han}';
const jaLineEndRegex = new RegExp(`([${jaChars}])${lineEndRegex}`, 'gu');
const jaLineMiddleRegex = new RegExp(`([${jaChars}])${lineEndCharsRegex}([ ${jaChars}])`, 'gu');

const suffixAddedText = (text: string, abSuffix: string, jaSuffix: string): string => {
  return text
    .replace(abLineEndRegex, `$1 ${abSuffix}$2`)
    .replace(abLineMiddleRegex, `$1 ${abSuffix}$2 `)
    .replace(jaLineEndRegex, `$1${jaSuffix}$2`)
    .replace(jaLineMiddleRegex, `$1${jaSuffix}$2$3`);
};
