package CS320;


import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    /**
     * GET /products : Returns all products
     */
    @GET
    public List<Product> getAllProducts() {
        return Product.listAll();
    }

    /**
     * GET /products/{id} : Return a single product by ID
     */
    @GET
    @Path("/{id}")
    public Product getProductById(@PathParam("id") Long id) {
        Product product = Product.findById(id);
        if (product == null) {
            throw new NotFoundException("Product not found with id=" + id);
        }
        return product;
    }

    /**
     * POST /products : Create a new product
     */
    @POST
    @Transactional
    public String createProduct(Product product) {
        product.persist();
        return "product succesfully created";
    }

    /**
     * PUT /products/{id} : Update an existing product
     */
    @PUT
    @Path("/{id}")
    @Transactional
    public Product updateProduct(@PathParam("id") Long id, Product updates) {
        Product product = Product.findById(id);
        if (product == null) {
            throw new NotFoundException("Product not found with id=" + id);
        }

        product.productName = updates.productName;
        product.productPrice = updates.productPrice;
        product.productImage = updates.productImage;

        product.persist(); // Not strictly necessary if the entity is managed, but good practice

        return product;
    }

    /**
     * DELETE /products/{id} : Delete a product by ID
     */
    @DELETE
    @Path("/{id}")
    @Transactional
    public String deleteProduct(@PathParam("id") Long id) {
        Product product = Product.findById(id);
        if (product == null) {
            throw new NotFoundException("Product not found with id=" + id);
        }
        product.delete();
        return "Product deleted successfully";
    }
}
