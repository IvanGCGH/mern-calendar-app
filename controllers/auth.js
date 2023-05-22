const { response } = require('express');
const bcrypt = require('bcryptjs/dist/bcrypt');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async( req, res = response ) => {

  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email: email });

    if ( usuario ) {
      return res.status( 400 ).json({
        ok: false,
        msg: 'Ya existe un usuario con ese correo.'
      });
    }

    usuario = new Usuario( req.body );

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt );

    await usuario.save();

    // Generar JWT
    const token = await generarJWT( usuario.id, usuario.name );

    res.status( 201 ).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token: token
    })
  } catch ( error ) {
    console.log( error );
    res.status( 500 ).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });
  }
}

const loginUsuario = async( req, res = response ) => {

  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email: email });

    if ( !usuario ) {
      return res.status( 400 ).json({
        ok: false,
        msg: 'No existe un usuario con ese correo electrónico.'
      });
    }

    // Confirmar las contraseñas
    const validPassword = bcrypt.compareSync( password, usuario.password );

    if ( !validPassword ) {
      return res.status( 400 ).json({
        ok: false,
        msg: 'Contraseña incorrecta.'
      });
    }

    // Generar JWT
    const token = await generarJWT( usuario.id, usuario.name );

    res.status( 200 ).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token: token
    });

  } catch ( error ) {
    console.log( error );
    res.status( 500 ).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });
  }
}

const revalidarToken = async( req, res = response ) => {

  const { uid, name } = req;

  const token = await generarJWT( uid, name );

  res.json({
    ok: true,
    uid,
    name,
    token: token
  })
}

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
}
