export const addSuffixes = () => {
  const paragraphs = document.querySelectorAll('p[dir="auto"]');
  for (const p of paragraphs) {
    const textNodes = findTextNodes(p);
    for (const textNode of textNodes) {
      if (textNode.textContent === null) {
        continue;
      }

      textNode.textContent = suffixAddedText(textNode.textContent);
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

const lineEndChars = '.。!！?？~～';
const lineEndRegex = `([${lineEndChars}]?)$`;

const enLineEndRegex = new RegExp(`(\\w)${lineEndRegex}`, 'g');
const enLineMiddleRegex = new RegExp(`(\\w)([${lineEndChars}]) `, 'g');
const enSuffix = 'nya';

const jaChars = '\\p{scx=Hiragana}\\p{scx=Katakana}\\p{scx=Han}';
const jaLineEndRegex = new RegExp(`([${jaChars}])${lineEndRegex}`, 'gu');
const jaLineMiddleRegex = new RegExp(`([${jaChars}])([${lineEndChars}])([ ${jaChars}])`, 'gu');
const jaSuffix = 'にゃ';

const suffixAddedText = (text: string): string => {
  return text
    .replace(enLineEndRegex, `$1 ${enSuffix}$2`)
    .replace(enLineMiddleRegex, `$1 ${enSuffix}$2 `)
    .replace(jaLineEndRegex, `$1${jaSuffix}$2`)
    .replace(jaLineMiddleRegex, `$1${jaSuffix}$2$3`);
};
