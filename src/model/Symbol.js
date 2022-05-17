import Backbone from 'backbone'

export default Backbone.Model.extend({
  defaults: {
    label: 'New Symbol',
    icon: 'fa-question',
  },

  initialize(attributes, options) {
    if(!this.has('id')) this.set('id', this.cid)
    this.set('components', new Map())
  },

  /**
   * Return a shallow copy of the model's attributes for JSON
   * stringification.
   * @return {Object}
   * @private
   */
  toJSON(opts = {}) {
    const obj = Backbone.Model.prototype.toJSON.call(this, opts)
    delete obj.components
    return obj
  },

  /**
   * Update according to changes of a component
   */
  update(c) {
    this.set('content', c.get('content'))
    Array.from(this.get('components'))
      .filter(([id, comp]) => comp != c)
      .forEach(([id, comp]) => comp.set('content', this.get('content')))
  },
})

/**
 * @param {object} c, a component
 * @return {string} the symbol ID if the component is a symbol
 */
export function isSymbol(c) {
  return !!c.get('symbolId')
}

/**
 * @param {object} c, a component
 * @return {string} the symbol ID if the component is a symbol
 */
export function getSymbolId(c) {
  return c.get('symbolId')
}

/**
 * @param {object} c, a component
 * @param {object} symbolId, a symbol ID
 */
export function setSymbolId(c, symbolId) {
  return c.set('symbolId', symbolId)
}
