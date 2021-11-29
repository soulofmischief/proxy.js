/* eslint-disable no-console */
//noinspection BadExpressionStatementJS,JSCheckFunctionSignatures

import o from 'ospec'
import { log } from '../log.js'


const
  obj = {
    val: 'test',
    doNothing( val ) { return val },
  },
  newVal = 'new value'

let loggedVal = null

function logger( ...args ) {
  console.log( ...args )
  loggedVal = args[0]
}


/**
 * This test provides a model with a value, a setter, and a method which
 * just returns a provided value.
 *
 * This method is called through a proxy and permutations to the value are
 * tested for correctness after executing the provided callback.
 */
o.spec( 'log', () => {
  // Reset value before each test.
  o.beforeEach(() => loggedVal = null )

  o.spec( 'get', () => {
    o( 'logs property access', () => {
      // Access value.
      log( obj, { logger }).val

      // Value should be logged.
      o( loggedVal ).equals( 'test' )
    })

    o( 'logs method calls', () => {
      // Call a method.
      log( obj, { logger }).doNothing( 'test' )

      // Return value should be logged.
      o( loggedVal ).equals( 'test' )
    })

    o( 'obeys includes', () => {
      // Include 'call'..
      const proxy = log( obj, { include: 'call', logger })

      // Get value.
      proxy.val

      // Return value should not be logged.
      o( loggedVal ).equals( null )

      // Call a method.
      proxy.doNothing( 'test' )

      // Return value should be logged.
      o( loggedVal ).equals( 'test' )
    })

    o( 'obeys excludes', () => {
      // Exclude 'get'.
      const proxy = log( obj, { exclude: 'get', logger })

      // Get value.
      proxy.val

      // Return value should not be logged.
      o( loggedVal ).equals( null )

      // Call a method.
      proxy.doNothing( 'test' )

      // Return value should be logged.
      o( loggedVal ).equals( 'test' )
    })
  })

  o.spec( 'set', () => {
    o( 'logs property assignment', () => {
      // Set value.
      log( obj, { logger }).val = newVal

      // Value should be logged.
      o( loggedVal ).equals( newVal )
    })

    o( 'obeys includes', () => {
      // Include 'set'.
      const proxy = log( obj, { include: 'set', logger })


      // Set value.
      proxy.val = newVal

      // Return value should be logged.
      o( loggedVal ).equals( newVal )
    })

    o( 'obeys excludes', () => {
      // Exclude 'set'.
      const proxy = log( obj, { exclude: 'set', logger })

      // Set value.
      proxy.val = newVal

      // Return value should not be logged.
      o( loggedVal ).equals( null )
    })
  })
})
