/* eslint-disable no-console */
//noinspection BadExpressionStatementJS, JSCheckFunctionSignatures

import o from 'ospec'
import { store } from '../store.js'


/**
 * This test provides a model with a value, a setter, and a method which
 * just returns a provided value.
 *
 * This method is called through a proxy and permutations to the value are
 * tested for correctness after executing the provided callback.
 */
o.spec( 'store', () => {
  // Reset value before each test.
  o.beforeEach(() => store.test = null )

  o( 'works', () => {
    // Set and check value.
    store.test = 'test'
    o( store.test ).equals( 'test' )
  })

  o( 'works with shallow assignment', () => {
    // Validate shallow assignment.
    store.test = { val: 'test' }

    o( JSON.parse( store.test ).val ).equals( 'test' )
  })

  o( 'fails on deep assignment', () => {
    // Validate deep assignment.
    store.test = {}

    o(() => store.test.val = 'test' )
      .throws( "Cannot create property 'val' on string '{}'" )
  })
})
