import o from 'ospec'
import { after } from '../after.js'


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
o.spec( 'after', () => {
  // Reset value before each test.
  o.beforeEach(() => obj.setVal( null ))

  o.spec( 'get', () => {
    o( 'does nothing by default', () => {
      after( obj ).doNothing()

      // Value shouldn't change.
      o( obj.val ).equals( null )
    })

    o( 'works without passing value', () => {
      after( obj, () => obj.setVal( 'test' )).doNothing()

      // Value should be set directly by callback.
      o( obj.val ).equals( 'test' )
    })

    o( 'works with passing value', () => {
      after( obj, x => obj.setVal( x ), true ).doNothing( 'test' )

      // Value should be set to result of called method.
      o( obj.val ).equals( 'test' )
    })
  })

  o.spec( 'set', () => {
    o( 'does nothing by default', () => {
      const proxy = after( obj )

      // Do nothing.
      proxy.val = 'test'

      // Value shouldn't change.
      o( proxy.val ).equals( 'test' )
    })

    o( 'works without passing value', () => {
      let val
      const proxy = after( obj, () => val = 'test' )

      // Do nothing.
      proxy.val = 'test'

      // Local value should be set directly by callback.
      o( val ).equals( 'test' )
    })

    o( 'works with passing value', () => {
      let val
      const proxy = after( obj, x => val = x, true )

      // Set value.
      proxy.val = 'test'

      // Local value should be set according to the set value.
      o( val ).equals( 'test' )
    })
  })
})
