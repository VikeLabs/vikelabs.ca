import { COLORS } from '/src/styles/globalstyles/theme';

// https://www.joshwcomeau.com/react/dark-mode/
const MagicScriptTag = () => {

  // localstorage isnt changing with each new page, only on hard refresh
  const codeToRunOnClient = `
  (function() {
    function getInitialColorMode() {
      const preferredColor = window.localStorage.getItem('color-mode');
      const hasPreference = typeof preferredColor === 'string';
      if (hasPreference) {
        return preferredColor;
      }
      return 'light';
    }
    const colorMode = getInitialColorMode();
    const root = document.documentElement;
    root.style.setProperty(
      '--color-text',
      colorMode === 'light'
        ? '${COLORS.text.light}'
        : '${COLORS.text.dark}'
    );
    root.style.setProperty(
      '--color-primary',
      colorMode === 'light'
        ? '${COLORS.primary.light}'
        : '${COLORS.primary.dark}'
    );
    root.style.setProperty(
      '--color-background',
      colorMode === 'light'
        ? '${COLORS.background.light}'
        : '${COLORS.background.dark}'
    );
    root.style.setProperty(
      '--color-background2',
      colorMode === 'light'
        ? '${COLORS.background2.light}'
        : '${COLORS.background2.dark}'
    );
    root.style.setProperty(
      '--color-link',
      colorMode === 'light'
        ? '${COLORS.link.light}'
        : '${COLORS.link.dark}'
    );
    root.style.setProperty(
      '--color-linkHover',
      colorMode === 'light'
        ? '${COLORS.linkHover.light}'
        : '${COLORS.linkHover.dark}'
    );
    root.style.setProperty(
      '--color-toggleName',
      colorMode === 'light'
        ? '${COLORS.toggleName.light}'
        : '${COLORS.toggleName.dark}'
    );
    root.style.setProperty(
      '--color-moonIcon',
      colorMode === 'light'
        ? '${COLORS.moonIcon.light}'
        : '${COLORS.moonIcon.dark}'
    );
    root.style.setProperty(
      '--color-sunIcon',
      colorMode === 'light'
        ? '${COLORS.sunIcon.light}'
        : '${COLORS.sunIcon.dark}'
    );
    root.style.setProperty(
      '--color-tooltip',
      colorMode === 'light'
        ? '${COLORS.tooltip.light}'
        : '${COLORS.tooltip.dark}'
    );
    root.style.setProperty(
      '--color-ttText',
      colorMode === 'light'
        ? '${COLORS.ttText.light}'
        : '${COLORS.ttText.dark}'
    );
    root.style.setProperty(
      '--color-currLine',
      colorMode === 'light'
        ? '${COLORS.currLine.light}'
        : '${COLORS.currLine.dark}'
    );
    root.style.setProperty(
      '--color-comment',
      colorMode === 'light'
        ? '${COLORS.comment.light}'
        : '${COLORS.comment.dark}'
    );
    root.style.setProperty(
      '--color-cyan',
      colorMode === 'light'
        ? '${COLORS.cyan.light}'
        : '${COLORS.cyan.dark}'
    );
    root.style.setProperty(
      '--color-green',
      colorMode === 'light'
        ? '${COLORS.green.light}'
        : '${COLORS.green.dark}'
    );
    root.style.setProperty(
      '--color-orange',
      colorMode === 'light'
        ? '${COLORS.orange.light}'
        : '${COLORS.orange.dark}'
    );
    root.style.setProperty(
      '--color-pink',
      colorMode === 'light'
        ? '${COLORS.pink.light}'
        : '${COLORS.pink.dark}'
    );
    root.style.setProperty(
      '--color-purple',
      colorMode === 'light'
        ? '${COLORS.purple.light}'
        : '${COLORS.purple.dark}'
    );
    root.style.setProperty(
      '--color-red',
      colorMode === 'light'
        ? '${COLORS.red.light}'
        : '${COLORS.red.dark}'
    );
    root.style.setProperty(
      '--color-yellow',
      colorMode === 'light'
        ? '${COLORS.yellow.light}'
        : '${COLORS.yellow.dark}'
    );
    root.style.setProperty('--initial-color-mode', colorMode);
  })()
`;
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />;
};
export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents(<MagicScriptTag />);
};