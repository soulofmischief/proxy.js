/* eslint-disable no-console */

const handler = {
  get({ exclude, include, logger, model }, prop ) {
    // Configure filters.
    let filters = {}

    // Handle explicit includes.
    if ( include ) {
      // Handle both single include and array of includes.
      if ( Array.isArray( include ))
        include.forEach( f => filters[f] = true )
      else if ( typeof include === 'string' )
        filters[ include ] = true

      // Set default filters if no explicit includes.
    } else filters = {
      call: true,
      get: true,
    }

    // Handle explicit excludes.
    if ( exclude ) {
      // Handle both single exclude and array of excludes.
      if ( Array.isArray( exclude ))
        exclude.forEach( f => filters[f] = false )
      else if ( typeof exclude === 'string' )
        filters[ exclude ] = false
    }

    // Intercept state modifiers and redraw.
    if ( typeof model[ prop ] === 'function' ) {
      return ( ...args ) => {
        // Call method.
        const result = model[ prop ].apply( model, args )

        // Log result.
        if ( filters.call ) {
          console.log( 'CALL:', prop )
          logger( result )
        }

        return result
      }
    }

    // Log call.
    if ( filters.get ) {
      console.log( 'GET', prop )
      logger( model[ prop ])
    }

    // Return directly.
    return model[ prop ]
  },

  set({ exclude, include, logger, model }, prop, value ) {
    // Set value.
    model[ prop ] = value

    let filters = {}

    // Handle explicit includes.
    if ( include ) {
      // Handle both single include and array of includes.
      if ( Array.isArray( include ))
        include.forEach( f => filters[f] = true )
      else if ( typeof include === 'string' )
        filters[ include ] = true

      // Set default filters if no explicit includes.
    } else filters = { set: true }

    // Handle explicit excludes.
    if ( exclude ) {
      // Handle both single exclude and array of excludes.
      if ( Array.isArray( exclude ))
        exclude.forEach( f => filters[f] = false )
      else if ( typeof exclude === 'string' )
        filters[ exclude ] = false
    }

    // Log call.
    if ( filters.set ) {
      console.log( 'SET', prop )
      logger( model[ prop ])
    }

    // Allow chaining.
    return true
  },
}


/**
 * Log object access. Optionally pass through filters.
 * @param {object} model Object to log.
 * @param {object} [options] Log options
 * @param {array|string} [options.include] Access types to include.
 * @param {array|string} [options.exclude] Access types to exclude.
 * @param {function} [options.logger] Logging callback.
 */
export function log(
  model,
  { exclude = '', include = '', logger = console.log } = {},
) {
  return new Proxy({ exclude, include, logger, model }, handler )
}
