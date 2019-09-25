export const sources = [
  {
    filename: 'template.html',
    contents: {
      raw: require('!!raw-loader!./template.html'),
      highlighted: require('!!raw-loader!highlightjs-loader?lang=xml!./template.html')
    }
  },
  {
    filename: 'overlay-panel.component.ts',
    contents: {
      raw: require('!!raw-loader!./overlay-panel.component'),
      highlighted: require('!!raw-loader!highlightjs-loader?lang=typescript!./overlay-panel.component')
    }
  },
  {
    filename: 'cdk-overlay.component.ts',
    contents: {
      raw: require('!!raw-loader!./cdk-overlay.component'),
      highlighted: require('!!raw-loader!highlightjs-loader?lang=typescript!./cdk-overlay.component')
    }
  },
  {
    filename: 'note.html',
    contents: {
      raw: require('!!raw-loader!./note.html'),
      highlighted: require('!!raw-loader!highlightjs-loader?lang=xml!./note.html')
    }
  },
  {
    filename: 'module.ts',
    contents: {
      raw: require('!!raw-loader!./module'),
      highlighted: require('!!raw-loader!highlightjs-loader?lang=typescript!./module')
    }
  }
];
