/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lania.colmena.webapp.control;

import com.google.gson.Gson;
import com.lania.colmena.webapp.dao.dao_Usuario;
import com.lania.colmena.webapp.entities.Usuario;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author Negrete
 */
@Controller
@RequestMapping("/usuarios")
public class UsuarioJpaController  {
    @Autowired
    dao_Usuario dao_Usuario;
    
    HttpSession session;  
    
    @RequestMapping(value = "/obtenerPassword/{idEquipo}", method = RequestMethod.GET)
    public @ResponseBody
    String getShopInJSON(@PathVariable int idEquipo) {
        String contra = dao_Usuario.contrasena(idEquipo);
        return contra;
    }
    
        @RequestMapping(value = "/guardarPassword/", method = RequestMethod.POST)
    public @ResponseBody
    String guardarContrasena(int idEquipo, String pass) {
        int us= dao_Usuario.idusuario(idEquipo);
        Usuario aux=dao_Usuario.findOne(us);
        aux.setContrasenia(pass);
        dao_Usuario.save(aux);
        return aux.getContrasenia();
    }
    
    
    @RequestMapping(value = "/setLogout", method = RequestMethod.POST)
    protected void setLogout(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        
        System.out.println("Cerrando");
        
        String resultado = "0"; 
        try{
            session = request.getSession(true);
            session.invalidate();
            resultado = "1";
        }catch(Exception e){
            System.out.println("Error cerrando: "+e.getMessage());
            resultado = "0";
        }
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(resultado);
        
    }
    
    
    
    @RequestMapping(value="/getNombreUsuario", method = RequestMethod.POST)
    public @ResponseBody String getDatosEquiposRespaldo(String userName){
        
        String usuario = dao_Usuario.getUsuario(userName) ;
        
        return usuario;
    }
        @RequestMapping(value="/getIdUsuario", method = RequestMethod.POST)
    public @ResponseBody String getIdUsuario(String userName){        
        String usuario = dao_Usuario.getIdProfesor(userName) ;        
        
        Usuario us = dao_Usuario.getOne(Integer.parseInt(usuario));
        
        Gson respuesta = new Gson();

        return respuesta.toJson(us);
        
        
        
    }
    
}
