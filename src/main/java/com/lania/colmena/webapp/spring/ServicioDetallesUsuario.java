package com.lania.colmena.webapp.spring;

import com.lania.colmena.webapp.dao.dao_Usuario;
import com.lania.colmena.webapp.entities.Usuario;
import java.util.List;




import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

/**
 *
 * @author jaguilar
 */
public class ServicioDetallesUsuario implements UserDetailsService {
    
    private static final Logger logger = LoggerFactory.getLogger(ServicioDetallesUsuario.class);

    @Autowired
    private dao_Usuario usuarioDao;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException, DataAccessException {
        logger.debug("loadUserByUsername");
        Usuario usr = usuarioDao.findByNombreUsuario(username);
        if (usr == null) {
            throw new UsernameNotFoundException("No se encontro: " + username);
        }
        DetallesUsuario detalles = new DetallesUsuario(usr);
        
        return detalles;
    }

}
