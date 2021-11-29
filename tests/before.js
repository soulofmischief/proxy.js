//noinspection JSCheckFunctionSignatures

import o from 'ospec'
import { before } from '../before.js'


const obj = {
  val: null,
  doNothing( val ) { return val },
  setVal( newVal ) { this.val = newVal },
}

/**
 * This test provides a model with a value, a setter, and a method which
 * just returns a provided value.
 *
 * This method is called through a proxy and permutations to the value are
 * tested for correctness after executing the provided callback.
 */
o.spec( 'before', () => {
  // Reset value before each test.
  o.beforeEach(() => obj.setVal( null ))

  o.spec( 'get', () => {
    o( 'does nothing by default', () => {
      const proxy = before( obj )

      // Do nothing.
      proxy.doNothing()

      // Value shouldn't change.
      o( proxy.val ).equals( null )
    })

    o( 'works without passing value', () => {
      const proxy = before( obj, () => obj.setVal( 'test' ))

      // Do nothing.
      proxy.doNothing()

      // Value should be set directly by callback.
      o( proxy.val ).equals( 'test' )
    })

    o( 'works with passing value', () => {
      const proxy = before( obj, () => 'test', true )

      // Set value.
      proxy.setVal()

      // Value should be set to result of called method.
      o( proxy.val ).equals( 'test' )
    })
  })

  o.spec( 'set', () => {
    o( 'does nothing by default', () => {
      const proxy = before( obj )

      // Do nothing.
      proxy.val = 'test'

      // Value shouldn't change.
      o( proxy.val ).equals( 'test' )
    })

    o( 'works without passing value', () => {
      let val
      const proxy = before( obj, () => val = 'test' )

      // Do nothing.
      proxy.val = 'test'

      // Local value should be set directly by callback.
      o( val ).equals( 'test' )
    })

    o( 'works with passing value', () => {
      let val
      const proxy = before( obj, x => val = x, true )

      // Set value.
      proxy.val = 'test'

      // Local value should be set according to the set value.
      o( val ).equals( 'test' )
    })
  })
})
