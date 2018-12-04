/*
 * Copyright 2011 LANIA.
 */
package com.lania.colmena.webapp.spring;

import com.lania.colmena.webapp.entities.Usuario;
import java.util.Collection;
import java.util.HashSet;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * Clase para pasar a los componentes de Spring Security, por el momento
 * resulta una implementacion casi vacia con excepcion del login y password.
 * @author jaguilar
 */
public class DetallesUsuario implements UserDetails {

    private final Usuario usuario;
    public Collection<GrantedAuthority> authorities;

    public DetallesUsuario(Usuario usr) {
        this.usuario = usr;
        if (usr.getIdTipoUsuario() > 0) {
            authorities = new HashSet<>(1);
            authorities.add(new RolAuthority( usr.getIdTipoUsuario() ));
        }
        
    }
    
    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getUsername() {
        return usuario.getNombreUsuario();
    }

    @Override
    public String getPassword() {
        return usuario.getContrasenia();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
