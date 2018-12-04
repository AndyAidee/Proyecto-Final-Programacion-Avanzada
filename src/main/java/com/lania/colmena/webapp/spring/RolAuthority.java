/*
 * Copyright 2011 LANIA.
 */
package com.lania.colmena.webapp.spring;

import org.springframework.security.core.GrantedAuthority;

/**
 *
 * @author jaguilar
 */
public class RolAuthority implements GrantedAuthority {

    String identificador;
    public static final String [] tipos =  new String[]{"ADMINISTRADOR","PROFESOR","EQUIPO"}; 

    public RolAuthority(int tipoUsuario) {
        this.identificador = tipos[tipoUsuario-1];
    }
    
    @Override
    public String getAuthority() {
        return identificador;
    }
}
