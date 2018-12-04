package com.lania.colmena.webapp.spring;

import java.io.IOException;
import java.util.Collection;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

/**
 *
 * @author PCEL
 */
public class ManejadorLogin implements AuthenticationSuccessHandler {

    private static final Logger logger = LoggerFactory.getLogger(ManejadorLogin.class);

    private final RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        handle(request, response, authentication);
        clearAuthenticationAttributes(request);

        //String idCliente = ((DetallesUsuario) authentication.getPrincipal()).getUsername();
        String usuarioSistema = request.getParameter("usuarioSistema");
        request.getSession().setAttribute("usuarioSistema", usuarioSistema);

    }

    protected void handle(HttpServletRequest request,
            HttpServletResponse response, Authentication authentication) throws IOException {
        String targetUrl = determineTargetUrl(authentication);

        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }

        redirectStrategy.sendRedirect(request, response, targetUrl);
    }

    private String determineTargetUrl(Authentication authentication) {
        boolean esCliente = false;
        boolean esAdmin = false;
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        OUTER:
        for (GrantedAuthority grantedAuthority : authorities) {
            switch (grantedAuthority.getAuthority()) {
                case "alumno":
                    esCliente = true;
                    break OUTER;
                case "maestro":
                    esAdmin = true;
                    break OUTER;
            }
        }

        if (esCliente) {
            return "/estudiante/mostrarTemario.jsp";
        } else if (esAdmin) {
            return "/admin/modificarTemario.jsp";
        } else {
            return "/index.jsp";
        }
    }

    private void clearAuthenticationAttributes(HttpServletRequest request) {        
        
        HttpSession session = request.getSession(false);
        if (session == null) {
            return;
        }
        session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
    }
}
