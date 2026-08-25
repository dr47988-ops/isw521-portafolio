// ===================================================
// MINI-FLUX (implementado a mano, sin librerías)
// Ejemplo: un contador
// ===================================================

// 1) DISPATCHER: reparte cada action a TODOS los stores registrados.
//    En Flux, el dispatcher es una pieza separada y explícita.
function createDispatcher() {
  let callbacks = [];

  return {
    register(callback) {
      callbacks.push(callback);
    },
    dispatch(action) {
      callbacks.forEach((callback) => callback(action));
    },
  };
}

const dispatcher = createDispatcher();

// 2) STORE: guarda su propio estado y decide cómo cambia
//    cuando le llega una action a través del dispatcher.
//    (En Flux puede haber varios stores, cada uno con su propio estado)
function createCounterStore(dispatcher) {
  let state = { count: 0 }; //store mantiene su propio estado, el estado inicial es count: 0
  let listeners = [];

  dispatcher.register((action) => { //aqui registramos nuestro store en el dispatcher 
    switch (action.type) {
      case 'INCREMENT':
        state = { count: state.count + 1 };
        break;
      case 'DECREMENT':
        state = { count: state.count - 1 };
        break;
      default:
        return; // esta action no le interesa a este store
    }
    listeners.forEach((listener) => listener()); // avisa a la(s) vista(s)
  });

  return {
    getState: () => state,
    subscribe(listener) {
      listeners.push(listener);
    },
  };
}

const counterStore = createCounterStore(dispatcher);

// 3) VIEW: se suscribe al store para enterarse de cada cambio

counterStore.subscribe(() => {
  console.log('Nuevo estado ->', counterStore.getState());
});

// 4) ACTIONS: eventos que describen "qué pasó".
//    SIEMPRE se disparan a través del Dispatcher, nunca directo al store.
dispatcher.dispatch({ type: 'INCREMENT' }); // Nuevo estado -> { count: 1 }
dispatcher.dispatch({ type: 'INCREMENT' }); // Nuevo estado -> { count: 2 }
dispatcher.dispatch({ type: 'DECREMENT' }); // Nuevo estado -> { count: 1 }

// Para correrlo: node mini-flux-contador.js