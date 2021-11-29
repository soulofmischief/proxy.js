
const handler = {
  get({ cb, model, passValue }, prop ) {
    // Intercept methods.
    if ( typeof model[ prop ] === 'function' ) {
      return ( ...args ) => {
        // Execute callback.
        const result = cb()

        // Execute called method.
        if ( passValue ) {
          args.push( result )
          return model[ prop ].apply( model, args )
        }
        else {
          return model[ prop ].apply( model, args )
        }
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


export function before( model, cb = () => null, passValue = false ) {
  return new Proxy({ cb, model, passValue }, handler )
}
