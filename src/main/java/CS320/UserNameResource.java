package CS320;


import java.util.List;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;


@Path("/user")
public class UserNameResource {
    @POST
    @Path("/{name}")
    @Produces(MediaType.TEXT_PLAIN)
    @Transactional
    public String createUser(@PathParam("name") String name) {
        UserName userName = new UserName(name); // Create a new UserName entity
        userName.persist(); // Persist entity to the database
        return "Hello " + name + "! Your name has been stored in the database";
    }



    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<UserName> getNames() {
        return UserName.listAll(); // Return all users as a JSON list
    }


    // UPDATE - PATCH
    @PATCH
    @Path("/{id}")
    @Produces(MediaType.TEXT_PLAIN)
    @Transactional
    public String updateName(@PathParam("id") String id, String newName) {
        UserName userName = UserName.findById(id);
        String oldName = userName.name;
        userName.name = newName;
        return oldName + " has been updated to " + newName + " in the database";
    }

    // DELETE - DELETE
    @DELETE
    @Path("/{id}")
    @Produces(MediaType.TEXT_PLAIN)
    @Transactional
    public String deleteName(@PathParam("id") String id) {
        UserName userName = UserName.findById(id); // Find user by name

        userName.delete(); // Delete the user entity
        return userName.name + " has been deleted successsfully from the database";
    }
}




