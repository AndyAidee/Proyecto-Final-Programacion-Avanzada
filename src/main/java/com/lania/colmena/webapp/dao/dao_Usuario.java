/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lania.colmena.webapp.dao;
import com.lania.colmena.webapp.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
/**
 *
 * @author Negrete
 */
public interface dao_Usuario extends JpaRepository<Usuario, Integer>{
    @Query(value = "insert Into usuarios(id_tipo_usuario, nombre_usuario, fecha_creacion, fecha_modificacion, id_estatus)values(?2,?1,current_timestamp, current_timestamp, '1')RETURNING id_usuario", nativeQuery = true)
    public int nuevoUsuario(String nombre, int tipoUsuario);
    
    @Query(value = "select e.nombre,u.contrasenia from equipos e, usuarios u where e.id_usuario=u.id_usuario and e.id_equipo=?1", nativeQuery = true)
    public String contrasena(int idEquipo);
    
    @Query(value = "select u.id_usuario from equipos e, usuarios u where e.id_usuario=u.id_usuario and e.id_equipo=?1", nativeQuery = true)
    public int idusuario(int idEquipo);
    
    
    
    Usuario findByNombreUsuario(String usuarioSistema);
    
    @Query(value = "insert Into usuarios(id_tipo_usuario, nombre_usuario, fecha_creacion, fecha_modificacion, id_estatus,contrasenia)values(?2,?1,current_timestamp, current_timestamp, '1',?3)RETURNING id_usuario", nativeQuery = true)
    public int nuevoUsuarioProfesor(String nombre, int tipoUsuario, String contra);

    @Query(value = "select id_usuario from usuarios where nombre_usuario like ?1 and id_tipo_usuario=2 and id_estatus=1", nativeQuery = true)
    public Integer idusuario2(String nombre_usuario);
    
    //
    @Query(value = "Select p.nombre || ' ' ||  p.apellido_paterno || ' ' || p.apellido_materno as nombre from profesores p where p.id_usuario = (Select u.id_usuario from usuarios u where u.nombre_usuario = ?1 limit 1)", nativeQuery = true)
    public String getUsuario(String nombreUsuario);
    
    //
    @Query(value = "Select p.id_profesor || '' as id_profesor from profesores p where p.id_usuario = (Select u.id_usuario from usuarios u where u.nombre_usuario = ?1 limit 1)", nativeQuery = true)
    public String getIdProfesor(String nombreUsuario);
    
    
    
}
