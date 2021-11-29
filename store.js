
let storeObject = typeof localStorage === 'undefined'
  ? {
    getItem( key ) { return this[ key ]},
    setItem( key, val ) {
      return typeof val === 'string'
        ? this[ key ] = val
        : this[ key ] = JSON.stringify( val )
    }
  }
  //eslint-disable-next-line no-undef
  : localStorage

// Storage API
const localStorageAdapter = {
  get( target, name ) {
    return storeObject.getItem( String( name ))
  },

  set( target, name, value ) {
    storeObject.setItem( String( name ), value )
    return true
  },
}

// Use Storage API adapter
export const store = new Proxy({}, localStorageAdapter )
