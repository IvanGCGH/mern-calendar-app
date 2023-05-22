/*
  Events Routes
  host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { obtenerEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const router = Router();

router.use( validarJWT );

router.get(
  '/',
  obtenerEventos
);

router.post(
  '/',
  [
    check( 'title', 'El título es obligatorio' ).not().isEmpty(),
    check( 'start', 'La fecha de inicio es obligatoria.' ).custom( isDate ),
    check( 'end', 'La fecha de fin es obligatoria.' ).custom( isDate ),
    validarCampos
  ],
  crearEvento
);

router.put(
  '/:id',
  [
    check( 'title', 'El título es obligatorio' ).not().isEmpty(),
    check( 'start', 'La fecha de inicio es obligatoria.' ).custom( isDate ),
    check( 'end', 'La fecha de fin es obligatoria.' ).custom( isDate ),
    validarCampos
  ],
  actualizarEvento
);

router.delete(
  '/:id',
  eliminarEvento
);

module.exports = router;