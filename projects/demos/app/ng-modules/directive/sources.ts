export const sources = [
  {
    filename: 'template.html',
    contents: {
      raw: require('!!raw-loader!./template.html'),
      highlighted: require('!!raw-loader!highlightjs-loader?lang=xml!./template.html')
    }
  },
  {
    filename: 'component.ts',
    contents: {
      raw: require('!!raw-loader!./component'),
      highlighted: require('!!raw-loader!highlightjs-loader?lang=typescript!./component')
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
