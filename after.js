
const handler = {
  get({ cb, model, passValue }, prop ) {
    // Intercept methods.
    if ( typeof model[ prop ] === 'function' ) {
      return ( ...args ) => {
        // Execute called method.
        const result = model[ prop ].apply( model, args )

        // Execute callback.
        if ( passValue ) cb( result )
        else cb()

        return result
      }
    }

    // Return other calls.
    return model[ prop ]
  },

  set({ cb, model, passValue }, prop, value ) {
    // Set value.
    model[ prop ] = value

    // Execute callback.
    if ( passValue ) cb( value )
    else cb()

    // Allow chaining.
    return true
  },
}


export function after( model, cb = () => null, passValue = false ) {
  return new Proxy({ cb, model, passValue }, handler )
}
